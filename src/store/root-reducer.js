import { combineReducers } from '@reduxjs/toolkit';

import { reducer as customersReducer } from 'src/slices/customers';

export const rootReducer = combineReducers({
  customers: customersReducer
});
