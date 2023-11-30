import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Pen } from "lucide-react";
import React from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import AddressModal from "../(addressModal)/address-modal";

export default function SelectedAddress({
  withTitle,
  title,
  edit,
}: {
  withTitle: boolean;
  title: string | null;
  edit: boolean;
}) {
  return (
    <span className="inline-flex w-full flex-col py-3  text-base">
      <span className="inline-flex items-center justify-between">
        {withTitle && <p className="w-1/3 font-semibold">{title}</p>}
        {withTitle && edit && (
          <Dialog>
            <DialogTrigger asChild>
              <Button
                onClick={() => console.log("edit")}
                variant={"ghost"}
                className={cn(" flex items-center gap-4 text-base ")}
              >
                <Pen size="20px" /> <p>Edit</p>
              </Button>
            </DialogTrigger>
            <DialogContent
              className={cn("top-[50%] h-[500px] w-[50%] shadow-xl")}
            >
              <AddressModal title={"My shipping address"} />
            </DialogContent>
          </Dialog>
        )}
      </span>
      <span className="mt-2 inline-flex w-full p-4 text-sm ">
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
