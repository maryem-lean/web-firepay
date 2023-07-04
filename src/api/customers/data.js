import { subDays, subHours, subMinutes, subSeconds } from 'date-fns';

const now = new Date();

export const customers = [
  {
    id: "{UUID}",
    logo: '/assets/avatars/avatar-carson-darrin.png',
    country: 'UAE',
    currency: '$',
    email: 'accounts@plutocard.com',
    name: 'PlutoCard',
    totalPaid: "CALCULATED_VALUE",
    totalInvoices: "CALUCALTED_VALUE",
    updatedAt: subDays(subHours(now, 4), 2).getTime(),
    address: 'Gate Village, Building GV8, Level 2, DIFC, Dubai, U.A.E.',
    companyName: 'Mockbank LTD',
    taxId: '6934656584231'
  },
];

export const customer = {
  id: '5e86805e2bafd54f66cc95c3',
  address1: 'Street John Wick, no. 7',
  address2: 'House #25',
  avatar: '/assets/avatars/avatar-miron-vitold.png',
  balance: 0,
  city: 'San Diego',
  country: 'USA',
  currency: '$',
  email: 'miron.vitold@devias.io',
  hasDiscount: false,
  isVerified: true,
  name: 'Miron Vitold',
  phone: '+55 748 327 439',
  state: 'New York',
  vatRate: 19,
  zipCode: '240355'
};

export const emails = [
  {
    id: '5ece2ce3613486d95ffaea58',
    createdAt: subDays(subHours(subMinutes(now, 34), 5), 3).getTime(),
    description: 'Order confirmation'
  },
  {
    id: '5ece2ce8cebf7ad1d100c0cd',
    createdAt: subDays(subHours(subMinutes(now, 49), 11), 4).getTime(),
    description: 'Order confirmation'
  }
];

export const invoices = [
  {
    id: '528651571NT',
    issueDate: now.getTime(),
    status: 'paid',
    amount: 1358.75
  },
  {
    id: '311658671JR',
    issueDate: now.getTime(),
    status: 'unpaid',
    amount: 1451.75
  }
];

export const logs = [
  {
    id: '5ece2cfeb6e2ac847bba11ce',
    createdAt: subDays(subMinutes(subSeconds(now, 56), 2), 2).getTime(),
    description: 'Purchase',
    ip: '84.234.243.42',
    method: 'POST',
    route: '/api/purchase',
    status: 200
  },
  {
    id: '5ece2d02510484b2952e1e05',
    createdAt: subDays(subMinutes(subSeconds(now, 56), 2), 2).getTime(),
    description: 'Purchase',
    ip: '84.234.243.42',
    method: 'POST',
    route: '/api/purchase',
    status: 522
  },
  {
    id: '5ece2d08e2748e4e9788901a',
    createdAt: subDays(subMinutes(subSeconds(now, 23), 8), 2).getTime(),
    description: 'Cart remove',
    ip: '84.234.243.42',
    method: 'DELETE',
    route: '/api/products/d65654e/remove',
    status: 200
  },
  {
    id: '5ece2d0c47214e342c2d7f28',
    createdAt: subDays(subMinutes(subSeconds(now, 54), 20), 2).getTime(),
    description: 'Cart add',
    ip: '84.234.243.42',
    method: 'GET',
    route: '/api/products/d65654e/add',
    status: 200
  },
  {
    id: '5ece2d11e4060a97b2b57623',
    createdAt: subDays(subMinutes(subSeconds(now, 16), 34), 2).getTime(),
    description: 'Cart add',
    ip: '84.234.243.42',
    method: 'GET',
    route: '/api/products/c85727f/add',
    status: 200
  },
  {
    id: '5ece2d16cf6d53d8e33656af',
    createdAt: subDays(subMinutes(subSeconds(now, 30), 54), 2).getTime(),
    description: 'View product',
    ip: '84.234.243.42',
    method: 'GET',
    route: '/api/products/c85727f',
    status: 200
  },
  {
    id: '5ece2d1b2ec5071be9286a96',
    createdAt: subDays(subMinutes(subSeconds(now, 40), 56), 2).getTime(),
    description: 'Get products',
    ip: '84.234.243.42',
    method: 'GET',
    route: '/api/products',
    status: 200
  },
  {
    id: '5ece2d22e68d5498917e47bc',
    createdAt: subDays(subMinutes(subSeconds(now, 5), 57), 2).getTime(),
    description: 'Login',
    ip: '84.234.243.42',
    method: 'POST',
    route: '/api/auth/login',
    status: 200
  }
];
