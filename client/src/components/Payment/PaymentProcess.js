import {
  Customer,
  CurrencyType,
  PayhereCheckout,
  CheckoutParams,
} from "payhere-js-sdk";
import swal from "sweetalert";

function onPayhereCheckoutError(errorMsg) {
  alert(errorMsg);
}

export function PaymentProcess(data) {
  const {
    first_name,
    last_name,
    email,
    address,
    phone,
    city,
    itemTitle,
    amount,
  } = data;

  if (isNaN(amount)) return swal("Please enter a valid amount.");
  else if (amount < 100) return swal("Amount must be greater than Rs 100.00.");

  const customer = new Customer({
    first_name,
    last_name,
    phone,
    email,
    address,
    city,
    country: "SRI LANKA",
  });

  const checkoutData = new CheckoutParams({
    returnUrl: "http://localhost:3000/",
    cancelUrl: "http://localhost:3000/",
    notifyUrl: "http://localhost:5000/public/payment/notify",
    order_id: "112233",
    itemTitle,
    currency: CurrencyType.LKR,
    amount,
  });

  const checkout = new PayhereCheckout(
    customer,
    checkoutData,
    onPayhereCheckoutError
  );
  checkout.start();
}
