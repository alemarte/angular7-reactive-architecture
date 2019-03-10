import {Component} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthSandbox} from '../../auth.sandbox';
import {Router} from '@angular/router';
import { of } from 'rxjs';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent {

  message$;

  constructor(private sb: AuthSandbox, private router: Router) { }

  onSignin(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    this.sb.signin(email, password).subscribe( () => {
      this.router.navigate(['/']).then();
    }, error => {
      this.message$ = of(error.message);
    });
  }

}
