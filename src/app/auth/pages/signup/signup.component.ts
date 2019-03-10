import {Component} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthSandbox} from '../../auth.sandbox';
import {Router} from '@angular/router';
import { of } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  message$;

  constructor(private sb: AuthSandbox, private router: Router) { }

  onSignup(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    const username = form.value.username;
    this.sb.signup(email, username, password).subscribe( () => {
      this.router.navigate(['/']).then();
    }, error => {
      this.message$ = of(error.message);
    });
  }

}
