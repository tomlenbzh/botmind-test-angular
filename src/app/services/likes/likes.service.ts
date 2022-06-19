import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ILike, ILikeData, IPost } from 'src/app/posts/utils/interfaces';

@Injectable({
  providedIn: 'root'
})
export class LikesService {
  private baseUrl = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) {}

  createLike(like: ILike): Observable<IPost> {
    return this.httpClient.post<IPost>(`${this.baseUrl}/likes`, like);
  }

  removeLike(data: ILikeData): Observable<any> {
    return this.httpClient.delete<any>(`${this.baseUrl}/likes/${data.likeId}`, { body: data.post });
  }
}
