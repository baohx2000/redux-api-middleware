# redux-api-middleware
middleware for handling api requests

## Usage

```javascript
import { getApiReducer, baseState, initial, load, success, fail, reset } from '@baohx2000/redux-api-middleware';
// Only getApiReducer is actually needed.  The rest are just basic helper objects & methods

const myReducer = getApiReducer(
  'MYACTION', // base action string,
  baseState, // base state for reducer... note there are many objects included to help compose this base
  initial, // Reducer called upon initial api call
  load, // reducer called immediately after initial call
  success, // called with response from successful call
  fail, // called with response from unsuccessful call (>= 400)
  reset // Call manually to reset the store
);
```
