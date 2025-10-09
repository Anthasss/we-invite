import OrderFormItem from "../orderFormItem";
import FormField from "../FormField";
import { OrderContext } from "../../../contexts/orderContext";
import { useContext } from "react";

export default function HolyVerseQuote() {
  const { 
    holyVerseText,
    setHolyVerseText,
    holyVerseSource,
    setHolyVerseSource
  } = useContext(OrderContext);

  return (
    <OrderFormItem label="Holy Verse / Quote">
      <div className="w-full space-y-6">
        
        {/* Holy Verse Text */}
        <div className="w-full">
          <div className="w-full grid grid-cols-2 items-start gap-4">
            <div className="w-full">
              <span className="text-neutral w-full">Verse/Quote Text:</span>
            </div>
            <div>
              <textarea
                value={holyVerseText}
                onChange={(e) => setHolyVerseText(e.target.value)}
                className="input input-neutral w-full min-h-[120px] resize-y"
                placeholder="Enter your holy verse or meaningful quote here..."
              />
            </div>
          </div>
        </div>

        {/* Source */}
        <FormField
          label="Source:"
          value={holyVerseSource}
          setvalue={setHolyVerseSource}
          type="text"
        />

        {/* Example Note */}
        <div className="w-full bg-green-50 border border-green-200 rounded-md p-4">
          <h4 className="text-sm font-medium text-green-800 mb-2">Examples:</h4>
          <div className="text-sm text-green-700 space-y-2">
            <div>
              <strong>Verse:</strong> "And among His signs is this, that He created for you mates from among yourselves, that you may dwell in tranquillity with them..."
            </div>
            <div>
              <strong>Source:</strong> Quran 30:21
            </div>
            <hr className="border-green-300 my-2" />
            <div>
              <strong>Quote:</strong> "Love is not about how many days, months, or years you have been together. It's about how much you love each other every single day."
            </div>
            <div>
              <strong>Source:</strong> Anonymous
            </div>
          </div>
        </div>

      </div>
    </OrderFormItem>
  );
}