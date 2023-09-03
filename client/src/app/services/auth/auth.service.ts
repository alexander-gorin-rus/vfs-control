import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private cookieService: CookieService) {}
  apiUrl = environment.apiUrl
  tokenKey = 'token';
  requestHeader = new HttpHeaders({
    "No_Auth": "True"
  })

  async getAllWorkers() {
    return await this.http.get(this.apiUrl + '/users');
  }

  async registerWorker(inputData: any) {
    return await this.http.post(this.apiUrl + '/register', inputData);
  }

  async loginWorker(inputData: any) {
    return await this.http.post(this.apiUrl + '/login', inputData, { headers: this.requestHeader});
  }

  async updateWorker(inputData: any) {
    return await this.http.put(this.apiUrl + '/updateWorker', inputData);
  }
  
  async removeWorker(id: any) {
    return await this.http.delete(this.apiUrl + '/deleteWorker', id);
  }

  public setRole(role: string) {
    localStorage.setItem("role", role)
  }

  public getRole() {
    const roleValue = localStorage.getItem("role");
    if (roleValue !== null) {
      return roleValue;
    }
    return null;
  }

  setToken(token: string): void {
    this.cookieService.set(this.tokenKey, token);
  }

  getToken(): string {
    return this.cookieService.get(this.tokenKey);
  }

  removeToken(): void {
    this.cookieService.delete(this.tokenKey);
  }

  public isLoggedIn() {
    return this.getRole() && this.getToken();
  }

  public roleMatch(allowedRole: any): boolean {
    let isMatch = false;
    const userRole: any = this.getRole();
  
    if (userRole === allowedRole) {
      isMatch = true;
      return isMatch;
    } else {
      return isMatch
    }
  }
}
