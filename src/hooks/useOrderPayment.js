import { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { createMidtransTransaction } from '../services/api';
import { createOrder } from '../services/orderApi';
import { prepareWeddingInfo, generateOrderId, createPaymentPayload, createOrderPayload, openSnapPayment } from '../utils/paymentHelpers';

/**
 * Custom hook to handle order payment process
 * @param {string} productId - Product ID
 * @param {Object} orderContext - Order context
 * @param {boolean} snapLoaded - Whether Midtrans Snap is loaded
 * @returns {Object} { isProcessing, handlePayment, toast, clearToast }
 */
export const useOrderPayment = (productId, orderContext, snapLoaded) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [toast, setToast] = useState(null);
  const { user, isAuthenticated } = useAuth0();

  const clearToast = () => setToast(null);

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
  };

  const handlePayment = async () => {
    // Validation checks
    if (!isAuthenticated) {
      showToast('Please log in to complete your order', 'error');
      return;
    }

    if (!snapLoaded) {
      showToast('Payment system is loading. Please try again in a moment.', 'warning');
      return;
    }

    setIsProcessing(true);

    try {
      // Generate unique order ID
      const orderId = generateOrderId();

      // Prepare wedding info
      const weddingInfo = prepareWeddingInfo(orderContext);

      // Create Midtrans transaction payload (no wedding info)
      const transactionPayload = createPaymentPayload(orderId, productId, user.sub);

      // Call backend API to create Midtrans transaction
      const response = await createMidtransTransaction(transactionPayload);

      // Extract token from response
      const snapToken = response.transaction?.token;

      if (!snapToken) {
        throw new Error('No Snap token received from server');
      }

      // Open Midtrans Snap payment popup
      openSnapPayment(snapToken, {
        onSuccess: async (result) => {
          try {
            // Payment successful - now save order to database
            const orderPayload = createOrderPayload(orderId, productId, user.sub, weddingInfo);
            await createOrder(orderPayload);
            
            showToast('Payment successful! Your order has been saved.', 'success');
            orderContext.resetForm();
          } catch (error) {
            console.error('Error saving order:', error);
            showToast(`Payment was successful, but there was an error saving your order. Please contact support with order ID: ${orderId}`, 'error');
          }
        },
        onPending: (result) => {
          showToast('Payment is pending. Please complete your payment.', 'warning');
        },
        onError: (result) => {
          showToast('Payment failed. Please try again.', 'error');
        },
        onClose: () => {
          // User closed the popup
        },
      });
    } catch (error) {
      console.error('Error processing order:', error);
      showToast('Failed to process order. Please try again.', 'error');
    } finally {
      setIsProcessing(false);
    }
  };

  return { isProcessing, handlePayment, toast, clearToast };
};
