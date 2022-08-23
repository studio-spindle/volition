import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, skipWhile, Subject, takeUntil} from 'rxjs';
import {Store} from '@ngrx/store';
import {AuthState} from '../../../store/auth/auth.state';
import {UserProfileState} from '../../../store/user-profile/user-profile.state';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import {selectUserId} from '../../../store/auth/auth.selectors';
import * as UserProfileActions from '../../../store/user-profile/user-profile.actions';
import {selectPhoto} from '../../../store/user-profile/user-profile.selectors';
import {map} from 'rxjs/operators';
import api from '../../../../api';
import * as AuthActions from '../../../store/auth/auth.actions';
import { IconPaths } from 'shared/components/icon/icon.component';

@Component({
  selector: 'app-sidebar-header',
  templateUrl: './sidebar-header.component.html',
  styleUrls: [
    './sidebar-header.component.sass',
    '../../../../../shared/styles/width.sass',
    '../../../../../shared/styles/spacing.sass',
    '../../../../../shared/styles/alignment.sass',
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarHeaderComponent implements OnInit, OnDestroy {

  IconPaths = IconPaths;

  destroy$ = new Subject<boolean>();
  photoUrl$: Observable<string>;
  userMenuActive = false;

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

  toggleUserMenu(): void {
    this.userMenuActive = !this.userMenuActive;
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
