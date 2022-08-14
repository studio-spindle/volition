import {Action, ActionReducer} from '@ngrx/store';
import {merge, pick} from 'lodash-es';

function setStateInLocalStorage(state: any, key: string) {
  localStorage.setItem(key, JSON.stringify(state));
}

function getStateFromLocalStorage(key: string): any {
  try {
    if (localStorage.getItem(key)) {
      return JSON.parse(localStorage.getItem(key));
    } else {
      localStorage.removeItem(key);
    }
  } catch (err) {
    localStorage.removeItem(key);
  }
}

/**
 * createHydrationReducerForFeature
 * @param localStorageKeyName The key name used for the local storage item
 * @param stateKeysToSync These state keys are synced with local storage
 */
export function createHydrationReducerForFeature<StateKeysType>(
  localStorageKeyName: string,
  stateKeysToSync: Array<keyof StateKeysType>
) {

  return function metaReducer<S, A extends Action = Action>(reducer: ActionReducer<S, A>) {
    let onInit = true;

    return (state: S, action: A): S => {
      const nextState = reducer(state, action);

      // only on initialisation of the application set the state based on localstorage
      if (onInit) {
        onInit = false;
        const stateFromLocalStorage = getStateFromLocalStorage(localStorageKeyName);
        return merge(nextState, stateFromLocalStorage);
      }

      // otherwise save changes to localstorage
      const stateToStore = pick(nextState, stateKeysToSync);
      setStateInLocalStorage(stateToStore, localStorageKeyName);
      return nextState;
    };
  };
}
