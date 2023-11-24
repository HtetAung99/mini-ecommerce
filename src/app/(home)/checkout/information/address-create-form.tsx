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
import { X } from "lucide-react";

export default function AddressCreateForm() {
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
      <DialogContent></DialogContent>
      <DialogFooter>
        <DialogClose asChild>
          <Button variant="default" onClick={() => console.log("cancel")}>
            Use selected address
          </Button>
        </DialogClose>
      </DialogFooter>
      ;
    </>
  );
}
