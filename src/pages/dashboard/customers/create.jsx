import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { Seo } from 'src/components/seo';
import { usePageView } from 'src/hooks/use-page-view';
import {CustomerCreateForm} from "src/pages/dashboard/customers/customer-create-form";

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
                Create a new client
              </Typography>
            </Stack>
            <CustomerCreateForm />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default Page;
