import OrderFormItem from "../orderFormItem";
import FormField from "../FormField";
import { OrderContext } from "../../../contexts/orderContext";
import { useContext } from "react";

export default function BrideInformation() {
  const { 
    brideFullName,
    setBrideFullName,
    brideNickname,
    setBrideNickname,
    brideFatherName,
    setBrideFatherName,
    brideMotherName,
    setBrideMotherName,
    brideChildNumber,
    setBrideChildNumber,
    brideTotalChildren,
    setBrideTotalChildren
  } = useContext(OrderContext);

  return (
    <OrderFormItem label="Bride's Information">
      <FormField
        label={`Full Name:`}
        value={brideFullName}
        setvalue={setBrideFullName}
        type="text"
      />
      <FormField
        label={`Nickname:`}
        value={brideNickname}
        setvalue={setBrideNickname}
        type="text"
      />
      <FormField
        label={`Father's Name:`}
        value={brideFatherName}
        setvalue={setBrideFatherName}
        type="text"
      />
      <FormField
        label={`Mother's Name:`}
        value={brideMotherName}
        setvalue={setBrideMotherName}
        type="text"
      />
      <FormField
        label={`Child Number:`}
        value={brideChildNumber}
        setvalue={setBrideChildNumber}
        type="num"
      />
      <FormField
        label={`Total Children:`}
        value={brideTotalChildren}
        setvalue={setBrideTotalChildren}
        type="num"
      />
    </OrderFormItem>
  );
}