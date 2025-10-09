import OrderFormItem from "../orderFormItem";
import FormField from "../FormField";
import { OrderContext } from "../../../contexts/orderContext";
import { useContext } from "react";

export default function WeddingGift() {
  const { 
    weddingGiftBankNumber,
    setWeddingGiftBankNumber,
    weddingGiftRecipient,
    setWeddingGiftRecipient
  } = useContext(OrderContext);

  return (
    <OrderFormItem label="Wedding Gift Information">
      <div className="w-full space-y-6">
        
        {/* Bank Account Information */}
        <FormField
          label="Bank Account Number:"
          value={weddingGiftBankNumber}
          setvalue={setWeddingGiftBankNumber}
          type="text"
        />

        <FormField
          label="Account Holder Name:"
          value={weddingGiftRecipient}
          setvalue={setWeddingGiftRecipient}
          type="text"
        />

        {/* Information Note */}
        <div className="w-full bg-yellow-50 border border-yellow-200 rounded-md p-4">
          <h4 className="text-sm font-medium text-yellow-800 mb-2">Wedding Gift Information:</h4>
          <ul className="text-sm text-yellow-700 space-y-1">
            <li>• This information will be displayed on your wedding invitation</li>
            <li>• Guests can use this to send monetary gifts if they choose</li>
            <li>• Make sure the account number and name are accurate</li>
            <li>• You can leave these fields empty if you prefer not to include gift information</li>
          </ul>
        </div>

        {/* Preview Section */}
        {(weddingGiftBankNumber || weddingGiftRecipient) && (
          <div className="w-full bg-gray-50 border border-gray-200 rounded-md p-4">
            <h4 className="text-sm font-medium text-gray-800 mb-2">Preview:</h4>
            <div className="text-sm text-gray-700 space-y-1">
              {weddingGiftRecipient && (
                <div><strong>Account Holder:</strong> {weddingGiftRecipient}</div>
              )}
              {weddingGiftBankNumber && (
                <div><strong>Account Number:</strong> {weddingGiftBankNumber}</div>
              )}
            </div>
          </div>
        )}

      </div>
    </OrderFormItem>
  );
}