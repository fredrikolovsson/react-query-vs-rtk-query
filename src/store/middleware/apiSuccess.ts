import { AnyAction, MiddlewareAPI, isPending } from '@reduxjs/toolkit'

import { logRequest } from '../../logging'

/**
 * Log a warning and show a toast!
 */
export const rtkQuerySuccessLogger = (_: MiddlewareAPI) => (
  next: (action: AnyAction) => void
) => (action: AnyAction) => {
  // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these use matchers!
  if (isPending(action)) {
    logRequest((action.meta.arg as any)?.queryCacheKey as string)
  }

  return next(action)
}
