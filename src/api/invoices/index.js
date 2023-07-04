import { endOfDay, startOfDay } from 'date-fns';
import { applyPagination } from 'src/utils/apply-pagination';
import { deepCopy } from 'src/utils/deep-copy';

import { invoice, invoices } from './data';
import axiosClient from "../axios";
import toast from "react-hot-toast";
import {customersApi} from "src/api/customers";

class InvoicesApi {
  async getInvoices(request = {}) {
    const { filters, page, rowsPerPage } = request;

    let data = await axiosClient.get(`/api/admin/invoices/`)
        .then(res => {
          return res.data;
        })
        .catch(err => {
          toast.error("Couldn't fetch invoices!");
          console.log("Invoices Fetch error:", err)
          return [];
        })

    for (let i = 0; i < data.length; i++) {
      const customer = await customersApi.getCustomer({customerId: data[i].customer_id});
      data[i].customer = customer;

        switch (data[i].payment_status) {
          case "AWAITING_AUTHORIZATION":
          case "INVOICE_GENERATED":
            data[i].status = "pending";
            break;
          case "ACCEPTED_BY_BANK":
            data[i].status = "paid";
            break;
          case "AUTHORIZATION_FAILED":
          case "FAILED":
            data[i].status = "failed";
        }

      console.log('ccccustomer', data[i])

    }


    let count = data.length;

    if (typeof filters !== 'undefined') {
      data = data.filter((invoice) => {
        if (typeof filters.query !== 'undefined' && filters.query !== '') {
          const matched = invoice.number.toLowerCase().includes(filters.query.toLowerCase());

          if (!matched) {
            return false;
          }
        }

        if (typeof filters.startDate !== 'undefined') {
          if (typeof invoice.issueDate === 'undefined') {
            return false;
          }

          const matched = endOfDay(invoice.issueDate) >= startOfDay(filters.startDate);

          if (!matched) {
            return false;
          }
        }

        if (typeof filters.endDate !== 'undefined') {
          if (typeof invoice.issueDate === 'undefined') {
            return false;
          }

          const matched = startOfDay(invoice.issueDate) <= endOfDay(filters.endDate);

          if (!matched) {
            return false;
          }
        }

        if (typeof filters.customers !== 'undefined' && filters.customers.length > 0) {
          const matched = filters.customers.includes(invoice.customer.name);

          if (!matched) {
            return false;
          }
        }

        if (typeof filters.status !== 'undefined') {
          if (invoice.status !== filters.status) {
            return false;
          }
        }

        return true;
      });
      count = data.length;
    }

    if (typeof page !== 'undefined' && typeof rowsPerPage !== 'undefined') {
      data = applyPagination(data, page, rowsPerPage);
    }

    return Promise.resolve({
      data,
      count
    });
  }

  async getInvoice(request) {
    let data = await axiosClient.get(`/api/invoices/${request.invoice}`)
        .then(res => {
          return res.data;
        })
        .catch(err => {
          toast.error("Couldn't fetch invoice!");
          console.log("Invoice Fetch error:", err)

        })
    if (data) {
      return Promise.resolve(data);
    } else {
      return Promise.reject("Can't fetch invoice")
    }
  }

  async createInvoice(request) {
    let data = await axiosClient.post(`/api/admin/invoices/`, request.data)
        .then(res => {
          return res.data;
        })
        .catch(err => {
          toast.error("Couldn't create invoice!");
          console.log("Invoice Creation error:", err)

        })
    if (data) {
      return Promise.resolve(data);
    } else {
      return Promise.reject("Can't create invoice")
    }
  }
}

export const invoicesApi = new InvoicesApi();
