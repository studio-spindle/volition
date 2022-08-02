import {Action, ActionReducer} from '@ngrx/store';
import {merge, pick} from 'lodash-es';
import {AuthState} from './auth.state';

function setStateInLocalStorage(state: any, key: string) {
  localStorage.setItem(key, JSON.stringify(state));
}
function getStateFromLocalStorage(key: string): any {
  return JSON.parse(localStorage.getItem(key));
}

const stateKeysToStore: Array<keyof AuthState> = ['token', 'expiresAt', 'username'];

export enum LocalStorageKeys {
  AUTH = '__auth__'
}

export function authMetaReducer<S, A extends Action = Action>(reducer: ActionReducer<S, A>) {
  let onInit = true;

  return (state: S, action: A): S => {
    const nextState = reducer(state, action);

    // only on initialisation of the application set the state based on localstorage
    if (onInit) {
      onInit = false;
      const stateFromLocalStorage = getStateFromLocalStorage(LocalStorageKeys.AUTH);
      return merge(nextState, stateFromLocalStorage);
    }

    // otherwise save changes to localstorage
    const stateToStore = pick(nextState, stateKeysToStore);
    setStateInLocalStorage(stateToStore, LocalStorageKeys.AUTH);
    return nextState;
  };
}
