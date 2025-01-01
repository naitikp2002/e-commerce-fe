import React, { useEffect, useState, Dispatch, SetStateAction } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAddAddress } from "@/hooks/queries/use-address";
import { AddressForm } from "@/types/cart";

const schema = z.object({
  name: z.string().nonempty("Name is required"),
  email: z.string().email("Invalid email address"),
  mobile: z.string().nonempty("Mobile is required"),
  street_address: z.string().nonempty("Street Address is required"),
  city: z.string().nonempty("City is required"),
  zip_code: z.string().nonempty("Zip Code is required"),
  country: z.string().nonempty("Country is required"),
});

const CreateAddress = ({ handleBackFromNewAddress }: { handleBackFromNewAddress: Dispatch<SetStateAction<boolean>> }) => {
  const { mutateAsync: createNewAddress, isSuccess } = useAddAddress();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddressForm>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (isSuccess) {
        handleBackFromNewAddress(false);
    }
  }, [isSuccess]);
  const onSubmit = (data: AddressForm) => {
    // Handle form submission
    console.log(data);
    createNewAddress(data);
  };

  return (
    <div className="p-6 container mx-auto">
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <Label className="block text-sm font-medium text-gray-700">
              Name
            </Label>
            <Input
              type="text"
              {...register("name")}
              className="mt-1 block w-full"
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">
                {String(errors.name.message)}
              </p>
            )}
          </div>
          <div>
            <Label className="block text-sm font-medium text-gray-700">
              Email
            </Label>
            <Input
              type="email"
              {...register("email")}
              className="mt-1 block w-full"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {String(errors.email.message)}
              </p>
            )}
          </div>
          <div>
            <Label className="block text-sm font-medium text-gray-700">
              Mobile
            </Label>
            <Input
              type="text"
              {...register("mobile")}
              className="mt-1 block w-full"
            />
            {errors.mobile && (
              <p className="text-red-500 text-xs mt-1">
                {errors.mobile.message}
              </p>
            )}
          </div>
        </div>
        <div>
          <Label className="block text-sm font-medium text-gray-700">
            Street Address
          </Label>
          <Input
            type="text"
            {...register("street_address")}
            className="mt-1 block w-full"
          />
          {errors.street_address && (
            <p className="text-red-500 text-xs mt-1">
              {errors.street_address.message}
            </p>
          )}
          <div className="my-4 grid grid-cols-3 gap-4">
            <div>
              <Label className="block text-sm font-medium text-gray-700">
                City
              </Label>
              <Input
                type="text"
                {...register("city")}
                className="mt-1 block w-full"
              />
              {errors.city && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.city.message}
                </p>
              )}
            </div>
            <div>
              <Label className="block text-sm font-medium text-gray-700">
                Zip Code
              </Label>
              <Input
                type="text"
                {...register("zip_code")}
                className="mt-1 block w-full"
              />
              {errors.zip_code && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.zip_code.message}
                </p>
              )}
            </div>
            <div>
              <Label className="block text-sm font-medium text-gray-700">
                Country
              </Label>
              <Input
                type="text"
                {...register("country")}
                className="mt-1 block w-full"
              />
              {errors.country && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.country.message}
                </p>
              )}
            </div>
          </div>
          <Button
            type="submit"
            className="w-full bg-indigo-600 text-white my-2 py-2 px-4"
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateAddress;
