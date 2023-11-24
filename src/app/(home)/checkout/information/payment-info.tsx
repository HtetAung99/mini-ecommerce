import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import { Edit } from "lucide-react";
import React from "react";

export default function PaymentInformation() {
  return (
    <Collapsible className="min-h-[30vh] bg-secondary ">
      <CollapsibleTrigger>Payment</CollapsibleTrigger>
      <CollapsibleContent>
        Yes. Free to use for personal and commercial projects. No attribution
        required.
      </CollapsibleContent>
    </Collapsible>
  );
}
