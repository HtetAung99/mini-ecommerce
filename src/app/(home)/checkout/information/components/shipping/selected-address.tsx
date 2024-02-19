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
  // }
  // "use client";
  // import { Button } from "@/components/ui/button";
  // import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
  // import { Plus } from "lucide-react";
  // import { useSession } from "next-auth/react";
  // import AddressModal from "../addressModal/address-modal";

  // export default function SelectedAddress() {
  //   const session = useSession();
  //   const selectedAddress = session.data?.user.selectedAddress;

  //   return (
  //     <div className="mb-5 w-full">
  //       {selectedAddress ? (
  //         <div className="rounded-lg bg-white p-4 shadow">
  //             <h3 className="mb-2 text-lg font-semibold">Shipping Address</h3>
  //           <div className="grid grid-cols-2 gap-4">
  //             <div>
  //                 <p className="text-sm text-muted-foreground">Receiver Name:</p>
  //               <p>{selectedAddress?.name}</p>
  //             </div>
  //             <div>
  //                 <p className="text-sm text-muted-foreground">Address Type:</p>
  //               <p>{selectedAddress?.type}</p>
  //             </div>
  //             <div>
  //                 <p className="text-sm text-muted-foreground">Phone no.:</p>
  //               <p>{selectedAddress?.phoneNumber}</p>
  //             </div>
  //             <div>
  //                 <p className="text-sm text-muted-foreground">Address:</p>
  //               <p>{`${selectedAddress?.address}, ${selectedAddress?.city}, ${selectedAddress?.state}, ${selectedAddress?.postalCode}, ${selectedAddress?.country}`}</p>
  //             </div>
  //           </div>
  //         </div>
  //       ) : (
  //         <div className="flex w-full items-center justify-center">
  //           <Dialog>
  //             <DialogTrigger asChild>
  //               <Button className="flex items-center space-x-2">
  //                 <Plus className="h-6 w-6" />
  //                 <span>Add new address</span> {" "}
  //               </Button>
  //             </DialogTrigger>
  //             <DialogContent className="max-w-md">
  //                 <AddressModal title="Add Shipping Address" />
  //             </DialogContent>
  //           </Dialog>
  //         </div>
  //       )}
  //     </div>
  //   );
}
