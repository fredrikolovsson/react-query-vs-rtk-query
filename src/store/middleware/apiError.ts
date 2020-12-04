import { AnyAction, MiddlewareAPI, isRejectedWithValue } from '@reduxjs/toolkit'

import { logError } from '../../logging'

/**
 * Log a warning and show a toast!
 */
export const rtkQueryErrorLogger = (_: MiddlewareAPI) => (
  next: (action: AnyAction) => void
) => (action: AnyAction) => {
  // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these use matchers!
  if (isRejectedWithValue(action)) {
    logError(action.type, action.payload)
  }

  return next(action)
}
