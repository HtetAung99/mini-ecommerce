import React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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

export default function AddressCreateForm({
  setSelection,
}: {
  setSelection: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <>
      <DialogHeader>
        <DialogTitle className="inline-flex justify-between items-center">
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
        className="inline-flex justify-start text-destructive gap-2">
        <ChevronLeft size="14px" />
        <p>Back to my address book</p>
      </Button>
      <div className="w-full overflow-y-auto">
        <Card className={cn("border-0")}>
          <CardHeader>
            <h5 className="text-base font-semibold">Contact Information</h5>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-x-4 gap-y-5 mx-2">
            <div className="grid w-full max-w-sm items-center gap-2">
              <Label htmlFor="first">First name</Label>
              <Input
                type="text"
                id="first"
                placeholder="Enter your first name"
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-2">
              <Label htmlFor="last">Last Name</Label>
              <Input type="text" id="last" placeholder="Enter your last name" />
            </div>
            <div className="grid w-full max-w-sm items-center gap-2">
              <Label htmlFor="phone">Phone number</Label>
              <Input
                type="tel"
                id="phone"
                placeholder="Enter your phone number"
              />
            </div>
          </CardContent>
        </Card>
        <Card className={cn("border-0")}>
          <CardHeader>
            <h5 className="text-base font-semibold">Address Information</h5>
          </CardHeader>
          <CardContent className="flex flex-col gap-x-4 gap-y-5 mx-2">
            <div className="grid w-full items-center gap-2">
              <Label htmlFor="address-type">Address Type</Label>
              <Select>
                <SelectTrigger id="address-type" className="w-full">
                  <SelectValue placeholder="Address type, e.g Private, Apartment" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="private">Private</SelectItem>
                  <SelectItem value="apartment">Apartment</SelectItem>
                  <SelectItem value="office">Office</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid w-full items-center gap-2">
              <Label htmlFor="address-1">Address line 1</Label>
              <Input
                type="text"
                id="address-1"
                placeholder="Address no., street name, etc."
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="grid w-full items-center gap-2">
                <Label
                  className="inline-flex gap-4 items-center"
                  htmlFor="first">
                  <p>Address line 2</p>
                  <p className="text-sm text-muted-foreground font-semibold">
                    ( Optional )
                  </p>
                </Label>

                <Input
                  type="text"
                  id="first"
                  placeholder="Apartment, suite, unit, building, floor, etc."
                />
              </div>
              <div className="grid w-full items-center gap-2">
                <Label htmlFor="zip">Zip Code</Label>
                <Input
                  type="number"
                  id="zip"
                  placeholder="Enter your zip code. (5 digits)"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="grid w-full items-center gap-2">
                <Label htmlFor="state">State</Label>
                <Select>
                  <SelectTrigger id="state" className="w-full">
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
                <Label htmlFor="Country">Country</Label>
                <Select>
                  <SelectTrigger id="Country" className="w-full">
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
            <div className="grid w-full items-center gap-2">
              <Label htmlFor="note">Special Instructions</Label>
              <Input
                type="text"
                id="note"
                placeholder="Tell us more information. e.g. Building color, landmark, etc."
              />
            </div>
          </CardContent>
        </Card>
      </div>
      <DialogFooter
        className={cn("items-center px-8 border-t border-destructive  pt-3")}>
        <div className="flex mt-2 items-center space-x-2 gap-1">
          <Checkbox id="default" />
          <label
            htmlFor="default"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Set as default address
          </label>
        </div>
        <DialogClose asChild>
          <Button variant="default" onClick={() => console.log("save")}>
            Save
          </Button>
        </DialogClose>
      </DialogFooter>
    </>
  );
}
