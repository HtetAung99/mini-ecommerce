import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import React from "react";

export default function TermsConditions() {
  return (
    <Collapsible className="">
      <div className="inline-flex gap-3 items-center">
        <Checkbox />
        <CollapsibleTrigger>
          <label className="text-sm font-medium  hover:cursor-pointer">
            Accept terms and conditions
          </label>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className="mt-3">
        <Card>
          <CardHeader>
            <CardTitle className="py-2">Terms and conditions</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="flex flex-col gap-2 text-sm ">
              <p>
                1. Acceptance of Terms By accessing or using this service, you
                agree to be bound by these terms and conditions.
              </p>
              <p>
                2. Use of the Service You agree to use the service only for
                lawful purposes and in accordance with these terms.
              </p>
              <p>
                3. Privacy Policy Your use of the service is also governed by
                our Privacy Policy, which can be found [link to privacy policy].
              </p>
              <p>
                4. Intellectual Property All content provided through the
                service is the property of [Your Company] and is protected by
                copyright and other intellectual property laws.
              </p>
              <p>
                5. Limitation of Liability We are not liable for any direct,
                indirect, incidental, consequential, or special damages arising
                out of or in any way connected with the use of the service.
              </p>
              <p>
                6. Changes to Terms We reserve the right to update or change
                these terms and conditions at any time without notice. Please
                review these terms regularly.
              </p>
            </CardDescription>
          </CardContent>
        </Card>
      </CollapsibleContent>
    </Collapsible>
  );
}
