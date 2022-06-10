import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Router } from "@angular/router";
import { map } from "rxjs/operators";
import { TokensObj } from "../models/tokens";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  TOKEN_KEY = "admin";

  apiUrl = environment.apiUrl;

  private userToken;

  xClientInfoHeader = {
    appVersion: "1.0.0",
    os: "macOS",
    osVersion: "10.14.5",
    device: "mac Mini",
    lang: "sv"
  };

  httpOptions = {
    headers: new HttpHeaders({
      "X-ClientInfo": JSON.stringify(this.xClientInfoHeader)
    })
  };

  constructor(private httpClient: HttpClient, private router: Router) {}

  login(username: string, password: string) {
    const endpoint = this.apiUrl + "/login";
    const httpParams = {
      username: username,
      password: password
    };

    return this.httpClient
      .post<{ access_token: string }>(endpoint, httpParams)
      .pipe(
        map(token => {
          this.userToken = token.access_token;
          this.storeToken();
        })
      );
  }

  register(username: string, password: string) {
    const endpoint = this.apiUrl + "/register";
    const httpParams = {
      username: username,
      password: password
    };

    return this.httpClient
      .post(endpoint, httpParams)
  }



  logoutAndRedirect() {
    this.logout();
    const url = "/login";
    this.router.navigate([url]);
  }

  logout() {
    this.userToken = undefined;
    this.clearToken();
  }

  getUserToken() {
    return this.userToken;
  }

  isLoggedIn() {
    return typeof this.userToken !== "undefined";
  }

  storeToken() {
    sessionStorage.setItem(this.TOKEN_KEY, this.getUserToken());
  }

  clearToken() {
    sessionStorage.removeItem(this.TOKEN_KEY);
  }

  hasStoredToken() {
    return (
      sessionStorage.getItem(this.TOKEN_KEY) &&
      sessionStorage.getItem(this.TOKEN_KEY).length > 0
    );
  }
}
