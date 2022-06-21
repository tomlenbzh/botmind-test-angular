import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IComment, ICommentData, IPost } from '@app/posts/utils/interfaces';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  private baseUrl = environment.baseUrl;

  constructor(private httpClient: HttpClient) {}

  createComment(comment: IComment): Observable<IPost> {
    return this.httpClient.post<IPost>(`${this.baseUrl}/comments`, comment);
  }

  removeComment(data: ICommentData): Observable<any> {
    return this.httpClient.delete<any>(`${this.baseUrl}/comments/${data.commentId}`, { body: data.post });
  }
}
