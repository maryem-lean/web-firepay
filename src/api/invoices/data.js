import { addDays, subDays, subHours } from 'date-fns';

const now = new Date();

export const invoices = [
  {
    id: '5ecb868d0f437390ef3ac62c',
    currency: '$',
    customer: {
      email: 'contact@acme.com',
      name: 'ACME SRL'
    },
    dueDate: addDays(now, 5).getTime(),
    issueDate: subHours(now, 1).getTime(),
    number: 'INV-0019',
    status: 'paid',
    totalAmount: 55.50
  },
  {
    id: '59d78b0b0e15394130c373ff',
    currency: '$',
    customer: {
      email: 'sales@blind-spots.com',
      name: 'Blind Spots Inc.'
    },
    dueDate: addDays(now, 6).getTime(),
    issueDate: subHours(now, 1).getTime(),
    number: 'INV-0018',
    status: 'paid',
    totalAmount: 688.90
  },
  {
    id: '2a05e7f757c35fe823da3c5a',
    currency: '$',
    customer: {
      email: 'sales@beauty-clinic.com',
      name: 'Beauty Clinic SRL'
    },
    dueDate: addDays(now, 9).getTime(),
    issueDate: subHours(now, 1).getTime(),
    number: 'INV-0017',
    status: 'paid',
    totalAmount: 695.20
  },
  {
    id: '5ecb868ada8deedee0638502',
    currency: '$',
    customer: {
      email: 'sales@matt-jason.com',
      name: 'Matt Jason'
    },
    dueDate: addDays(now, 25).getTime(),
    issueDate: subDays(subHours(now, 5), 2).getTime(),
    number: 'INV-0021',
    status: 'pending',
    totalAmount: 23.11
  },
  {
    id: '750f519b8bc4d21af9528437',
    currency: '$',
    customer: {
      email: 'sales@matt-jason.com',
      name: 'Matt Jason'
    },
    dueDate: addDays(now, 17).getTime(),
    issueDate: subDays(subHours(now, 4), 2).getTime(),
    number: 'INV-0020',
    status: 'pending',
    totalAmount: 253.76
  },
  {
    id: '5ecb868700aba84d0f1c0e48',
    currency: '$',
    customer: {
      email: 'support@terrythomas.io',
      name: 'Terry Thomas'
    },
    dueDate: addDays(now, 11).getTime(),
    issueDate: subDays(subHours(now, 4), 6).getTime(),
    number: 'INV-0015',
    status: 'failed',
    totalAmount: 781.50
  },
  {
    id: '5ecb8682038e1rl239438dks1',
    currency: '$',
    customer: {
      email: 'contact@dispatcher.co.uk',
      name: 'Dispatcher Inc.'
    },
    dueDate: addDays(now, 3).getTime(),
    issueDate: subDays(subHours(now, 2), 15).getTime(),
    number: 'INV-0014',
    status: 'paid',
    totalAmount: 96.64
  },
  {
    id: '5ecb8682038e1ddf4e868764',
    currency: '$',
    customer: {
      email: 'info@novelty.co.uk',
      name: 'Novelty I.S'
    },
    dueDate: addDays(now, 1).getTime(),
    issueDate: subDays(subHours(now, 2), 15).getTime(),
    number: 'INV-0013',
    status: 'failed',
    totalAmount: 496.23
  }
];

export const invoice = {
  id: '5ecb86785312dcc69b5799ad',
  currency: '$',
  customer: {
    address: 'Gate Village, Building GV8, Level 2, DIFC, Dubai, U.A.E.',
    company: 'Mockbank LTD',
    email: 'accounts@mockbank.io',
    name: 'MOCKBANK',
    taxId: '6934656584231'
  },
  dueDate: addDays(now, 5).getTime(),
  issueDate: subHours(now, 1).getTime(),
  items: [
    {
      id: '5ecb8694db1760a701dfbf74',
      currency: '$',
      description: 'API Usage (01/05/2023 - 31/05/2023)',
      quantity: 1,
      totalAmount: 455.50,
      unitAmount: 455.50
    }
  ],
  number: 'INV-0019',
  status: 'PENDING',
  subtotalAmount: 455.50,
  taxAmount: 5.50,
  totalAmount: 461.00
};
