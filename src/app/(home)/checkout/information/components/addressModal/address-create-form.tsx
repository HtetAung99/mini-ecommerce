"use client";
import React, { use, useRef, useState } from "react";
import {
  DialogClose,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import { ChevronLeft, Plus, X } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AddressCreateForm({
  setSelection,
}: {
  setSelection: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { update } = useSession();
  const user = useSession().data?.user;
  const [type, setType] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [isDefault, setIsDefault] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const onSubmit = handleSubmit(async (data) => {
    const { first, last, ...rest } = data;
    const res = await fetch("/api/user/address", {
      method: "POST",
      body: JSON.stringify({
        ...rest,
        name: `${first} ${last}`,
        userId: user?.id,
        type,
        state,
        country,
        isDefault,
      }),
    });
    if (res.ok) {
      update();
      setSelection(true);
    }

    // addAddress({
    //   ...rest,
    //   name: `${first} ${last}`,
    //   userId: user?.id,
    //   type,
    //   state,
    //   country,
    //   isDefault,
    // })
    //   .then(() => {
    //     router.refresh();
    //   })
    //   .catch((err: any) => {
    //     console.log(err);
    //   });
  });

  return (
    <form onSubmit={onSubmit} className="w-full overflow-y-auto">
      <DialogHeader>
        <DialogTitle className="inline-flex items-center justify-between">
          <p>My Shipping Address</p>
          <DialogClose asChild>
            <Button variant="ghost">
              <X size={"20px"} />
            </Button>
          </DialogClose>
        </DialogTitle>
      </DialogHeader>
      <Button
        onClick={() => setSelection(true)}
        variant={"link"}
        className="inline-flex justify-start gap-2 text-destructive"
      >
        <ChevronLeft size="14px" />
        <p>Back to my address book</p>
      </Button>

      <Card className={cn("border-0")}>
        <CardHeader>
          <h5 className="text-base font-semibold">Contact Information</h5>
        </CardHeader>
        <CardContent className="mx-2 grid grid-cols-2 gap-x-4 gap-y-5">
          <div className="grid w-full max-w-sm items-center gap-2">
            <Label htmlFor="first">First name</Label>
            <Input
              {...register("first")}
              type="text"
              id="first"
              placeholder="Enter your first name"
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-2">
            <Label htmlFor="last">Last Name</Label>
            <Input
              {...register("last")}
              type="text"
              id="last"
              placeholder="Enter your last name"
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-2">
            <Label htmlFor="phoneNumber">Phone number</Label>
            <Input
              type="tel"
              {...register("phoneNumber")}
              id="phoneNumber"
              placeholder="Enter your phone number"
            />
          </div>
        </CardContent>
      </Card>
      <Card className={cn("border-0")}>
        <CardHeader>
          <h5 className="text-base font-semibold">Address Information</h5>
        </CardHeader>
        <CardContent className="mx-2 flex flex-col gap-x-4 gap-y-5">
          <div className="grid w-full items-center gap-2">
            <Label htmlFor="type">Address Type</Label>
            <Select onValueChange={setType}>
              <SelectTrigger {...register("type")} id="type" className="w-full">
                <SelectValue placeholder="Address type, e.g Private, Apartment" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="HOUSE">Private</SelectItem>
                <SelectItem value="APARTMENT">Apartment</SelectItem>
                <SelectItem value="CONDO">Office</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid w-full items-center gap-2">
            <Label htmlFor="address-1">Address</Label>
            <Input
              {...register("address")}
              type="text"
              id="address"
              placeholder="Address no., street name, apartment number, etc."
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="grid w-full items-center gap-2">
              <Label className="inline-flex items-center gap-4" htmlFor="city">
                <p>City</p>
                {/* <p className="text-sm font-semibold text-muted-foreground">
                    ( Optional )
                  </p> */}
              </Label>

              <Input
                {...register("city")}
                type="text"
                id="city"
                placeholder="City, town, etc."
              />
            </div>
            {/* <div className="grid grid-cols-2 gap-3">
              <div className="grid w-full items-center gap-2">
                <Label
                  className="inline-flex items-center gap-4"
                  htmlFor="first"
                >
                  <p>Address line 2</p>
                  <p className="text-sm font-semibold text-muted-foreground">
                    ( Optional )
                  </p>
                </Label>

                <Input
                  type="text"
                  id="first"
                  placeholder="Apartment, suite, unit, building, floor, etc."
                />
              </div> */}
            <div className="grid w-full items-center gap-2">
              <Label htmlFor="postalCode">Zip Code</Label>
              <Input
                {...register("postalCode")}
                type="number"
                id="postalCode"
                placeholder="Enter your zip code. (5 digits)"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="grid w-full items-center gap-2">
              <Label htmlFor="state">State</Label>
              <Select onValueChange={setState}>
                <SelectTrigger
                  {...register("state")}
                  id="state"
                  className="w-full"
                >
                  <SelectValue placeholder="Select a state" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CA">California</SelectItem>
                  <SelectItem value="NY">New York</SelectItem>
                  <SelectItem value="TX">Texas</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid w-full items-center gap-2">
              <Label htmlFor="country">Country</Label>
              <Select onValueChange={setCountry}>
                <SelectTrigger id="country" className="w-full">
                  <SelectValue placeholder="Select a country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="US">United States</SelectItem>
                  <SelectItem value="MYR">Myanmar</SelectItem>
                  <SelectItem value="SG">Singapore</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          {/* <div className="grid w-full items-center gap-2">
                <Label htmlFor="note">Special Instructions</Label>
                <Input
                  type="text"
                  id="note"
                  placeholder="Tell us more information. e.g. Building color, landmark, etc."
                />
              </div> */}
        </CardContent>
      </Card>

      <DialogFooter
        className={cn("items-center border-t border-destructive px-8  pt-3")}
      >
        <div className="mt-2 flex items-center gap-1 space-x-2">
          <Checkbox
            onClick={() => setIsDefault(!isDefault)}
            checked={isDefault}
            id="default"
          />
          <label
            htmlFor="default"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Set as default address
          </label>
        </div>

        <Button type="submit" variant="default">
          Save
        </Button>
      </DialogFooter>
    </form>
  );
}
