// src/app/pages/user-admin/user-admin.component.ts
import { Component, ViewEncapsulation, OnInit, signal, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormArray, FormGroup } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { finalize } from 'rxjs';
import { Router } from '@angular/router';

import { UsuarioService } from '../../core/services/usuario.service';
import { UsuarioDTO, EnderecoDTO, TelefoneDTO } from '../../core/models/usuario.model';

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
export class UserAdminComponent implements OnInit {
  private fb = inject(FormBuilder);
  private usuarioService = inject(UsuarioService);
  private router = inject(Router);

  loading = signal(false);
  user = signal<UsuarioDTO | null>(null);

  searchForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]]
  });

  editForm!: FormGroup;

  addAddressForm = this.fb.group({
    rua: [''], numero: [0], complemento: [''], cidade: [''], estado: [''], cep: ['']
  });
  addPhoneForm = this.fb.group({
    ddd: [''], numero: ['']
  });

  constructor() {
    // ⚠️ effect precisa estar em um contexto de injeção → constructor é ok
    effect(() => {
      const u = this.user();
      const end = this.editEnderecos();
      const tel = this.editTelefones();
      end?.clear(); tel?.clear();
      if (u) {
        this.editForm.patchValue({ nome: u.nome || '', email: u.email || '' }, { emitEvent: false });
        (u.enderecos || []).forEach(e => end.push(this.fb.group({
          id: [e.id ?? null], rua: [e.rua ?? ''], numero: [e.numero ?? 0],
          complemento: [e.complemento ?? ''], cidade: [e.cidade ?? ''],
          estado: [e.estado ?? ''], cep: [e.cep ?? '']
        })));
        (u.telefones || []).forEach(t => tel.push(this.fb.group({
          id: [t.id ?? null], ddd: [t.ddd ?? ''], numero: [t.numero ?? '']
        })));
      } else {
        this.editForm.reset();
      }
    });
  }

  ngOnInit(): void {
    this.editForm = this.fb.group({
      nome: ['',[Validators.required, Validators.minLength(3)]],
      email: ['',[Validators.required, Validators.email]],
      enderecos: this.fb.array([]),
      telefones: this.fb.array([])
    });
  }

  editEnderecos(): FormArray { return this.editForm.get('enderecos') as FormArray; }
  editTelefones(): FormArray { return this.editForm.get('telefones') as FormArray; }

  goBack() {
    this.router.navigate(['/ead']);
  }

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
    if (!this.user()) { return; }
    if (this.editForm.invalid) { this.editForm.markAllAsTouched(); return; }
    const dto: UsuarioDTO = {
      id: this.user()?.id,
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
        error: (e) => { console.error(e); alert('Falha ao atualizar'); }
      });
  }

  adicionarEndereco() {
    const body: EnderecoDTO = this.addAddressForm.getRawValue() as any;
    this.loading.set(true);
    this.usuarioService.cadastrarEndereco(body)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: () => { alert('Endereço cadastrado!'); this.buscar(); this.addAddressForm.reset({numero:0}); },
        error: (e) => { console.error(e); alert('Falha ao cadastrar endereço'); }
      });
  }

  atualizarEndereco(i: number) {
    const fg = this.editEnderecos().at(i) as any;
    const id = fg.value.id;
    if (!id) { return alert('Endereço sem ID'); }
    const body: EnderecoDTO = fg.getRawValue();
    this.loading.set(true);
    this.usuarioService.atualizarEndereco(id, body)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: () => { alert('Endereço atualizado!'); this.buscar(); },
        error: (e) => { console.error(e); alert('Falha ao atualizar endereço'); }
      });
  }

  adicionarTelefone() {
    const body: TelefoneDTO = this.addPhoneForm.getRawValue() as any;
    this.loading.set(true);
    this.usuarioService.cadastrarTelefone(body)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: () => { alert('Telefone cadastrado!'); this.buscar(); this.addPhoneForm.reset(); },
        error: (e) => { console.error(e); alert('Falha ao cadastrar telefone'); }
      });
  }

  atualizarTelefone(i: number) {
    const fg = this.editTelefones().at(i) as any;
    const id = fg.value.id;
    if (!id) { return alert('Telefone sem ID'); }
    const body: TelefoneDTO = fg.getRawValue();
    this.loading.set(true);
    this.usuarioService.atualizarTelefone(id, body)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: () => { alert('Telefone atualizado!'); this.buscar(); },
        error: (e) => { console.error(e); alert('Falha ao atualizar telefone'); }
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
        error: (e) => { console.error(e); alert('Falha ao deletar'); }
      });
  }
}
