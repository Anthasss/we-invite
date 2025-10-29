import { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { createMidtransTransaction } from '../services/api';
import { createOrder, getOrderStatus } from '../services/orderApi';
import { prepareWeddingInfo, generateOrderId, createPaymentPayload, createOrderPayload, openSnapPayment, pollOrderStatus } from '../utils/paymentHelpers';

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

      // Step 1: Create order first
      const orderPayload = createOrderPayload(orderId, productId, user.sub, weddingInfo);
      await createOrder(orderPayload);
      console.log('Order created successfully:', orderId);

      // Step 2: Create Midtrans transaction
      const transactionPayload = createPaymentPayload(orderId, productId, user.sub);
      const response = await createMidtransTransaction(transactionPayload);

      // Extract token from response
      const snapToken = response.transaction?.token;

      if (!snapToken) {
        throw new Error('No Snap token received from server');
      }

      // Step 3: Open Midtrans Snap payment popup
      openSnapPayment(snapToken, {
        onSuccess: (result) => {
          console.log('Payment success, starting to poll order status...');
          showToast('Payment successful! Confirming your order...', 'success');
          // Poll for order status
          pollOrderStatus(orderId, getOrderStatus, {
            onSuccess: (order) => {
              showToast('Payment confirmed! Your order has been received.', 'success');
              orderContext.resetForm();
              // You can redirect here if needed
              // window.location.href = '/success';
            },
            onFailed: (order) => {
              showToast('Payment was cancelled or failed. Please try again.', 'error');
              // window.location.href = '/failed';
            },
            onTimeout: () => {
              showToast('Unable to confirm payment status. Please check your orders page.', 'warning');
            },
          });
        },
        onPending: (result) => {
          console.log('Payment pending, starting to poll order status...');
          showToast('Payment is pending. Please complete your payment.', 'warning');
          // Poll for order status even on pending
          pollOrderStatus(orderId, getOrderStatus, {
            onSuccess: (order) => {
              showToast('Payment confirmed! Your order has been received.', 'success');
              orderContext.resetForm();
            },
            onFailed: (order) => {
              showToast('Payment was cancelled or failed. Please try again.', 'error');
            },
            onTimeout: () => {
              showToast('Payment is still pending. Please check your orders page.', 'warning');
            },
          });
        },
        onError: (result) => {
          console.error('Payment error:', result);
          showToast('Payment failed. Please try again.', 'error');
        },
        onClose: () => {
          console.log('Payment popup closed, checking order status...');
          // Poll for order status when user closes popup
          pollOrderStatus(orderId, getOrderStatus, {
            onSuccess: (order) => {
              showToast('Payment confirmed! Your order has been received.', 'success');
              orderContext.resetForm();
            },
            onFailed: (order) => {
              showToast('Payment was not completed.', 'warning');
            },
            onTimeout: () => {
              showToast('Please check your orders page for payment status.', 'info');
            },
          });
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
