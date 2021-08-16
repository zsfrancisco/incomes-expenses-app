import {Component} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import Swal from "sweetalert2";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent {

  constructor(private authService: AuthService, private router: Router) {
  }

  async onSignOut() {
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
