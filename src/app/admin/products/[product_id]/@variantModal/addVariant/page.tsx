import { Modal } from "@/app/components/modal";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function AddVariantPage() {
  return (
    <Modal>
      <Card className="w-2/3">
        <CardHeader>
          <CardTitle>Add New Variant</CardTitle>
        </CardHeader>
        <CardContent>
          <form action="">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  className="w-full rounded-md border border-slate-200 p-4"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="price">Price</label>
                <input
                  type="number"
                  id="price"
                  className="w-full rounded-md border border-slate-200 p-4"
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex items-center justify-between ">
          <Button className="w-1/4" variant={"secondary"}>
            Cancel
          </Button>
          <Button className="w-1/4" variant={"default"}>
            Create
          </Button>
        </CardFooter>
      </Card>
    </Modal>
  );
}
