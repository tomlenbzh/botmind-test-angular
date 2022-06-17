import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPost, IPostsList } from 'src/app/posts/utils/interfaces';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private baseUrl = 'http://localhost:3000';

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

  private buildQueryParams(params: any): string {
    const query = [];
    for (let param in params) {
      if (param) query.push(`${encodeURIComponent(param)}=${encodeURIComponent(params[param])}`);
    }

    const stringifyiedQery = query.toString().replace(/,/g, '&');
    return `?${stringifyiedQery}`;
  }
}
