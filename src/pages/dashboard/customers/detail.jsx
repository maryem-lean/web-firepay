import { useCallback, useEffect, useState } from 'react';
import ArrowLeftIcon from '@untitled-ui/icons-react/build/esm/ArrowLeft';
import ChevronDownIcon from '@untitled-ui/icons-react/build/esm/ChevronDown';
import Edit02Icon from '@untitled-ui/icons-react/build/esm/Edit02';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Unstable_Grid2';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';

import { customersApi } from 'src/api/customers';
import { RouterLink } from 'src/components/router-link';
import { Seo } from 'src/components/seo';
import { useMounted } from 'src/hooks/use-mounted';
import { usePageView } from 'src/hooks/use-page-view';
import { paths } from 'src/paths';
import { CustomerBasicDetails } from 'src/sections/dashboard/customer/customer-basic-details';
import { CustomerDataManagement } from 'src/sections/dashboard/customer/customer-data-management';
import { CustomerEmailsSummary } from 'src/sections/dashboard/customer/customer-emails-summary';
import { CustomerInvoices } from 'src/sections/dashboard/customer/customer-invoices';
import { CustomerPayment } from 'src/sections/dashboard/customer/customer-payment';
import { CustomerLogs } from 'src/sections/dashboard/customer/customer-logs';
import { getInitials } from 'src/utils/get-initials';
import {useParams} from "react-router";

const tabs = [
  { label: 'Details', value: 'details' },
  { label: 'Invoices', value: 'invoices' },
];

const useCustomer = (customerId) => {
  const isMounted = useMounted();
  const [customer, setCustomer] = useState(null);

  const handleCustomerGet = useCallback(async () => {
    try {
      const response = await customersApi.getCustomer({customerId});

      if (isMounted()) {
        setCustomer(response);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMounted]);

  useEffect(
    () => {
      handleCustomerGet();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return customer;
};

const useInvoices = (customerId) => {
  const isMounted = useMounted();
  const [invoices, setInvoices] = useState([]);

  const handleInvoicesGet = useCallback(async () => {
    try {
      const response = await customersApi.getInvoices({customerId});

      if (isMounted()) {
        setInvoices(response);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMounted]);

  useEffect(
    () => {
      handleInvoicesGet();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return invoices;
};

const Page = () => {
  const [currentTab, setCurrentTab] = useState('details');
  let { customerId } = useParams();

  const customer = useCustomer(customerId);
  const invoices = useInvoices(customerId);

  usePageView();

  const handleTabsChange = useCallback((event, value) => {
    setCurrentTab(value);
  }, []);

  if (!customer) {
    return null;
  }

  return (
    <>
      <Seo title="Dashboard: Customer Details" />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={4}>
            <Stack spacing={4}>
              <div>
                <Link
                  color="text.primary"
                  component={RouterLink}
                  href={paths.dashboard.customers.index}
                  sx={{
                    alignItems: 'center',
                    display: 'inline-flex',
                  }}
                  underline="hover"
                >
                  <SvgIcon sx={{ mr: 1 }}>
                    <ArrowLeftIcon />
                  </SvgIcon>
                  <Typography variant="subtitle2">
                    Customers
                  </Typography>
                </Link>
              </div>
              <Stack
                alignItems="flex-start"
                direction={{
                  xs: 'column',
                  md: 'row',
                }}
                justifyContent="space-between"
                spacing={4}
              >
                <Stack
                  alignItems="center"
                  direction="row"
                  spacing={2}
                >
                  <Avatar
                    src={customer.avatar}
                    sx={{
                      height: 64,
                      width: 64,
                    }}
                  >
                    {getInitials(customer.name)}
                  </Avatar>
                  <Stack spacing={1}>
                    <Typography variant="h4">
                      {customer.name}
                    </Typography>
                    {/*<Stack*/}
                    {/*  alignItems="center"*/}
                    {/*  direction="row"*/}
                    {/*  spacing={1}*/}
                    {/*>*/}
                    {/*  <Typography variant="subtitle2">*/}
                    {/*    customer:*/}
                    {/*  </Typography>*/}
                    {/*  <Chip*/}
                    {/*    label={customer.id}*/}
                    {/*    size="small"*/}
                    {/*  />*/}
                    {/*</Stack>*/}
                  </Stack>
                </Stack>
              </Stack>
              <div>
                <Tabs
                  indicatorColor="primary"
                  onChange={handleTabsChange}
                  scrollButtons="auto"
                  sx={{ mt: 3 }}
                  textColor="primary"
                  value={currentTab}
                  variant="scrollable"
                >
                  {tabs.map((tab) => (
                    <Tab
                      key={tab.value}
                      label={tab.label}
                      value={tab.value}
                    />
                  ))}
                </Tabs>
                <Divider />
              </div>
            </Stack>
            {currentTab === 'details' && (
              <div>
                <Grid
                  container
                  spacing={4}
                >
                  <Grid
                    xs={12}
                    lg={4}
                  >
                    <CustomerBasicDetails
                        {...customer}
                    />
                  </Grid>
                  <Grid
                    xs={12}
                    lg={8}
                  >
                    <Stack spacing={4}>
                      <CustomerPayment connected={customer.connected.toString().toLocaleUpperCase()} />
                    </Stack>
                  </Grid>
                </Grid>
              </div>
            )}
            {currentTab === 'invoices' && <CustomerInvoices invoices={invoices} />}
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default Page;
