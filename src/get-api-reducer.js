import Immutable from 'immutable';

export const baseState = Immutable.fromJS({
  loaded: false,
  doing: false,
  done: false,
  data: {},
  apiErrors: null,
});
export const initial = (state) => state.set('doing', true);
export const load = (state) => state.merge({
  doing: true,
  loading: true,
});
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
  apiErrors: Immutable.fromJS(action.error),
});
export const reset = () => baseState;

export default function (
  actionTypePrefix,
  initialValue,
  reducers
) {
  return function reducer(state = initialValue, action) {
    let method = false;

    if (typeof reducers[action.type] === 'function') {
      method = reducers[action.type];
    }

    if (method) {
      return method(state, action);
    }

    return state;
  };
}
