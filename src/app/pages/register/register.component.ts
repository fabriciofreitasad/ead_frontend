import { Component, ViewEncapsulation } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormArray, FormGroup, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { UsuarioService } from '../../core/services/usuario.service';
import { UsuarioDTO } from '../../core/models/usuario.model';

@Component({
  selector: 'app-register',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  isLoading = false;

  // Tipagem opcional para evitar erros no strict mode
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router
  ) {
    // Inicialização do form dentro do constructor para não usar this.fb antes de inicializar
    this.form = this.fb.group({
      nome: this.fb.control('', { validators: [Validators.required, Validators.minLength(3)], nonNullable: true }),
      email: this.fb.control('', { validators: [Validators.required, Validators.email], nonNullable: true }),
      senha: this.fb.control('', { validators: [Validators.required, Validators.minLength(6)], nonNullable: true }),
      enderecos: this.fb.array([
        this.fb.group({
          rua: this.fb.control('', { nonNullable: true }),
          numero: this.fb.control(0, { nonNullable: true }),
          complemento: this.fb.control('', { nonNullable: true }),
          cidade: this.fb.control('', { nonNullable: true }),
          estado: this.fb.control('', { nonNullable: true }),
          cep: this.fb.control('', { nonNullable: true })
        })
      ]),
      telefones: this.fb.array([
        this.fb.group({
          numero: this.fb.control('', { nonNullable: true }),
          ddd: this.fb.control('', { nonNullable: true })
        })
      ])
    });
  }

  get enderecos(): FormArray {
    return this.form.get('enderecos') as FormArray;
  }
  get telefones(): FormArray {
    return this.form.get('telefones') as FormArray;
  }


  // Helpers de mensagem de erro
  nomeErrors(): string | null {
    const c = this.form.get('nome');
    if (!c) return null;
    if ((c as any).hasError('required')) return 'Nome é obrigatório';
    if ((c as any).hasError('minlength')) return 'Mínimo de 3 caracteres';
    return null;
  }
  emailErrors(): string | null {
    const c = this.form.get('email');
    if (!c) return null;
    if ((c as any).hasError('required')) return 'Email é obrigatório';
    if ((c as any).hasError('email')) return 'Formato de email inválido';
    return null;
  }
  senhaErrors(): string | null {
    const c = this.form.get('senha');
    if (!c) return null;
    if ((c as any).hasError('required')) return 'Senha é obrigatória';
    if ((c as any).hasError('minlength')) return 'Mínimo de 6 caracteres';
    return null;
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const body = this.form.getRawValue() as unknown as UsuarioDTO;
    this.isLoading = true;
    this.usuarioService.criar(body)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: () => {
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.error('Erro ao registrar usuário', err);
          alert('Falha ao cadastrar. Verifique os dados e tente novamente.');
        }
      });
  }
}
