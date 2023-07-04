import { slice } from 'src/slices/customers';
import {customersApi} from "src/api/customers";

const getCustomerDropdownOptions = () => async (dispatch) => {
  const response = await customersApi.getCustomers();

  dispatch(slice.actions.getOptions(response.data));
};

const getCustomerNames = () => async (dispatch) => {
  const response = await customersApi.getCustomers();

  dispatch(slice.actions.getNames(response.data));
};


export const thunks = {
  getCustomerDropdownOptions,
  getCustomerNames,
};
