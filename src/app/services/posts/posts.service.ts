import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPost, IPostsList } from 'src/app/posts/utils/interfaces';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private baseUrl = environment.baseUrl;

  constructor(private httpClient: HttpClient) {}

  fetchPostsList(limit?: number, page?: number, userId?: number): Observable<IPostsList> {
    const queryParams = { limit, page };
    let url = 'posts';
    if (userId) url += `/user/${userId}`;
    url += this.buildQueryParams(queryParams);
    return this.httpClient.get<IPostsList>(`${this.baseUrl}/${url}`);
  }

  createPost(post: IPost): Observable<IPost> {
    return this.httpClient.post<IPost>(`${this.baseUrl}/posts`, post);
  }

  editPost(id: number, post: IPost): Observable<IPost> {
    return this.httpClient.put<IPost>(`${this.baseUrl}/posts/${id}`, post);
  }

  deletePost(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.baseUrl}/posts/${id}`);
  }

  private buildQueryParams(params: any): string {
    const query = [];
    for (let param in params) {
      if (param) query.push(`${encodeURIComponent(param)}=${encodeURIComponent(params[param])}`);
    }

    const stringifyiedQery = query.toString().replace(/,/g, '&');
    return `?${stringifyiedQery}`;
  }
}
