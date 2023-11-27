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
    <span className="inline-flex flex-col w-full py-3  text-base">
      <span className="inline-flex justify-between items-center">
        {withTitle && <p className="w-1/3 font-semibold">{title}</p>}
        {withTitle && edit && (
          <Dialog>
            <DialogTrigger asChild>
              <Button
                onClick={() => console.log("edit")}
                variant={"ghost"}
                className={cn(" text-base flex gap-4 items-center ")}>
                <Pen size="20px" /> <p>Edit</p>
              </Button>
            </DialogTrigger>
            <DialogContent
              className={cn("w-[50%] top-[50%] shadow-xl h-[500px]")}>
              <AddressModal title={"My shipping address"} />
            </DialogContent>
          </Dialog>
        )}
      </span>
      <span className="inline-flex w-full mt-2 p-4 text-sm ">
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
