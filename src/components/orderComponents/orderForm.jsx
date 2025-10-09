import { useState } from "react";
import OrderFormItem from "./orderFormItem";
import FormField from "./FormField";
import { OrderContext } from "../../contexts/orderContext";
import { useContext } from "react";

export default function OrderForm() {
  const {groomName, setGroomName, brideName, setBrideName} = useContext(OrderContext);
  
  return (
    <div className="w-full h-screen p-8 pt-0">
      <div className="w-full h-full bg-primary rounded-xl p-4 px-8 grid grid-rows-[auto_1fr] gap-4 min-h-0">
        {/* header */}
        <div className="w-full p-4 pb-0 flex justify-center items-center text-neutral">
          <h1 className="font-great-vibes text-4xl">Order Form</h1>
        </div>

        {/* order form items */}
        <div className="w-full h-full overflow-auto min-h-0">
          <OrderFormItem label="Groom & Bride's Information">
            <div className="w-full h-full flex flex-col gap-4">
              {/* Form fields go here */}

              <div className="w-full">
                <FormField
                  label={`Groom's Name:`}
                  value={groomName}
                  setvalue={setGroomName}
                  type="text"
                />
                <FormField
                  label={`Bride's Name:`}
                  value={brideName}
                  setvalue={setBrideName}
                  type="text"
                />
              </div>
            </div>
          </OrderFormItem>
        </div>
      </div>
    </div>
  );
}
