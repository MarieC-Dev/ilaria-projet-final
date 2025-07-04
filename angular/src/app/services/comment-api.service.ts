import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommentApiService {
  private API_URL: string = 'http://localhost:3000';

  constructor() { }
}
