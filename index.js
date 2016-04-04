import getApiReducerFunc, {
  initial as initialFunc,
  load as loadFunc,
  success as successFunc,
  fail as failureFunc,
  reset as resetFunc,
} from './src/get-api-reducer';
import apiMiddlewareFunc from './src/api-middleware';

export const getApiReducer = getApiReducerFunc;
export const initial = initialFunc;
export const load = loadFunc;
export const success = successFunc;
export const failure = failureFunc;
export const reset = resetFunc;
export const apiMiddleware = apiMiddlewareFunc;
