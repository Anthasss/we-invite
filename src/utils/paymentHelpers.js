/**
 * Prepare wedding information payload from order context
 * @param {Object} orderContext - The order context containing form data
 * @returns {Object} Formatted wedding info object
 */
export const prepareWeddingInfo = (orderContext) => {
  return {
    groom: {
      fullName: orderContext.groomFullName,
      nickname: orderContext.groomNickname,
      fatherName: orderContext.groomFatherName,
      motherName: orderContext.groomMotherName,
      childNumber: orderContext.groomChildNumber,
      totalChildren: orderContext.groomTotalChildren,
    },
    bride: {
      fullName: orderContext.brideFullName,
      nickname: orderContext.brideNickname,
      fatherName: orderContext.brideFatherName,
      motherName: orderContext.brideMotherName,
      childNumber: orderContext.brideChildNumber,
      totalChildren: orderContext.brideTotalChildren,
    },
    events: orderContext.events,
    media: {
      backSound: orderContext.backSound,
      gallery: orderContext.gallery,
      invitedPeopleList: orderContext.invitedPeopleList,
    },
    additional: {
      holyVerseText: orderContext.holyVerseText,
      holyVerseSource: orderContext.holyVerseSource,
      weddingGiftBankNumber: orderContext.weddingGiftBankNumber,
      weddingGiftRecipient: orderContext.weddingGiftRecipient,
      livestreamLink: orderContext.livestreamLink,
      couplesNotes: orderContext.couplesNotes,
    },
  };
};

/**
 * Generate a unique order ID
 * @returns {string} Unique order ID
 */
export const generateOrderId = () => {
  return `ORDER-${Date.now()}`;
};

/**
 * Create payment payload for Midtrans (transaction only)
 * @param {string} orderId - Order ID
 * @param {string} productId - Product ID
 * @param {string} userId - User ID
 * @returns {Object} Payment payload
 */
export const createPaymentPayload = (orderId, productId, userId) => {
  return {
    orderId,
    productId,
    userId,
  };
};

/**
 * Create order payload for database (after successful payment)
 * @param {string} orderId - Order ID
 * @param {string} productId - Product ID
 * @param {string} userId - User ID
 * @param {Object} weddingInfo - Wedding information
 * @returns {Object} Order payload
 */
export const createOrderPayload = (orderId, productId, userId, weddingInfo) => {
  return {
    orderId,
    userId,
    productId,
    weddingInfo,
  };
};

/**
 * Open Midtrans Snap payment popup
 * @param {string} snapToken - Snap token from backend
 * @param {Function} onSuccess - Success callback
 * @param {Function} onPending - Pending callback
 * @param {Function} onError - Error callback
 * @param {Function} onClose - Close callback
 */
export const openSnapPayment = (snapToken, callbacks = {}) => {
  const {
    onSuccess = () => {},
    onPending = () => {},
    onError = () => {},
    onClose = () => {},
  } = callbacks;

  if (!window.snap) {
    throw new Error('Midtrans Snap is not loaded');
  }

  window.snap.pay(snapToken, {
    onSuccess: (result) => {
      console.log('Payment success:', result);
      onSuccess(result);
    },
    onPending: (result) => {
      console.log('Payment pending:', result);
      onPending(result);
    },
    onError: (result) => {
      console.log('Payment error:', result);
      onError(result);
    },
    onClose: () => {
      console.log('Payment popup closed');
      onClose();
    },
  });
};
