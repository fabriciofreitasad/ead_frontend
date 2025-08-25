import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { AuthService, LoginResponse } from '../../core/services/auth.service';
import { PasswordFieldComponent } from '../../shared/components/password-field/password-field.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    PasswordFieldComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent {

  form: FormGroup<{ email: FormControl<string>, senha: FormControl<string> }>;
  isLoading = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.form = this.formBuilder.group({
      email: this.formBuilder.control('', { validators: [Validators.required, Validators.email], nonNullable: true }),
      senha: this.formBuilder.control('', { validators: [Validators.required, Validators.minLength(6)], nonNullable: true })
    });
  }

  get passwordControl(): FormControl<string> {
    return this.form.controls.senha;
  }

  get emailErros(): string | null {
    const emailControl = this.form.controls.email;
    if (emailControl.hasError('required')) return 'A informação do e-mail é obrigatória';
    if (emailControl.hasError('email')) return 'Este e-mail é inválido';
    return null;
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { email, senha } = this.form.getRawValue();
    this.isLoading = true;

    this.authService.login(email, senha)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: (response: LoginResponse) => {
          this.authService.saveToken(response.token);
          localStorage.setItem('email', email);
          this.router.navigate(['/ead'], { queryParams: { email } });
        },
        error: (error) => {
          console.error('Erro ao entrar', error);
        }
      });
  }
}
