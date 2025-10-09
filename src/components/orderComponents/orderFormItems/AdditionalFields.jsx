import OrderFormItem from "../orderFormItem";
import FormField from "../FormField";
import { OrderContext } from "../../../contexts/orderContext";
import { useContext } from "react";

export default function AdditionalFields() {
  const { 
    livestreamLink,
    setLivestreamLink,
    couplesNotes,
    setCouplesNotes
  } = useContext(OrderContext);

  return (
    <OrderFormItem label="Additional Information">
      <div className="w-full space-y-6">
        
        {/* Livestream Link */}
        <FormField
          label="Livestream Link:"
          value={livestreamLink}
          setvalue={setLivestreamLink}
          type="text"
        />

        {/* Couple's Notes */}
        <div className="w-full px-4">
          <div className="w-full grid grid-cols-1 md:grid-cols-2 items-start gap-2 md:gap-4">
            <div className="w-full">
              <span className="text-neutral w-full font-medium">Couple's Notes:</span>
            </div>
            <div className="w-full">
              <textarea
                value={couplesNotes}
                onChange={(e) => setCouplesNotes(e.target.value)}
                className="input input-neutral w-full min-h-[120px] resize-y"
                placeholder="Share any special message, requests, or additional information for your guests..."
              />
            </div>
          </div>
        </div>

        {/* Information Guide */}
        <div className="w-full bg-blue-50 border border-blue-200 rounded-md p-4">
          <h4 className="text-sm font-medium text-blue-800 mb-2">Field Information:</h4>
          <div className="text-sm text-blue-700 space-y-2">
            <div>
              <strong>Livestream Link:</strong> If you're hosting a virtual ceremony or want to share a live stream with distant relatives, add the link here (YouTube, Zoom, etc.)
            </div>
            <div>
              <strong>Couple's Notes:</strong> A personal message from you both to your guests. This could include:
              <ul className="list-disc list-inside mt-1 ml-4 space-y-1">
                <li>Special requests (dress code, dietary restrictions)</li>
                <li>Transportation or parking information</li>
                <li>Contact person for questions</li>
                <li>Thank you message</li>
                <li>Any other important details</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Preview Section */}
        {(livestreamLink || couplesNotes) && (
          <div className="w-full bg-gray-50 border border-gray-200 rounded-md p-4">
            <h4 className="text-sm font-medium text-gray-800 mb-2">Preview:</h4>
            <div className="text-sm text-gray-700 space-y-2">
              {livestreamLink && (
                <div>
                  <strong>Livestream:</strong> 
                  <a 
                    href={livestreamLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 ml-1 underline"
                  >
                    {livestreamLink}
                  </a>
                </div>
              )}
              {couplesNotes && (
                <div>
                  <strong>Message from the Couple:</strong>
                  <div className="mt-1 italic">{couplesNotes}</div>
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    </OrderFormItem>
  );
}