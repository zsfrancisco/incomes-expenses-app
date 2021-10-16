import {Component, OnInit} from '@angular/core';
import {selectUser} from "../../auth/auth.selectors";
import {Observable} from "rxjs";
import {User} from "../../models/user.model";
import {Store} from "@ngrx/store";
import {AppState} from "../../app.reducer";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent implements OnInit {

  user$: Observable<User>;

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.getSelectors();
  }

  getSelectors(): void {
    this.user$ = this.store.select(selectUser);
  }
}
