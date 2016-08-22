import Immutable from 'immutable';

export const baseState = Immutable.fromJS({
  loaded: false,
  doing: false,
  done: false,
  data: {},
  apiErrors: null,
});

export const initial = (state) => state.set('doing', true);

export const load = (state) => {
  if (state.get('loaded')) {
    return state;
  }
  return state.merge({
    loading: true,
  });
};

export const success = (state, action) => state.merge({
  loaded: true,
  loading: false,
  doing: false,
  done: true,
  data: Immutable.fromJS(action.response),
  apiErrors: null,
});

export const fail = (state, action) => state.merge({
  doing: false,
  done: false,
  apiErrors: Immutable.fromJS(action.response),
});

export const reset = () => baseState;

export default function (
  baseAction,
  initialState,
  initReducer,
  loadReducer,
  successReducer,
  failureReducer,
  resetReducer
) {
  return function reducer(state = initialState, action) {
    let method = false;
    const reducers = {};
    reducers[baseAction] = initReducer;
    reducers[baseAction + '.LOAD'] = loadReducer;
    reducers[baseAction + '.SUCCESS'] = successReducer;
    reducers[baseAction + '.FAILURE'] = failureReducer;
    reducers[baseAction + '.RESET'] = resetReducer;

    if (typeof reducers[action.type] === 'function') {
      method = reducers[action.type];
    }

    if (method) {
      return method(state, action);
    }

    return state;
  };
}
