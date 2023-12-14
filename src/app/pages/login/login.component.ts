import { Component } from '@angular/core';
import { FormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loading: boolean = false;

  form = new FormGroup({
    username: new UntypedFormControl('', [Validators.required]),
    password: new UntypedFormControl('', Validators.required)
  });

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackbar: MatSnackBar
  ) {}

  login() {
    this.loading = true;
    let username = this.form.get('username')?.value;
    let psswd = this.form.get('password')?.value;

    this.authService.login(username, psswd)
    .subscribe({
      next: (result) => {
        localStorage.setItem("token", result.data.token);
        localStorage.setItem("refreshToken", result.data.refreshToken);
        
        this.router.navigate(['/recover-files'])
        this.loading = false;
      },
      error: (error) => {
        let mess = error.status === 400 
          ? 'Incorrect username/password' 
          : 'Error trying to login. Please, try again';
        this.snackbar.open(mess, 'OK')
        this.loading = false;
      }
    })

  }

}
