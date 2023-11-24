import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Pen } from "lucide-react";
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
import { Checkbox } from "@/components/ui/checkbox";
import AddressSelection from "./address-selection";

export default function ShippingAddress({
  withTitle,
  edit,
}: {
  withTitle: boolean;
  edit: boolean;
}) {
  return (
    <span className="inline-flex flex-col w-full py-3  text-base">
      <span className="inline-flex justify-between items-center">
        {withTitle && <p className="w-1/3 font-semibold">Shipping address</p>}
        {withTitle && edit && (
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant={"ghost"}
                className={cn(" text-base flex gap-4 items-center ")}>
                <Pen size="20px" /> <p>Edit</p>
              </Button>
            </DialogTrigger>
            <DialogContent className={cn("w-[50%] shadow-xl")}>
              <AddressSelection />
            </DialogContent>
          </Dialog>
        )}
      </span>
      <span className="inline-flex w-full p-4 text-sm ">
        <p className="w-1/3 text-muted-foreground">Receiver Name :</p>
        <p className="grow ">Phyo Pyae</p>
      </span>
      <span className="inline-flex w-full p-4 text-sm">
        <p className="w-1/3 text-muted-foreground">Address Type:</p>
        <p className="grow ">Private</p>
      </span>
      <span className="inline-flex w-full p-4 text-sm">
        <p className="w-1/3 text-muted-foreground">Phone no.:</p>
        <p className="grow ">0124214333</p>
      </span>
      <span className="inline-flex w-full p-4 text-sm">
        <p className="w-1/3 text-muted-foreground">Address:</p>
        <p className="grow ">
          Apt B207 , Bang Talat Khlong Khuean Chachoengsao 92626
        </p>
      </span>
    </span>
  );
}
