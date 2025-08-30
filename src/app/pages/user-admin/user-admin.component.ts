// src/app/pages/user-admin/user-admin.component.ts
import { CommonModule, Location } from '@angular/common';
import { Component, effect, inject, signal, ViewEncapsulation } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { finalize } from 'rxjs';

import { EnderecoDTO, TelefoneDTO, UsuarioDTO } from '../../core/models/usuario.model';
import { UsuarioService } from '../../core/services/usuario.service';

@Component({
  selector: 'app-user-admin',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [
    CommonModule, ReactiveFormsModule,
    MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule,
    MatTabsModule, MatIconModule, MatDividerModule, MatListModule
  ],
  templateUrl: './user-admin.component.html',
  styleUrl: './user-admin.component.scss'
})
export class UserAdminComponent {
  private fb = inject(FormBuilder);
  private usuarioService = inject(UsuarioService);
  private location = inject(Location);

  loading = signal(false);
  user = signal<UsuarioDTO | null>(null);

  // ✅ forms como fields (fora do ngOnInit)
  searchForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]]
  });

  editForm: FormGroup = this.fb.group({
    nome: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    enderecos: this.fb.array([]),
    telefones: this.fb.array([])
  });

  addAddressForm = this.fb.group({
    rua: [''], numero: [0], complemento: [''], cidade: [''], estado: [''], cep: ['']
  });

  addPhoneForm = this.fb.group({
    ddd: [''], numero: ['']
  });

  // ✅ effect como field (agora está em contexto de injeção)
  private syncFormEffect = effect(() => {
    const u = this.user();
    const end = this.editEnderecos();
    const tel = this.editTelefones();
    end.clear(); tel.clear();

    if (u) {
      this.editForm.patchValue({ nome: u.nome || '', email: u.email || '' }, { emitEvent: false });
      (u.enderecos || []).forEach(e => end.push(this.fb.group({
        id: [e.id || null],
        rua: [e.rua || ''],
        numero: [e.numero ?? 0],
        complemento: [e.complemento || ''],
        cidade: [e.cidade || ''],
        estado: [e.estado || ''],
        cep: [e.cep || '']
      })));
      (u.telefones || []).forEach(t => tel.push(this.fb.group({
        id: [t.id || null],
        ddd: [t.ddd || ''],
        numero: [t.numero || '']
      })));
    } else {
      this.editForm.reset();
    }
  });

  goBack(): void { this.location.back(); }

  editEnderecos(): FormArray { return this.editForm.get('enderecos') as FormArray; }
  editTelefones(): FormArray { return this.editForm.get('telefones') as FormArray; }

  buscar() {
    if (this.searchForm.invalid) { this.searchForm.markAllAsTouched(); return; }
    const email = this.searchForm.value.email as string;
    this.loading.set(true);
    this.usuarioService.buscarPorEmail(email)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (u) => this.user.set(u),
        error: (e) => { console.error(e); alert('Usuário não encontrado'); this.user.set(null); }
      });
  }

  salvarUsuario() {
    const current = this.user();
    if (!current) return;
    if (this.editForm.invalid) { this.editForm.markAllAsTouched(); return; }

    const dto: UsuarioDTO = {
      id: current.id,
      nome: this.editForm.value.nome!,
      email: this.editForm.value.email!,
      enderecos: (this.editForm.value.enderecos || []) as any,
      telefones: (this.editForm.value.telefones || []) as any
    };

    this.loading.set(true);
    this.usuarioService.atualizarUsuario(dto)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (u) => { this.user.set(u); alert('Usuário atualizado!'); },
        error: () => { alert('Falha ao atualizar (verifique se está logado e com token).'); }
      });
  }

  adicionarEndereco() {
    const body: EnderecoDTO = this.addAddressForm.getRawValue() as any;
    this.loading.set(true);
    this.usuarioService.cadastrarEndereco(body)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: () => { alert('Endereço cadastrado!'); this.addAddressForm.reset({numero:0}); this.recarregarUsuario(); },
        error: () => { alert('Falha ao cadastrar endereço (requer token).'); }
      });
  }

  atualizarEndereco(i: number) {
    const fg = this.editEnderecos().at(i) as FormGroup;
    const id = fg.value['id'];
    if (!id) return alert('Endereço sem ID');
    const body: EnderecoDTO = fg.getRawValue();
    this.loading.set(true);
    this.usuarioService.atualizarEndereco(id, body)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: () => { alert('Endereço atualizado!'); this.recarregarUsuario(); },
        error: () => { alert('Falha ao atualizar endereço'); }
      });
  }

  adicionarTelefone() {
    const body: TelefoneDTO = this.addPhoneForm.getRawValue() as any;
    this.loading.set(true);
    this.usuarioService.cadastrarTelefone(body)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: () => { alert('Telefone cadastrado!'); this.addPhoneForm.reset(); this.recarregarUsuario(); },
        error: () => { alert('Falha ao cadastrar telefone (requer token).'); }
      });
  }

  atualizarTelefone(i: number) {
    const fg = this.editTelefones().at(i) as FormGroup;
    const id = fg.value['id'];
    if (!id) return alert('Telefone sem ID');
    const body: TelefoneDTO = fg.getRawValue();
    this.loading.set(true);
    this.usuarioService.atualizarTelefone(id, body)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: () => { alert('Telefone atualizado!'); this.recarregarUsuario(); },
        error: () => { alert('Falha ao atualizar telefone'); }
      });
  }

  deletar() {
    const u = this.user();
    if (!u?.email) return;
    if (!confirm(`Deletar usuário ${u.email}?`)) return;
    this.loading.set(true);
    this.usuarioService.deletarPorEmail(u.email)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: () => { alert('Usuário deletado'); this.user.set(null); },
        error: () => { alert('Falha ao deletar'); }
      });
  }

  private recarregarUsuario() {
    const email = this.user()?.email;
    if (!email) return;
    this.usuarioService.buscarPorEmail(email).subscribe({
      next: (u) => this.user.set(u),
      error: () => {}
    });
  }
}
