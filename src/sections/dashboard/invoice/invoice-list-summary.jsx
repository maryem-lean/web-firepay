import ClockIcon from '@untitled-ui/icons-react/build/esm/Clock';
import ReceiptCheckIcon from '@untitled-ui/icons-react/build/esm/ReceiptCheck';
import ReceiptIcon from '@untitled-ui/icons-react/build/esm/Receipt';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Unstable_Grid2';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export const InvoiceListSummary = ({paidInvoices, unpaidInvoices}) => {
  const paidAmount = paidInvoices.reduce((n, {amount}) => n + amount, 0) || 0;
  const unpaidAmount = unpaidInvoices.reduce((n, {amount}) => n + amount, 0) || 0;

  return (
  <div>
    <Grid
        container
        spacing={3}
    >
      <Grid
          xs={12}
          md={6}
          lg={4}
      >
        <Card>
          <CardContent>
            <Stack
                alignItems="center"
                direction="row"
                spacing={2}
            >
              <Avatar
                  sx={{
                    height: 48,
                    width: 48,
                  }}
              >
                <ReceiptIcon/>
              </Avatar>
              <div>
                <Typography
                    color="text.secondary"
                    variant="body2"
                >
                  Total
                </Typography>
                <Typography variant="h6">
                  ${Math.round((paidAmount + unpaidAmount) * 100) / 100}
                </Typography>
                <Typography
                    color="text.secondary"
                    variant="body2"
                >
                  from {paidInvoices.length + unpaidInvoices.length} invoices
                </Typography>
              </div>
            </Stack>
          </CardContent>
        </Card>
      </Grid>
      <Grid
          xs={12}
          md={6}
          lg={4}
      >
        <Card>
          <CardContent>
            <Stack
                alignItems="center"
                direction="row"
                spacing={2}
            >
              <Avatar
                  sx={{
                    backgroundColor: 'success.lightest',
                    color: 'success.main',
                    height: 48,
                    width: 48,
                  }}
              >
                <ReceiptCheckIcon/>
              </Avatar>
              <div>
                <Typography
                    color="text.secondary"
                    variant="body2"
                >
                  Paid
                </Typography>
                <Typography variant="h6">
                  ${Math.round(paidAmount * 100) / 100}
                </Typography>
                <Typography
                    color="text.secondary"
                    variant="body2"
                >
                  from {paidInvoices.length} invoices
                </Typography>
              </div>
            </Stack>
          </CardContent>
        </Card>
      </Grid>
      <Grid
          xs={12}
          md={6}
          lg={4}
      >
        <Card>
          <CardContent>
            <Stack
                alignItems="center"
                direction="row"
                spacing={2}
            >
              <Avatar
                  sx={{
                    backgroundColor: 'warning.lightest',
                    color: 'warning.main',
                    height: 48,
                    width: 48,
                  }}
              >
                <ClockIcon/>
              </Avatar>
              <div>
                <Typography
                    color="text.secondary"
                    variant="body2"
                >
                  Pending
                </Typography>
                <Typography variant="h6">
                  ${Math.round(unpaidAmount * 100) / 100}
                </Typography>
                <Typography
                    color="text.secondary"
                    variant="body2"
                >
                  from {unpaidInvoices.length} invoices
                </Typography>
              </div>
            </Stack>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  </div>
)};
