"use client";
import Stepper from "@/components/common/Stepper";
import AddressList from "@/components/view/addressList";
import { useGetAddress } from "@/hooks/queries/use-address";
import React, { useState } from "react";

const CheckoutPage = () => {
  const { data: addressList, isLoading } = useGetAddress();
  const [addnNewAddressForm, setAddNewAddressForm] = useState(false);

  const handleNewAddress = () => {
    setAddNewAddressForm(true);
  };

  const steps = [
    {
      title: "Shipping Address",
      content: (
        <div className="space-y-4">
          <AddressList
            addnNewAddressForm={addnNewAddressForm}
            handleNewAddress={handleNewAddress}
            addresses={addressList?.addresses}
            handleBackFromNewAddress={() => setAddNewAddressForm(false)}
          />
        </div>
      ),
    },
    {
      title: "Payment Information",
      content: <div className="space-y-4">Hii</div>,
    },
  ];

  return (
    <div className="p-6 container mx-auto">
      {/* <AddressList
        addnNewAddressForm={addnNewAddressForm}
        handleNewAddress={handleNewAddress}
        addresses={addressList?.addresses}
      /> */}
      <Stepper steps={steps} />
    </div>
  );
};

export default CheckoutPage;
