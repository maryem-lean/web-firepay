import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import SvgIcon from '@mui/material/SvgIcon';

import HomeSmileIcon from 'src/icons/untitled-ui/duocolor/home-smile';
import Lock01Icon from 'src/icons/untitled-ui/duocolor/lock-01';
import LogOut01Icon from 'src/icons/untitled-ui/duocolor/log-out-01';
import ReceiptCheckIcon from 'src/icons/untitled-ui/duocolor/receipt-check';
import Users03Icon from 'src/icons/untitled-ui/duocolor/users-03';
import XSquareIcon from 'src/icons/untitled-ui/duocolor/x-square';
import { tokens } from 'src/locales/tokens';
import { paths } from 'src/paths';

export const useSections = () => {
  const { t } = useTranslation();

  return useMemo(() => {
    return [
      {
        items: [
          {
            title: t(tokens.nav.overview),
            path: paths.dashboard.index,
            icon: (
              <SvgIcon fontSize="small">
                <HomeSmileIcon />
              </SvgIcon>
            ),
          },

          {
            title: t(tokens.nav.customers),
            path: paths.dashboard.customers.index,
            icon: (
                <SvgIcon fontSize="small">
                  <Users03Icon />
                </SvgIcon>
            ),
            // items: [
            //   {
            //     title: t(tokens.nav.list),
            //     path: paths.dashboard.customers.index,
            //   },
            //   {
            //     title: t(tokens.nav.details),
            //     path: paths.dashboard.customers.details,
            //   },
            //   {
            //     title: t(tokens.nav.edit),
            //     path: paths.dashboard.customers.edit,
            //   },
            //   {
            //     title: t(tokens.nav.create),
            //     path: paths.dashboard.customers.create,
            //   },
            // ],
          },
          {
            title: t(tokens.nav.invoiceList),
            path: paths.dashboard.invoices.index,
            icon: (
                <SvgIcon fontSize="small">
                  <ReceiptCheckIcon />
                </SvgIcon>
            ),
            // items: [
            //   {
            //     title: t(tokens.nav.list),
            //     path: paths.dashboard.invoices.index,
            //   },
            //   {
            //     title: t(tokens.nav.details),
            //     path: paths.dashboard.invoices.details,
            //   },
            // ],
          },

        ],
      },
      // {
      //   subheader: t(tokens.nav.pages),
      //   items: [
      //     {
      //       title: t(tokens.nav.auth),
      //       icon: (
      //         <SvgIcon fontSize="small">
      //           <Lock01Icon />
      //         </SvgIcon>
      //       ),
      //       items: [
      //         {
      //           title: t(tokens.nav.login),
      //           items: [
      //             {
      //               title: 'Classic',
      //               path: paths.authDemo.login.classic,
      //             },
      //             {
      //               title: 'Modern',
      //               path: paths.authDemo.login.modern,
      //             },
      //           ],
      //         },
      //       ],
      //     },
      //     {
      //       title: t(tokens.nav.checkout),
      //       path: paths.checkout,
      //       icon: (
      //         <SvgIcon fontSize="small">
      //           <LogOut01Icon />
      //         </SvgIcon>
      //       ),
      //     },
      //     {
      //       title: t(tokens.nav.error),
      //       icon: (
      //         <SvgIcon fontSize="small">
      //           <XSquareIcon />
      //         </SvgIcon>
      //       ),
      //       items: [
      //         {
      //           title: '401',
      //           path: paths.notAuthorized,
      //         },
      //         {
      //           title: '404',
      //           path: paths.notFound,
      //         },
      //         {
      //           title: '500',
      //           path: paths.serverError,
      //         },
      //       ],
      //     },
      //   ],
      // },
    ];
  }, [t]);
};
