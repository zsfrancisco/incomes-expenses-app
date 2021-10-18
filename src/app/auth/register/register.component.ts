import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Store} from "@ngrx/store";
import {AppState} from "../../app.reducer";
import * as uiActions from "../../shared/ui.actions";
import {Router} from "@angular/router";
import Swal from "sweetalert2";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit, OnDestroy {

  // @ts-ignore
  form: FormGroup;
  isLoading = false;
  uiSubscription: Subscription | undefined;

  constructor(private authService: AuthService,
              private formBuilder: FormBuilder,
              private store: Store<AppState>,
              private router: Router) {
  }

  ngOnInit(): void {
    this.createForm();
    this.getSubscriptions();
  }

  ngOnDestroy(): void {
    this.uiSubscription?.unsubscribe();
  }

  createForm(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  getSubscriptions(): void {
    this.uiSubscription = this.store.select('ui').subscribe(ui => this.isLoading = ui.isLoading);
  }

  async onSubmit(): Promise<void> {
    if (this.form.invalid) return;
    try {
      this.store.dispatch(uiActions.setLoading({isLoading: true}));
      await this.authService.registerUser(this.form.value);
      this.store.dispatch(uiActions.setLoading({isLoading: false}));
      await this.router.navigate(['/']);
    } catch (error) {
      this.store.dispatch(uiActions.setLoading({isLoading: false}));
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.message
      });
    }
  }
}
