import { CHANGE_ROUTE } from '../constants/ActionTypes';
import { compileHash, parseRoute } from '../utils/RouterUtils';

const pushState = (route) => {
  const hash = compileHash(route);
  if (window.location.hash !== hash) {
    window.history.pushState({ route }, '', hash);
  }
};

export const navigateTo = (route, shouldPushState = true) => {
  if (shouldPushState) {
    pushState(route);
  }

  return {
    type: CHANGE_ROUTE,
    route,
  };
};

export const navigateBack = e => (dispatch) => {
  const { state } = e;
  if (state) {
    const { route } = state;
    dispatch(navigateTo(route, false));
  }
};

export const initRouter = paths => (dispatch) => {
  window.onpopstate = (e) => {
    dispatch(navigateBack(e));
  };

  const hash = window.location.hash ? window.location.hash.slice(2) : '';
  const route = parseRoute(hash, paths);
  return dispatch(navigateTo(route));
};
