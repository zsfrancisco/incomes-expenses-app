import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import Swal from "sweetalert2";
import {Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {AppState} from "../../app.reducer";
import {Observable} from "rxjs";
import {User} from "../../models/user.model";
import {selectUser} from "../../auth/auth.selectors";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  user$: Observable<User>;

  constructor(private authService: AuthService, private router: Router, private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.getSelectors();
  }

  getSelectors(): void {
    this.user$ = this.store.select(selectUser);
  }

  async onSignOut(): Promise<void> {
    try {
      await this.authService.signOutUser();
      await this.router.navigate(['/login']);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.message
      });
    }
  }
}
