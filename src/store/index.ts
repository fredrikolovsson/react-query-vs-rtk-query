import { configureStore } from '@reduxjs/toolkit'

import { pokemonApi } from '../services/pokemon'
import { rtkQueryErrorLogger } from './middleware/apiError'
import { rtkQuerySuccessLogger } from './middleware/apiSuccess'

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [pokemonApi.reducerPath]: pokemonApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // these caused lots of console warnings so disabled them
      // "ImmutableStateInvariantMiddleware took 44ms, which is more than the warning threshold of 32ms"
      // "SerializableStateInvariantMiddleware took 88ms, which is more than the warning threshold of 32ms."
      immutableCheck: false,
      serializableCheck: false,
    }).concat(
      pokemonApi.middleware,
      rtkQueryErrorLogger,
      rtkQuerySuccessLogger
    ),
})
