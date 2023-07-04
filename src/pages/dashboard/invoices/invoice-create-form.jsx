import {useCallback, useEffect, useMemo, useState} from 'react';
import toast from 'react-hot-toast';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Unstable_Grid2';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useRouter } from 'src/hooks/use-router';
import { paths } from 'src/paths';
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import {useMounted} from "src/hooks/use-mounted";
import {invoicesApi} from "src/api/invoices";
import {customersApi} from "src/api/customers";
import {useDispatch, useSelector} from "src/store";
import {thunks} from "src/thunks/customers";

const currencyOptions = [
  {
    value: "AED",
    label: "AED"
  },
  {
    value: "USD",
    label: "USD"
  }
]


const useGetCustomerDropdownOptions = () => {
  const dispatch = useDispatch();
  const options = useSelector((state) => state.customers.options);

  const handleCustomerDropdownOptionsGet = useCallback(() => {
    dispatch(thunks.getCustomerDropdownOptions());
  }, [dispatch]);

  useEffect(
      () => {
        handleCustomerDropdownOptionsGet();
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [],
  );

  return options;
};

const initialValues = {
  amount: '',
  number: '',
  due_date: null,
  customer_id: '',
  currency: '',
};

const validationSchema = Yup.object({
  amount: Yup.number().max(255).required(),
  number: Yup.string().max(255).required(),
  due_date: Yup.string().max(255).required(),
  customer_id: Yup.string().max(255).required(),
  currency: Yup.string().max(255).required(),
});

export const InvoiceCreateForm = (props) => {
  const customersOptions = useGetCustomerDropdownOptions()

  console.log("customersOptions", customersOptions)

  const router = useRouter();
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, helpers) => {
      try {
        console.log("values", values)
        await invoicesApi.createInvoice({data: values});

        // NOTE: Make API request
        toast.success('Invoice created');
        router.push(paths.dashboard.invoices.index);
      } catch (err) {
        console.error(err);
        toast.error('Something went wrong!');
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      {...props}>
      <Stack spacing={4}>
        <Card>
          <CardContent>
            <Grid
              container
              spacing={3}
            >
              <Grid
                xs={12}
                md={4}
              >
                <Typography variant="h6">
                  Basic details
                </Typography>
              </Grid>
              <Grid
                xs={12}
                md={8}
              >
                <Stack spacing={3}>
                  <TextField
                      error={!!(formik.touched.number && formik.errors.number)}
                      fullWidth
                      helperText={formik.touched.number && formik.errors.number}
                      label="Invoice number"
                      name="number"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.number}
                  />
                  <TextField
                      error={!!(formik.touched.amount && formik.errors.amount)}
                      fullWidth
                      helperText={formik.touched.amount && formik.errors.amount}
                      label="Invoice Amount"
                      name="amount"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.amount}
                  />
                  <DatePicker
                      onChange={(value) => formik.setFieldValue("due_date", value, true)}
                      error={!!(formik.touched.due_date && formik.errors.due_date)}
                      fullWidth
                      helperText={formik.touched.due_date && formik.errors.due_date}
                      label="Due Date"
                      name="due_date"
                      format="dd/MM/yyyy"
                      onBlur={formik.handleBlur}
                      minDate={new Date()}
                      // onChange={formik.handleChange}
                      value={formik.values.due_date}
                  />
                  <TextField
                      error={!!(formik.touched.customer_id && formik.errors.customer_id)}
                      helperText={formik.touched.customer_id && formik.errors.customer_id}
                      fullWidth
                      label="Client"
                      name="customer_id"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      select
                      value={formik.values.customer_id}
                      defaultValue={''}
                  >
                    {customersOptions.map((option) => (
                        <MenuItem
                            key={option.value}
                            value={option.value}
                        >
                          {option.label}
                        </MenuItem>
                    ))}
                  </TextField>


                  <TextField
                      error={!!(formik.touched.currency && formik.errors.currency)}
                      helperText={formik.touched.currency && formik.errors.currency}
                      fullWidth
                      label="Currency"
                      name="currency"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      select
                      value={formik.values.currency}
                      defaultValue={''}
                  >
                    {currencyOptions.map((option) => (
                        <MenuItem
                            key={option.value}
                            value={option.value}
                        >
                          {option.label}
                        </MenuItem>
                    ))}
                  </TextField>
                </Stack>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        <Stack
          alignItems="center"
          direction="row"
          justifyContent="flex-end"
          spacing={1}
        >
          <Button color="inherit">
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
          >
            Create
          </Button>
        </Stack>
      </Stack>
    </form>
  );
};
