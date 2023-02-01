import {configureStore} from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import {persistStore} from "redux-persist";

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
    immutableCheck: false,
  })
})

export default store
export const persistor = persistStore(store)