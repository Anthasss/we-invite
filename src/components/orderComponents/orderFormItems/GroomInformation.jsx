import OrderFormItem from "../orderFormItem";
import FormField from "../FormField";
import { OrderContext } from "../../../contexts/orderContext";
import { useContext } from "react";

export default function GroomInformation() {
  const { 
    groomFullName, 
    setGroomFullName,
    groomNickname,
    setGroomNickname,
    groomFatherName,
    setGroomFatherName,
    groomMotherName,
    setGroomMotherName,
    groomChildNumber,
    setGroomChildNumber,
    groomTotalChildren,
    setGroomTotalChildren
  } = useContext(OrderContext);

  return (
    <OrderFormItem label="Groom's Information">
      <FormField
        label={`Full Name:`}
        value={groomFullName}
        setvalue={setGroomFullName}
        type="text"
      />
      <FormField
        label={`Nickname:`}
        value={groomNickname}
        setvalue={setGroomNickname}
        type="text"
      />
      <FormField
        label={`Father's Name:`}
        value={groomFatherName}
        setvalue={setGroomFatherName}
        type="text"
      />
      <FormField
        label={`Mother's Name:`}
        value={groomMotherName}
        setvalue={setGroomMotherName}
        type="text"
      />
      <FormField
        label={`Child Number:`}
        value={groomChildNumber}
        setvalue={setGroomChildNumber}
        type="num"
      />
      <FormField
        label={`Total Children:`}
        value={groomTotalChildren}
        setvalue={setGroomTotalChildren}
        type="num"
      />
    </OrderFormItem>
  );
}