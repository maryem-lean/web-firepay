import { applyPagination } from 'src/utils/apply-pagination';
import { applySort } from 'src/utils/apply-sort';
import { deepCopy } from 'src/utils/deep-copy';

import { customer, emails, invoices, logs } from './data';
import axiosClient from "src/api/axios";
import toast from "react-hot-toast";

class CustomersApi {
  async getCustomers(request = {}) {
    const { filters, page, rowsPerPage, sortBy, sortDir } = request;

    let data = await axiosClient.get(`/api/admin/customers/`)
        .then(res => {
          return res.data;
        })
        .catch(err => {
          toast.error("Couldn't fetch clients!");
          console.log("Client Fetch error:", err)
          return [];
        })

    let count = data.length;

    if (typeof filters !== 'undefined') {
      data = data.filter((customer) => {
        if (typeof filters.query !== 'undefined' && filters.query !== '') {
          let queryMatched = false;
          const properties = ['email', 'name'];

          properties.forEach((property) => {
            if ((customer[property]).toLowerCase().includes(filters.query.toLowerCase())) {
              queryMatched = true;
            }
          });

          if (!queryMatched) {
            return false;
          }
        }

        if (typeof filters.hasAcceptedMarketing !== 'undefined') {
          if (customer.hasAcceptedMarketing !== filters.hasAcceptedMarketing) {
            return false;
          }
        }

        if (typeof filters.isProspect !== 'undefined') {
          if (customer.isProspect !== filters.isProspect) {
            return false;
          }
        }

        if (typeof filters.isReturning !== 'undefined') {
          if (customer.isReturning !== filters.isReturning) {
            return false;
          }
        }

        return true;
      });
      count = data.length;
    }

    if (typeof sortBy !== 'undefined' && typeof sortDir !== 'undefined') {
      data = applySort(data, sortBy, sortDir);
    }

    if (typeof page !== 'undefined' && typeof rowsPerPage !== 'undefined') {
      data = applyPagination(data, page, rowsPerPage);
    }

    return Promise.resolve({
      data,
      count
    });
  }

  async getCustomer(request) {
    let data = await axiosClient.get(`/api/admin/customers/${request.customerId}`)
        .then(res => {
          return res.data;
        })
        .catch(err => {
          toast.error("Couldn't fetch client!");
          console.log("Client Fetch error:", err)

        })
    if (data) {
      return Promise.resolve(data);
    } else {
      return Promise.reject("Can't fetch client")
    }
  }

  async createCustomer(request) {
    let data = await axiosClient.post(`/api/admin/customers/`, request.data)
        .then(res => {
          return res.data;
        })
        .catch(err => {
          toast.error("Couldn't create client!");
          console.log("Client Creation error:", err)

        })
    if (data) {
      return Promise.resolve(data);
    } else {
      return Promise.reject("Can't create client")
    }
  }

  getEmails(request) {
    return Promise.resolve(deepCopy(emails));
  }

  async getInvoices(request) {
    let data = await axiosClient.get(`/api/admin/customers/${request.customerId}/invoices`)
        .then(res => {
          return res.data;
        })
        .catch(err => {
          toast.error("Couldn't fetch invoices!");
          console.log("Invoices Fetch error:", err)

        })
    if (data) {
      return Promise.resolve(data);
    } else {
      return Promise.reject("Can't fetch invoices")
    }
  }
}

export const customersApi = new CustomersApi();
