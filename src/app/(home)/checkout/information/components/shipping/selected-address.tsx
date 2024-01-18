"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import { useSession } from "next-auth/react";
import AddressModal from "../addressModal/address-modal";

export default function SelectedAddress() {
  const session = useSession();

  const selectedAddress = session.data?.user.selectedAddress;
  return (
    <div className="mb-5 w-full">
      {selectedAddress ? (
        <div className=" p-2 pb-4">
          <span className="inline-flex w-full p-4 text-sm ">
            <p className="w-1/3 text-muted-foreground">Receiver Name :</p>
            <p className="grow ">{selectedAddress?.name}</p>
          </span>
          <span className="inline-flex w-full p-4 text-sm">
            <p className="w-1/3 text-muted-foreground">Address Type:</p>
            <p className="grow ">{selectedAddress?.type}</p>
          </span>
          <span className="inline-flex w-full p-4 text-sm">
            <p className="w-1/3 text-muted-foreground">Phone no.:</p>
            <p className="grow ">{selectedAddress?.phoneNumber}</p>
          </span>
          <span className="inline-flex w-full p-4 text-sm">
            <p className="w-1/3 text-muted-foreground">Address:</p>
            <p className="grow ">
              {`${selectedAddress?.address}, ${selectedAddress?.city}, ${selectedAddress?.state}, ${selectedAddress?.postalCode}, ${selectedAddress?.country}`}
            </p>
          </span>
        </div>
      ) : (
        <div className="flex h-[150px] w-full items-center justify-center rounded-lg border border-dashed border-slate-800 bg-white ">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="m-auto" variant={"secondary"}>
                <Plus className="mr-2" size="20px" />
                Add new address
              </Button>
            </DialogTrigger>
            <DialogContent
              className={cn(
                "top-[50%] max-h-[800px] w-[50%] overflow-auto shadow-xl",
              )}
            >
              <AddressModal title="My Shipping address" />
            </DialogContent>
          </Dialog>
        </div>
      )}
    </div>
  );
}
