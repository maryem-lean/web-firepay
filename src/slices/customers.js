import { createSlice } from '@reduxjs/toolkit';
import { objFromArray } from 'src/utils/obj-from-array';

const initialState = {
  options: [],
  names: [],
};

const reducers = {
  getOptions(state, action) {
    state.options = action.payload.map((company)=> ({
        label: company.name,
        value: company.customer_id
    }));
  },
  getNames(state, action) {
    state.names = action.payload.map((company) => company.name);
  },
};


export const slice = createSlice({
  name: 'customers',
  initialState,
  reducers
});

export const { reducer } = slice;
