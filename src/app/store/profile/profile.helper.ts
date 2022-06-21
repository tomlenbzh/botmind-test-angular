import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store';
import { IUser } from '../../auth/utils/interfaces';
import { FETCH_PROFILE_ACTION, UPDATE_PROFILE_ACTION, DELETE_PROFILE_ACTION } from './profile.actions';
import { selectProfile, selectProfileLoading } from './profile.selectors';

@Injectable({
  providedIn: 'root'
})
export class ProfileHelper {
  constructor(private store: Store<AppState>) {}

  isLoading(): Observable<boolean> {
    return this.store.pipe(select(selectProfileLoading));
  }

  profile(): Observable<IUser | null> {
    return this.store.select(selectProfile);
  }

  fetchProfile(id: number): void {
    this.store.dispatch(FETCH_PROFILE_ACTION({ id }));
  }

  updateProfile(id: number, user: IUser): void {
    this.store.dispatch(UPDATE_PROFILE_ACTION({ id, user }));
  }

  deleteProfile(id: number): void {
    this.store.dispatch(DELETE_PROFILE_ACTION({ id }));
  }
}
