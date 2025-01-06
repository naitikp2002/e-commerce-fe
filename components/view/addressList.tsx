import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import CreateAddress from "./createAddress";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedAddress, setSelectedAddressDetails } from "@/store/features/cartSlice";
import { RootState } from "@/store/store";

interface Address {
  id: string;
  name: string;
  email: string;
  mobile: string;
  street_address: string;
  city: string;
  zip_code: string;
  country: string;
}

interface AddressListProps {
  addresses: Address[];
  handleNewAddress: () => void;
  handleBackFromNewAddress: () => void;
  addnNewAddressForm: boolean;
}

export default function AddressList({
  addresses,
  handleNewAddress,
  handleBackFromNewAddress,
  addnNewAddressForm,
}: AddressListProps) {
  const selectedAddress = useSelector(
    (state: RootState) => state.cart.selectedAddress
  );
  const dispatch = useDispatch();

  const findAddressById = (id: string): Address | undefined => {
    return addresses.find(address => address.id === id);
  };

  if (addresses?.length === 0 && !addnNewAddressForm) {
    return (
      <div className="flex flex-col gap-4">
        <h3 className="flex justify-center text-xl font-semibold">
          No address Found
        </h3>
        <div className="flex justify-center">
          <Button onClick={handleNewAddress} variant="outline">
            Add Shipping Address
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {addnNewAddressForm ? (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Add a New Shipping Address</h3>
          <CreateAddress handleBackFromNewAddress={handleBackFromNewAddress} />
        </div>
      ) : (
        <>
          <h3 className="text-lg font-semibold">Select an existing address</h3>
          <RadioGroup
            defaultValue={selectedAddress?.toString()!}
            // value={selectedAddress?.toString()!}       
            onValueChange={(id) => {
              dispatch(setSelectedAddress(id));
              const selectedAddressDetails = findAddressById(id); 
              dispatch(setSelectedAddressDetails(selectedAddressDetails));

            }}
          >
            {addresses?.map((address) => (
              <div
                key={address.id}
                className="flex items-center space-x-2 border p-3 rounded-md"
              >
                <RadioGroupItem value={address.id} id={address.id} />
                <Label
                  htmlFor={address.id}
                  className="flex-grow cursor-pointer"
                >
                  <p>{address.name}</p>
                  <p className="pt-1 text-sm text-muted-foreground">
                    {address.street_address}, {address.city}, {address.zip_code}
                    , {address.country}
                  </p>
                </Label>
              </div>
            ))}
          </RadioGroup>
          <div className="flex justify-between">
            <Button onClick={handleNewAddress} variant="outline">
              Add New Address
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
