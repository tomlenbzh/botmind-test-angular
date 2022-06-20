import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '@app/store';
import { IUser } from '@auth/utils/interfaces';
import { FETCH_USER_ACTION, UPDATE_USER_ACTION } from './user.actions';
import { selectUser, selectUserLoading } from './user.selectors';

@Injectable({
  providedIn: 'root'
})
export class UserHelper {
  constructor(private store: Store<AppState>) {}

  isLoading(): Observable<boolean> {
    return this.store.pipe(select(selectUserLoading));
  }

  user(): Observable<IUser | null> {
    return this.store.select(selectUser);
  }

  fetchUser(id: number): void {
    this.store.dispatch(FETCH_USER_ACTION({ id }));
  }

  updateUser(id: number, user: IUser): void {
    this.store.dispatch(UPDATE_USER_ACTION({ id, user }));
  }

  // deleteProfile(id: number): void {
  //   this.store.dispatch(DELETE_PROFILE_ACTION({ id }));
  // }
}
