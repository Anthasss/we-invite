import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { createMidtransTransaction } from "../services/api";
import { createOrder, getOrderStatus } from "../services/orderApi";
import {
  prepareWeddingInfo,
  generateOrderId,
  createPaymentPayload,
  createOrderPayload,
  openSnapPayment,
  pollOrderStatus,
} from "../utils/paymentHelpers";

/**
 * Custom hook to handle order payment process
 * @param {string} productId - Product ID
 * @param {Object} orderContext - Order context
 * @param {boolean} snapLoaded - Whether Midtrans Snap is loaded
 * @returns {Object} { isProcessing, handlePayment, resumePayment, toast, clearToast }
 */
export const useOrderPayment = (productId, orderContext, snapLoaded) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [toast, setToast] = useState(null);
  const { user, isAuthenticated } = useAuth0();

  const clearToast = () => setToast(null);

  const showToast = (message, type = "info") => {
    setToast({ message, type });
  };

  /**
   * Resume payment for existing pending order
   * @param {string} orderId - Order ID to resume payment
   * @param {string} snapToken - Snap token from order data
   */
  const resumePayment = async (orderId, snapToken) => {
    if (!isAuthenticated) {
      showToast("Please log in to complete your order", "error");
      return;
    }

    if (!snapLoaded) {
      showToast("Payment system is loading. Please try again in a moment.", "warning");
      return;
    }

    if (!snapToken) {
      showToast("Payment session not found. Please create a new order.", "error");
      return;
    }

    setIsProcessing(true);

    try {
      // Open Snap payment with existing token - NO API CALL NEEDED!
      openSnapPayment(snapToken, {
        onSuccess: (result) => {
          console.log("Payment success, starting to poll order status...");
          showToast("Payment successful! Confirming your order...", "success");
          pollOrderStatus(orderId, getOrderStatus, {
            onSuccess: (order) => {
              showToast("Payment confirmed! Your order has been received.", "success");
              if (orderContext?.resetForm) orderContext.resetForm();
            },
            onFailed: (order) => {
              showToast("Payment was cancelled or failed. Please try again.", "error");
            },
            onTimeout: () => {
              showToast("Unable to confirm payment status. Please check your orders page.", "warning");
            },
          });
        },
        onPending: (result) => {
          console.log("Payment pending, starting to poll order status...");
          showToast("Payment is pending. Please complete your payment.", "warning");
          pollOrderStatus(orderId, getOrderStatus, {
            onSuccess: (order) => {
              showToast("Payment confirmed! Your order has been received.", "success");
              if (orderContext?.resetForm) orderContext.resetForm();
            },
            onFailed: (order) => {
              showToast("Payment was cancelled or failed. Please try again.", "error");
            },
            onTimeout: () => {
              showToast("Payment is still pending. Please check your orders page.", "warning");
            },
          });
        },
        onError: (result) => {
          console.error("Payment error:", result);
          showToast("Payment failed. Please try again.", "error");
        },
        onClose: () => {
          console.log("Payment popup closed, checking order status...");
          pollOrderStatus(orderId, getOrderStatus, {
            onSuccess: (order) => {
              showToast("Payment confirmed! Your order has been received.", "success");
              if (orderContext?.resetForm) orderContext.resetForm();
            },
            onFailed: (order) => {
              showToast("Payment was not completed.", "warning");
            },
            onTimeout: () => {
              showToast("Please check your orders page for payment status.", "info");
            },
          });
        },
      });
    } catch (error) {
      console.error("Error resuming payment:", error);
      showToast("Failed to resume payment. Please try again.", "error");
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePayment = async () => {
    // Validation checks
    if (!isAuthenticated) {
      showToast("Please log in to complete your order", "error");
      return;
    }

    if (!snapLoaded) {
      showToast("Payment system is loading. Please try again in a moment.", "warning");
      return;
    }

    setIsProcessing(true);

    try {
      // Step 1: Generate unique order ID
      const orderId = generateOrderId();

      // Prepare wedding info
      const weddingInfo = prepareWeddingInfo(orderContext);

      // Step 2: Create Midtrans transaction FIRST to get snapToken
      const transactionPayload = createPaymentPayload(orderId, productId, user.sub);
      const response = await createMidtransTransaction(transactionPayload);

      // Extract token from response
      const snapToken = response.transaction?.token;

      if (!snapToken) {
        throw new Error("No Snap token received from server");
      }

      // Step 3: Create order with snapToken included
      // Build FormData to support file uploads
      const formData = new FormData();
      
      // Add basic order fields (matching the curl example)
      formData.append('orderId', orderId);
      formData.append('userId', user.sub);
      formData.append('productId', productId);
      formData.append('snapToken', snapToken);
      
      // Add wedding info as JSON string
      formData.append('weddingInfo', JSON.stringify(weddingInfo));
      
      // Track if any files are added
      let hasFiles = false;
      
      // Add gallery images (up to 9 images)
      if (orderContext.gallery && Array.isArray(orderContext.gallery) && orderContext.gallery.length > 0) {
        const maxImages = Math.min(orderContext.gallery.length, 9);
        for (let i = 0; i < maxImages; i++) {
          const imageFile = orderContext.gallery[i];
          if (imageFile instanceof File) {
            formData.append('images', imageFile);
            hasFiles = true;
          }
        }
      }

      // Debug: Log FormData contents
      console.log("FormData contents:");
      for (let pair of formData.entries()) {
        console.log(pair[0] + ':', pair[1]);
      }
      console.log("Has files:", hasFiles);

      console.log("Creating order with FormData");
      await createOrder(formData);
      console.log("Order created successfully with snapToken:", orderId);

      // Step 4: Open Midtrans Snap payment popup
      openSnapPayment(snapToken, {
        onSuccess: (result) => {
          console.log("Payment success, starting to poll order status...");
          showToast("Payment successful! Confirming your order...", "success");
          // Poll for order status
          pollOrderStatus(orderId, getOrderStatus, {
            onSuccess: (order) => {
              showToast("Payment confirmed! Your order has been received.", "success");
              orderContext.resetForm();
              // You can redirect here if needed
              // window.location.href = '/success';
            },
            onFailed: (order) => {
              showToast("Payment was cancelled or failed. Please try again.", "error");
              // window.location.href = '/failed';
            },
            onTimeout: () => {
              showToast("Unable to confirm payment status. Please check your orders page.", "warning");
            },
          });
        },
        onPending: (result) => {
          console.log("Payment pending, starting to poll order status...");
          showToast("Payment is pending. Please complete your payment.", "warning");
          // Poll for order status even on pending
          pollOrderStatus(orderId, getOrderStatus, {
            onSuccess: (order) => {
              showToast("Payment confirmed! Your order has been received.", "success");
              orderContext.resetForm();
            },
            onFailed: (order) => {
              showToast("Payment was cancelled or failed. Please try again.", "error");
            },
            onTimeout: () => {
              showToast("Payment is still pending. Please check your orders page.", "warning");
            },
          });
        },
        onError: (result) => {
          console.error("Payment error:", result);
          showToast("Payment failed. Please try again.", "error");
        },
        onClose: () => {
          console.log("Payment popup closed, checking order status...");
          // Poll for order status when user closes popup
          pollOrderStatus(orderId, getOrderStatus, {
            onSuccess: (order) => {
              showToast("Payment confirmed! Your order has been received.", "success");
              orderContext.resetForm();
            },
            onFailed: (order) => {
              showToast("Payment was not completed.", "warning");
            },
            onTimeout: () => {
              showToast("Please check your orders page for payment status.", "info");
            },
          });
        },
      });
    } catch (error) {
      console.error("Error processing order:", error);
      showToast("Failed to process order. Please try again.", "error");
    } finally {
      setIsProcessing(false);
    }
  };

  return { isProcessing, handlePayment, resumePayment, toast, clearToast };
};
