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
import ShippingAddress from "../shipping/selected-address";
import { Badge } from "@/components/ui/badge";
import AddressLists from "./address-list";

export default function AddressSelection({
  setSelection,
  title,
}: {
  setSelection: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
}) {
  return (
    <>
      <DialogHeader>
        <DialogTitle className="inline-flex items-center justify-between">
          <p>{title}</p>
          <DialogClose asChild>
            <Button variant="ghost">
              <X size={"20px"} />
            </Button>
          </DialogClose>
        </DialogTitle>
        <Button
          onClick={() => setSelection(false)}
          variant={"link"}
          className="inline-flex justify-start gap-2 text-destructive"
        >
          <Plus size="14px" />
          <p>Add new address</p>
        </Button>
        <AddressLists />
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
