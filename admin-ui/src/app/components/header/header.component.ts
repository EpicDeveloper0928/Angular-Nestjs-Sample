import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {
  login = true;

  constructor(private authService: AuthService) {}

  ngOnInit() {}

  isLogedIn() {
    return this.authService.hasStoredToken();
  }

  logout() {
    return this.authService.logoutAndRedirect();
  }
}
