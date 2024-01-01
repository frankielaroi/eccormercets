import axios from 'axios';
import { useEffect, useState } from 'react';

export default function Checkout() {
     const [paymentData, setPaymentData] = useState({
    amount: 0,
    phoneNumber: '',
  });
    const handleCheckout = async () => {
    try {
      // Call your backend to initiate the payment
      const response = await axios.post('/api/initiate-payment', paymentData);

      // Check the result and proceed accordingly
      if (response.data.success) {
        // Redirect to the payment URL received from the backend
        window.location.href = response.data.paymentUrl;
      } else {
        console.log('Payment initiation failed. Please try again.');
      }
    } catch (error) {
      console.error('Error initiating payment:', error);
    }
    };
     const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setPaymentData((prevData) => ({ ...prevData, [name]: value }));
  };

    return <>
      <div>
        <h2>Checkout</h2>
        <form>
          <label htmlFor="amount">Amount:</label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={paymentData.amount}
            onChange={handleInputChange}
            required
          />

          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={paymentData.phoneNumber}
            onChange={handleInputChange}
            required
          />

          <button type="button" onClick={handleCheckout}>
            Pay with MTN MoMo
          </button>
        </form>
      </div>
    </>
}