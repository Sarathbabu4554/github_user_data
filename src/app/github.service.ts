import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class GithubService {
  private apiUrl = 'https://api.github.com';
  userame:any;
  constructor(private http:HttpClient) { }

  getUser(username: any): Observable<any> {
    const url = `${this.apiUrl}/users/${username}`;
    return this.http.get<any>(url);
  }

  getUserRepositories(username: string, page: number = 1, perPage: number = 10): Observable<any[]> {
    const url = `${this.apiUrl}/users/${username}/repos`;
    const params = { page: page.toString(), per_page: perPage.toString() };

    return this.http.get<any[]>(url, { params });
  }

  getalluserData(): Observable<any> {
    const url = `${this.apiUrl}/users`;
    return this.http.get<any>(url);
  }
}
