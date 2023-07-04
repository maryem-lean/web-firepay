import { useCallback, useState } from 'react';
import toast from 'react-hot-toast';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Unstable_Grid2';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { FileDropzone } from 'src/components/file-dropzone';
import { QuillEditor } from 'src/components/quill-editor';
import { useRouter } from 'src/hooks/use-router';
import { paths } from 'src/paths';
import {customersApi} from "src/api/customers";

const initialValues = {
  name: '',
  address: '',
  company_name: '',
  tax_id: '',
};

const validationSchema = Yup.object({
  name: Yup.string().max(255).required(),
  address: Yup.string().max(400).required(),
  company_name: Yup.string().max(400).required(),
  tax_id: Yup.string().max(400).required(),
});

export const CustomerCreateForm = (props) => {
  const router = useRouter();
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, helpers) => {
      try {
        await customersApi.createCustomer({data: values});

        // NOTE: Make API request
        toast.success('Client created');
        router.push(paths.dashboard.customers.index);
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
                    error={!!(formik.touched.name && formik.errors.name)}
                    fullWidth
                    helperText={formik.touched.name && formik.errors.name}
                    label="Client Nickname"
                    name="name"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.name}
                  />
                  <TextField
                      error={!!(formik.touched.company_name && formik.errors.company_name)}
                      fullWidth
                      helperText={formik.touched.company_name && formik.errors.company_name}
                      label="Legal Name"
                      name="company_name"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.company_name}
                  />

                  <TextField
                      error={!!(formik.touched.address && formik.errors.address)}
                      fullWidth
                      helperText={formik.touched.address && formik.errors.address}
                      label="Client Address"
                      name="address"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.address}
                  />

                  <TextField
                      error={!!(formik.touched.tax_id && formik.errors.tax_id)}
                      fullWidth
                      helperText={formik.touched.tax_id && formik.errors.tax_id}
                      label="Tax ID"
                      name="tax_id"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.tax_id}
                  />
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
