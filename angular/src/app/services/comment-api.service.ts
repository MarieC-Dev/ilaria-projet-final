import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

interface Comment {
  recipeId: number,
  userId: number,
  note: number,
  commentText: string
}

@Injectable({
  providedIn: 'root'
})
export class CommentApiService {
  private API_URL: string = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getAllComments(): Observable<any> {
    return this.http.get(`${this.API_URL}/comments`);
  }

  createComment(comment: Comment): Observable<any> {
    return this.http.post<Comment>(`${this.API_URL}/comments`, comment, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

}
