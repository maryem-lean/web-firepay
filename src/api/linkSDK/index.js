import {linkSDk} from "../../config";

class LinkSDKApi {
    connectAccount = (customerId, endUserId, callBack) => {
        window.Lean.connect({
            app_token: linkSDk.appToken,
            permissions: ["identity", "accounts", "transactions", "balance", "payments"],
            customer_id: customerId,
            end_user_id: endUserId,
            payment_destination_id: linkSDk.destinationId,
            sandbox: true,
            callback: callBack
        })
    }

    submitPayment = (paymentIntentId, endUserId, callback) => {
        window.Lean.pay({
            app_token: linkSDk.appToken,
            payment_intent_id: paymentIntentId,
            end_user_id: endUserId,
            sandbox: true,
            callback: callback,
        });
    }

    authorisePayment = (customerId, endUserId, paymentIntentIds, callback) => {
        window.Lean.authorize( {
            app_token: linkSDk.appToken,
            payment_intent_ids: paymentIntentIds,
            customer_id: customerId,
            end_user_id: endUserId,
            sandbox: true,
            callback: callback,
        });
    }
}

export const linkSDKApi = new LinkSDKApi();

