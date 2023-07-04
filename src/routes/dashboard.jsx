import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { Layout as DashboardLayout } from 'src/layouts/dashboard';

const OverviewPage = lazy(() => import('src/pages/dashboard/index'));

// Customer
const CustomerListPage = lazy(() => import('src/pages/dashboard/customers/list'));
const CustomerDetailPage = lazy(() => import('src/pages/dashboard/customers/detail'));
const CustomerEditPage = lazy(() => import('src/pages/dashboard/customers/edit'));
const CustomerCreatePage = lazy(() => import('src/pages/dashboard/customers/create'));

// Invoice
const InvoiceListPage = lazy(() => import('src/pages/dashboard/invoices/list'));
const InvoiceDetailPage = lazy(() => import('src/pages/dashboard/invoices/detail'));
const InvoiceCreatePage = lazy(() => import('src/pages/dashboard/invoices/create'));

export const dashboardRoutes = [
  {
    path: 'dashboard',
    element: (
      <DashboardLayout>
        <Suspense>
          <Outlet />
        </Suspense>
      </DashboardLayout>
    ),
    children: [
      {
        index: true,
        element: <OverviewPage />,
      },


      {
        path: 'customers',
        children: [
          {
            index: true,
            element: <CustomerListPage />,
          },
          {
            path: ':customerId',
            element: <CustomerDetailPage />,
          },
          {
            path: ':customerId/edit',
            element: <CustomerEditPage />,
          },
          {
            path: 'create',
            element: <CustomerCreatePage />,
          },
        ],
      },
      {
        path: 'invoices',
        children: [
          {
            index: true,
            element: <InvoiceListPage />,
          },
          {
            path: ':invoiceId',
            element: <InvoiceDetailPage />,
          },
          {
            path: 'create',
            element: <InvoiceCreatePage />,
          },
        ],
      },
    ],
  },
];
