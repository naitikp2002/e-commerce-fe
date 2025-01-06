"use client";
import EmptyCart from "@/components/common/EmptyCart";
import Stepper from "@/components/common/Stepper";
import AddressList from "@/components/view/addressList";
import PaymentP from "@/components/view/PaymentP";
import PaymentPage from "@/components/view/PaymentPage";
import ReviewCheckout from "@/components/view/ReviewCheckout";
import { useGetAddress } from "@/hooks/queries/use-address";
import { RootState } from "@/store/store";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const CheckoutPage = () => {
  const { data: addressList, isLoading } = useGetAddress();
  const [addnNewAddressForm, setAddNewAddressForm] = useState(false);
  const TotalCartItems = useSelector(
    (state: RootState) => state?.cart?.cartItemList?.length
  );
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
      title: "Review Order",
      content: <div className="space-y-4"><ReviewCheckout/></div>,
    },
    {
      title: "Payment Information",
      content: (
        <div className="space-y-4">
          <PaymentP />
        </div>
      ),
    },
  ];

  if (TotalCartItems === 0) {
    return <EmptyCart />;
  }
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
