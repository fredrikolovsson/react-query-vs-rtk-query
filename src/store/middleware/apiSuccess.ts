import { AnyAction, MiddlewareAPI, isFulfilled } from '@reduxjs/toolkit'

/**
 * Log a warning and show a toast!
 */
export const rtkQuerySuccessLogger = (_: MiddlewareAPI) => (
  next: (action: AnyAction) => void
) => (action: AnyAction) => {
  // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these use matchers!
  if (isFulfilled(action)) {
    console.log('We got a fulfilled action!', action)
  }

  return next(action)
}
