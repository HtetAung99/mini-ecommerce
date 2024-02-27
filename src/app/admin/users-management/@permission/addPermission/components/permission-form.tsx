"use client";
import { addPermission } from "@/app/actions/permission";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { Action, Entity } from "@prisma/client";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

export type PermissionAddFormValue = {
  name: string;
  entityId: string;
  action: Action[];
};

export default function PremissionFrom({ entities }: { entities: Entity[] }) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<PermissionAddFormValue>();

  const { toast } = useToast();
  const [actions, setActions] = useState<Action[]>([Action.READ]);

  const handleSwitch = (action: Action, checked: boolean) =>
    checked
      ? setActions([...actions, action])
      : setActions(actions.filter((act) => act !== action));

  const onSubmit = handleSubmit(async (data: PermissionAddFormValue, e) => {
    data.action = actions;

    try {
      await addPermission(data);
      toast({
        title: "Permission Created",
        description: "Permission has been created successfully",
      });
    } catch (e) {
      toast({
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    }
    router.back();
  });
  return (
    <Card className="m-auto max-h-fit  w-[30vw]">
      <CardHeader>
        <CardTitle className="mb-3 flex items-center justify-between py-2">
          <span>New Permission</span>
          <X
            className="cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              router.back();
            }}
            size="18px"
          />
        </CardTitle>
        <CardContent>
          <form className="my-5 flex flex-col gap-5">
            <div className="grid grid-cols-3">
              <Label
                className="col-span-1 text-left text-sm font-semibold leading-10 tracking-wider text-slate-500"
                htmlFor="name"
              >
                Name:
              </Label>
              <Input
                {...register("name", {
                  required: "Name is required",
                  maxLength: {
                    value: 30,
                    message: "Name should be less than 30 characters",
                  },
                })}
                className="col-span-2"
                id="name"
              />
              {errors?.name && (
                <p className="col-span-3 my-2 w-full pl-[34%]   text-left text-sm italic text-red-600">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div className="grid grid-cols-3">
              <Label
                className="col-span-1 text-left text-sm font-semibold leading-10 tracking-wider text-slate-500"
                htmlFor="entity"
              >
                Entity:
              </Label>
              <Select
                {...register("entityId", {
                  required: "You must select one entity!",
                })}
                onValueChange={(value) => {
                  setValue("entityId", value);
                }}
              >
                <SelectTrigger className="col-span-2" id="entity">
                  <SelectValue defaultValue={""} placeholder="Select Entity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel key={"tables"}>Tables</SelectLabel>
                    {entities
                      .sort((a, b) => a.name.localeCompare(b.name))
                      .map((entity) => (
                        <SelectItem key={entity.id} value={entity.id}>
                          {entity.name}
                        </SelectItem>
                      ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {errors?.entityId && (
                <p className="col-span-3 my-2 w-full  pl-[34%] text-left text-sm italic text-red-600">
                  {errors.entityId.message}
                </p>
              )}
            </div>
            <div
              {...register("action", {
                validate: () => actions.length > 0 || "Select at least one",
              })}
            >
              <div className="my-3 flex flex-row justify-between">
                {Object.values(Action).map((action) => (
                  <div
                    key={action}
                    className="flex flex-col items-center gap-4 "
                  >
                    <Label className="capitalize" htmlFor={action}>
                      {action.toLowerCase()}
                    </Label>
                    <Switch
                      checked={actions.includes(action)}
                      onCheckedChange={(checked) =>
                        handleSwitch(action, checked)
                      }
                      id={action}
                    />
                  </div>
                ))}
              </div>
              {errors?.action && (
                <p className="col-span-3 my-2 w-full  text-left text-sm italic text-red-600">
                  {errors.action.message}
                </p>
              )}
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button onClick={onSubmit} className="ml-auto" variant={"default"}>
            Add Permission
          </Button>
        </CardFooter>
      </CardHeader>
    </Card>
  );
}
