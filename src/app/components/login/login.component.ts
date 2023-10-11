import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomValidators } from 'src/app/validators/custom-validators';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,
            ReactiveFormsModule
           ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {


  loginForm = this.fb.group({
    userName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    password: ['', [Validators.required, CustomValidators.isPasswordValid(), CustomValidators.keywordValidator()]],
  });

  constructor(private fb: FormBuilder, private storage: LocalStorageService, private router: Router){}

  onSubmit(){

    console.log(this.loginForm.value);
    const isUserValid = this.storage.checkUser(this.loginForm.value.userName as string, this.loginForm.value.password as string);

    if (isUserValid) {
      this.storage.saveLogin();
      this.router.navigateByUrl('/secret');
    }
  }

}
