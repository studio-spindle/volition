import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AuthState} from '../../store/auth/auth.state';
import * as AuthActions from '../../store/auth/auth.actions';
import * as UserProfileActions from '../../store/user-profile/user-profile.actions';
import {UserProfileState} from '../../store/user-profile/user-profile.state';
import {selectUserId} from '../../store/auth/auth.selectors';
import {selectPhoto} from '../../store/user-profile/user-profile.selectors';
import {Observable, skipWhile, Subject, takeUntil} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import api from '../../../api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass', '../../../../shared/styles/width.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit, OnDestroy {

  destroy$ = new Subject<boolean>();
  photoUrl$: Observable<string>;

  constructor(
    private authStore: Store<AuthState>,
    private userProfileStore: Store<UserProfileState>,
    private sanitizer: DomSanitizer
  ) {
  }

  ngOnInit(): void {

    this.authStore.select(selectUserId)
      .pipe(takeUntil(this.destroy$))
      .subscribe((id) => {
        if (id) {
          this.userProfileStore.dispatch(UserProfileActions.getUserProfileById({id}));
        }
      });

    this.photoUrl$ = this.userProfileStore.select(selectPhoto)
      .pipe(
        takeUntil(this.destroy$),
        skipWhile((value) => value === null),
        map((imageUrlLocation) => `${api.BASEURL}${imageUrlLocation}`),
      );
  }

  getSafeUrl(url): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  logout(): void {
    this.authStore.dispatch(AuthActions.logOut());
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
