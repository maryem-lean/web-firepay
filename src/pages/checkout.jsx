import {useCallback, useEffect, useState} from 'react';
import {PDFDownloadLink} from '@react-pdf/renderer';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import {invoicesApi} from 'src/api/invoices';
import {Seo} from 'src/components/seo';
import {useDialog} from 'src/hooks/use-dialog';
import {useMounted} from 'src/hooks/use-mounted';
import {usePageView} from 'src/hooks/use-page-view';
import {InvoicePdfDialog} from 'src/sections/dashboard/invoice/invoice-pdf-dialog';
import {InvoicePdfDocument} from 'src/sections/dashboard/invoice/invoice-pdf-document';
import {InvoicePreview} from 'src/sections/dashboard/invoice/invoice-preview';
import {getInitials} from 'src/utils/get-initials';
import {linkSDKApi} from "../api/linkSDK";
import {useParams} from "react-router";

const useInvoice = () => {
    const isMounted = useMounted();
    const [invoice, setInvoice] = useState(null);

    const handleInvoiceGet = useCallback(async (invoiceId) => {
        try {
            const response = await invoicesApi.getInvoice({invoice:invoiceId});

            if (isMounted()) {
                setInvoice(response);
            }
        } catch (err) {
            console.error(err);
        }
    }, [isMounted]);


    useEffect(
        () => {
            const queryParams = new URLSearchParams(window.location.search)
            handleInvoiceGet(queryParams.get("invoice_id"));
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [],
    );

    return invoice;
};


const Page = () => {
    const invoice = useInvoice();
    const dialog = useDialog();
    const [connected, setConnected] = useState(invoice?.connected);

    useEffect(
        () => {
            setConnected(invoice?.connected)
        },
        [invoice]
    );

    usePageView();

    if (!invoice) {
        return null;
    }

    const connectAccount = () => {
        linkSDKApi.connectAccount(invoice.customer.customer_id,
            invoice.customer.end_user_id,
            (response) => {
                console.log("callback", response)
                if (response.status === "SUCCESS") {
                    setConnected(true)
                }
            })
    }

    const submitPayment = () => {
        linkSDKApi.submitPayment(invoice.payment_intent_id, invoice.customer.end_user_id,
          (response) => {
            console.log("callback", response)
            if (response.status === "SUCCESS") {
                authorisePayment()
            }
          })
    }

    const authorisePayment = () => {
        linkSDKApi.authorisePayment(invoice.customer.customer_id, invoice.customer.end_user_id,
          [invoice.payment_intent_id],
          (response) => {
            console.log("callback", response)
          })
    }

    return (
        <>
            <Seo title="Invoice Details"/>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    py: 8,
                }}
            >
                <Container maxWidth="lg">
                    <Stack
                        divider={<Divider/>}
                        spacing={4}
                    >
                        <Stack spacing={4}>
                            <Stack
                                alignItems="flex-start"
                                direction="row"
                                justifyContent="space-between"
                                spacing={4}
                            >
                                <Stack
                                    alignItems="center"
                                    direction="row"
                                    spacing={2}
                                >
                                    <Avatar
                                        sx={{
                                            height: 42,
                                            width: 42,
                                        }}
                                    >
                                        {/*{getInitials(invoice.customer.name)}*/}
                                    </Avatar>
                                    <div>
                                        <Typography variant="h4">
                                            {invoice.number}
                                        </Typography>
                                        <Typography
                                            color="text.secondary"
                                            variant="body2"
                                        >
                                            {/*{invoice.customer.name}*/}
                                        </Typography>
                                    </div>
                                </Stack>
                                <Stack
                                    alignItems="center"
                                    direction="row"
                                    spacing={2}
                                >
                                    <Button
                                        color="inherit"
                                        onClick={dialog.handleOpen}
                                    >
                                        Preview
                                    </Button>

                                    <Button
                                        color="primary"
                                        variant="contained"
                                        onClick={() => connected ? submitPayment() : connectAccount()}
                                        disabled={!invoice}
                                    >
                                        {connected ? "Pay" : "Connect to Pay"}
                                    </Button>
                                    <PDFDownloadLink
                                        document={<InvoicePdfDocument invoice={invoice}/>}
                                        fileName="invoice"
                                        style={{textDecoration: 'none'}}
                                    >
                                        <Button
                                            color="secondary"
                                            variant="contained"
                                        >
                                            Download
                                        </Button>
                                    </PDFDownloadLink>
                                </Stack>
                            </Stack>
                        </Stack>
                        <InvoicePreview invoice={invoice}/>
                    </Stack>
                </Container>
            </Box>


            <InvoicePdfDialog
                invoice={invoice}
                onClose={dialog.handleClose}
                open={dialog.open}
            />
        </>
    );
};

export default Page;
