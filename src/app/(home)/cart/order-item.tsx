import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Minus, Plus, Trash2Icon } from "lucide-react";
import React from "react";

export default function OrderItem() {
  return (
    <div className="flex items-center  border-b border-slate-200 py-4">
      <Avatar className="h-9 w-9">
        <AvatarImage src="/images/Dummy.jpeg" alt="Avatar" />
        <AvatarFallback>OM</AvatarFallback>
      </Avatar>
      <div className="ml-4 space-y-1">
        <p className="text-sm font-medium leading-none">Iphone 15 Pro</p>
        <p className="text-sm text-muted-foreground">space-gray / 256 gb </p>
      </div>
      <div className="ml-auto space-y-1">
        <p className="text-sm font-medium leading-none">$1,999.00</p>
        <p className="text-xs  mt-1 text-destructive">save $100</p>
      </div>
      <div className="ml-auto font-medium">
        <Button variant={"ghost"}>
          <Minus size={"12px"} />
        </Button>

        <input
          type="text"
          defaultValue={3}
          className={cn(
            "w-14 border rounded-sm p-2 h-8 m-auto text-sm text-center"
          )}
        />
        <Button variant={"ghost"}>
          <Plus size={"12px"} />
        </Button>
      </div>
      <Button variant={"ghost"}>
        <Trash2Icon size={"18px"} />
      </Button>
    </div>
  );
}
