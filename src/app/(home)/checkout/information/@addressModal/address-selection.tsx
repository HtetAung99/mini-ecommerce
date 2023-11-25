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
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import ShippingAddress from "../shipping-address";
import { Badge } from "@/components/ui/badge";

export default function AddressSelection({
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
        <Button
          onClick={() => setSelection(false)}
          variant={"link"}
          className="inline-flex justify-start text-destructive gap-2">
          <Plus size="14px" />
          <p>Add new address</p>
        </Button>
        <div className="px-5 border border-destructive rounded-md">
          <ShippingAddress withTitle={false} edit={true} />
          <Badge className="ml-3 mb-5">Default address</Badge>
        </div>
      </DialogHeader>

      <DialogFooter className="border-t border-destructive  pt-3">
        <DialogClose asChild>
          <Button variant="default" onClick={() => console.log("cancel")}>
            Use selected address
          </Button>
        </DialogClose>
      </DialogFooter>
    </>
  );
}
