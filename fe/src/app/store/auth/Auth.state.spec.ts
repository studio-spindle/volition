import {TestBed} from '@angular/core/testing';
import {NgxsModule, Store} from '@ngxs/store';
import {AuthState} from './Auth.state';
import {AuthService} from '../../auth/auth.service';
import {HttpClient, HttpClientModule, HttpHandler} from '@angular/common/http';
import {Login, Logout, Register} from 'actions';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {of} from 'rxjs';

const fakeToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' +
  'eyJ1c2VybmFtZSI6Ik15TmFtZTEyMyIsImlhdCI6MTYwNjE2MTQ2NiwiZXhwIjoxNjA2MTY1MDY2fQ.' +
  '0L3z4TOdrgYilmCTfqaccwgi17ur_6w1yld8eoDzzAg';


describe('Auth', () => {
  let store: Store;
  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([AuthState]), HttpClientTestingModule],
      providers: [HttpClient, HttpHandler, AuthService]
    });

    store = TestBed.inject(Store);
    authService = TestBed.inject(AuthService);
  });

  function setupState(NEW_STATE = null) {
    store.reset({
      ...store.snapshot(),
      auth: NEW_STATE
    });
  }

  describe('Selectors', () => {
    describe('getToken', () => {
      it('returns the token', () => {
        const token = 'eyFoo';
        setupState({ token });
        const getToken = store.selectSnapshot(AuthState.getToken);
        expect(getToken).toBe(token);
      });
    });
    describe('isAuthenticated', () => {
      it('isAuthenticated when a token has been provided', () => {
        const token = 'eyFoo';
        setupState({ token });
        const isAuthenticated = store.selectSnapshot(AuthState.isAuthenticated);
        expect(isAuthenticated).toBe(true);
      });
    });
    describe('getExpiration', () => {
      it('returns the expiration time', () => {
        const expiresAt = '2020-11-23T21:57:46+01:00';
        setupState({ expiresAt });
        const getExpiration = store.selectSnapshot(AuthState.getExpiration);
        expect(getExpiration).toEqual(expiresAt);
      });
    });
    describe('isLoggedIn', () => {
      it('returns true when current time is before token expiration time', () => {
        const expiresAt = '2071-10-19T09:15:18.031Z';
        setupState({ expiresAt });
        const isLoggedIn = store.selectSnapshot(AuthState.isLoggedIn);
        expect(isLoggedIn).toBe(true);
      });
      it('returns false when current time is before token expiration time', () => {
        const expiresAt = '2019-10-19T09:15:18.031Z';
        setupState({ expiresAt });
        const isLoggedIn = store.selectSnapshot(AuthState.isLoggedIn);
        expect(isLoggedIn).toBe(false);
      });
    });
    describe('isLoggedOut', () => {
      it('returns false when current time is before token expiration time', () => {
        const expiresAt = '2071-10-19T09:15:18.031Z';
        setupState({ expiresAt });
        const isLoggedOut = store.selectSnapshot(AuthState.isLoggedOut);
        expect(isLoggedOut).toBe(false);
      });
      it('returns true when current time is before token expiration time', () => {
        const expiresAt = '2019-10-19T09:15:18.031Z';
        setupState({ expiresAt });
        const isLoggedOut = store.selectSnapshot(AuthState.isLoggedOut);
        expect(isLoggedOut).toBe(true);
      });
    });
  });

  describe('Actions', () => {
    xdescribe('Register', () => {
      // skipped, does not actually update state (yet)
    });
    describe('Login', () => {
      it('foo', () => {
        spyOn(authService, 'login').and.returnValue(of({ accessToken: fakeToken }));
        const expectedState = { token: fakeToken, username: 'Some username', expiresAt: '2020-11-23T21:57:46+01:00' };
        setupState();
        store.dispatch(new Login({ username: expectedState.username, password: '' }));
        const auth = store.selectSnapshot(state => state.auth);
        console.log('===> auth: ', auth);
        expect(auth).toEqual(expectedState);
      });
    });
    describe('Logout', () => {
      it('resets the auth state', () => {
        const emptyState = { token: null, username: null, expiresAt: null };
        setupState();
        store.dispatch(new Logout());
        const auth = store.selectSnapshot(state => state.auth);
        expect(auth).toEqual(emptyState);
      });
    });
  });
});
