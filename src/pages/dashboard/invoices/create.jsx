import Box from '@mui/material/Box';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { BreadcrumbsSeparator } from 'src/components/breadcrumbs-separator';
import { RouterLink } from 'src/components/router-link';
import { Seo } from 'src/components/seo';
import { usePageView } from 'src/hooks/use-page-view';
import { paths } from 'src/paths';
import {InvoiceCreateForm} from "src/pages/dashboard/invoices/invoice-create-form";

const Page = () => {
  usePageView();

  return (
    <>
      <Seo title="Dashboard: Create Customer" />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack spacing={1}>
              <Typography variant="h4">
                Create a new invoice
              </Typography>
            </Stack>
            <InvoiceCreateForm />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default Page;
