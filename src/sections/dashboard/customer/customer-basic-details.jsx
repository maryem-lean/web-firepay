import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardHeader from '@mui/material/CardHeader';

import { PropertyList } from 'src/components/property-list';
import { PropertyListItem } from 'src/components/property-list-item';

export const CustomerBasicDetails = (props) => {
  const { customer_id, address,connected, tax_id, name, ...other } = props;

  return (
    <Card {...other}>
      <CardHeader title="Basic Details" />
      <PropertyList>
        <PropertyListItem
          divider
          label="Name"
          value={name}
        />
        <PropertyListItem
          divider
          label="Customer Id"
          value={customer_id}
        />
        <PropertyListItem
          divider
          label="Address"
          value={address}
        />
        <PropertyListItem
          divider
          label="TAX ID"
          value={tax_id}
        />
      </PropertyList>
    </Card>
  );
};

