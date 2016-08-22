const extend = require('lodash/extend');
const omit = requrie('lodash/omit');

export default () => (next) => (action) => {
  function makeAction(suffix, data) {
    let newAction = extend({}, action, { type: action.type + suffix }, data); // eslint-disable-line
    delete newAction.promise;
    return newAction;
  }

  if (typeof action.promise !== 'undefined' && typeof action.promise.then === 'function') {
    // Pass along a new action with the promise stripped out, a suffix added to the action type
    // and optionally some additional data
    next(makeAction(''));
    next(makeAction('.LOAD'));
    action.promise.then(
      (data) => next(makeAction('.SUCCESS', {
        response: data.data,
        headers: data.headers,
        statusCode: data.statusCode,
        originalAction: omit(action, 'promise'),
      })),
      (response) => {
        return next(makeAction('.FAILURE', {
          response: response,
          originalAction: omit(action, 'promise'),
        }));
      }
    )
    .done();
  } else {
    return next(action);
  }
};
