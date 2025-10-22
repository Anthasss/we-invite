import { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { createMidtransTransaction } from '../services/api';
import { prepareWeddingInfo, createPaymentPayload, openSnapPayment } from '../utils/paymentHelpers';

/**
 * Custom hook to handle order payment process
 * @param {string} productId - Product ID
 * @param {Object} orderContext - Order context
 * @param {boolean} snapLoaded - Whether Midtrans Snap is loaded
 * @returns {Object} { isProcessing, handlePayment }
 */
export const useOrderPayment = (productId, orderContext, snapLoaded) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const { user, isAuthenticated } = useAuth0();

  const handlePayment = async () => {
    // Validation checks
    if (!isAuthenticated) {
      alert('Please log in to complete your order');
      return;
    }

    if (!snapLoaded) {
      alert('Payment system is loading. Please try again in a moment.');
      return;
    }

    setIsProcessing(true);

    try {
      // Prepare wedding info and payload
      const weddingInfo = prepareWeddingInfo(orderContext);
      const payload = createPaymentPayload(productId, user.sub, weddingInfo);

      // Call backend API to create transaction
      const response = await createMidtransTransaction(payload);

      // Extract token from response
      const snapToken = response.transaction?.token;

      if (!snapToken) {
        throw new Error('No Snap token received from server');
      }

      // Open Midtrans Snap payment popup
      openSnapPayment(snapToken, {
        onSuccess: (result) => {
          alert('Payment successful!');
          orderContext.resetForm();
        },
        onPending: (result) => {
          alert('Payment is pending. Please complete your payment.');
        },
        onError: (result) => {
          alert('Payment failed. Please try again.');
        },
        onClose: () => {
          // User closed the popup
        },
      });
    } catch (error) {
      console.error('Error processing order:', error);
      alert('Failed to process order. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return { isProcessing, handlePayment };
};
