import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../shared/user.model';

@Component({
  selector: 'app-top-users-list',
  templateUrl: './top-users-list.component.html',
  styleUrls: ['./top-users-list.component.scss']
})
export class TopUsersListComponent {

  @Input() topUsers$: Observable<User>;

}
