"use client";
import { editPermissionRole } from "@/app/actions/permissionRole";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Permission, PermissionRole } from "@prisma/client";
import { ChevronDown, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export type RoleEditFormValue = {
  roleId: string;
  name: string;
  permissionIds: string[];
  descritption?: string;
};

export default function RoleEditForm({
  role,
  permissions,
}: {
  role: PermissionRole & { permissions: Permission[] };
  permissions: Permission[];
}) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<RoleEditFormValue>();
  const [checkList, setCheckList] = useState<string[]>(
    role.permissions.map((p) => p.id),
  );
  const { toast } = useToast();

  const onSubmit = handleSubmit(async (data: RoleEditFormValue, e) => {
    data.roleId = role.id;
    try {
      await editPermissionRole(data);
      toast({
        title: "Role Updated",
        description: "Role has been updated successfully",
      });
    } catch (e: any) {
      toast({
        title: "Oh! Something went wrong",
        description: e.message,
      });
    }
    router.back();
  });
  useEffect(() => {
    setValue("permissionIds", checkList);
  }, []);
  return (
    <Card className="m-auto max-h-fit w-[30vw]">
      <CardHeader>
        <CardTitle className="mb-3 flex items-center justify-between py-2">
          <span>Edit Role</span>
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
                defaultValue={role.name}
                className="col-span-2"
                id="name"
              />
              {errors?.name && (
                <p className="col-span-3 my-2 w-full pl-[34%] text-left text-sm italic text-red-600">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div className="grid grid-cols-3">
              <Label
                className="col-span-1 text-left text-sm font-semibold leading-10 tracking-wider text-slate-500"
                htmlFor="description"
              >
                Description:
              </Label>
              <Textarea
                placeholder="Type a short description here"
                className="col-span-2 max-h-40"
                id="description"
                {...register("descritption")}
                defaultValue={role.description?.toString()}
              />
            </div>
            <div className="grid grid-cols-3">
              <Label
                className="col-span-1 text-left text-sm font-semibold leading-10 tracking-wider text-slate-500"
                htmlFor="entity"
              >
                Permissions:
              </Label>
              <Popover
                {...register("permissionIds", {
                  required: "You must select one entity!",
                })}
              >
                <PopoverTrigger className="col-span-2">
                  <div className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1">
                    {checkList.length === 0 ? (
                      <span>Select Permissions</span>
                    ) : (
                      <span>
                        {checkList.length} Permission
                        {checkList.length > 1 ? "s" : ""} selected
                      </span>
                    )}
                    <ChevronDown className="h-4 w-4 opacity-50" />
                  </div>
                </PopoverTrigger>
                <PopoverContent className="flex max-h-60 flex-col gap-5  overflow-auto">
                  {permissions.map((permission) => (
                    <div
                      key={permission.id}
                      className="flex w-full flex-row items-center gap-3 rounded-sm px-2 py-2 hover:bg-slate-200 hover:font-semibold"
                    >
                      <Checkbox
                        onCheckedChange={(val) => {
                          if (val) {
                            setValue("permissionIds", [
                              ...checkList,
                              permission.id,
                            ]);
                            setCheckList((prev) => [...prev, permission.id]);
                          } else {
                            setValue(
                              "permissionIds",
                              checkList.filter((id) => id !== permission.id),
                            );
                            setCheckList((prev) =>
                              prev.filter((id) => id !== permission.id),
                            );
                          }
                        }}
                        checked={checkList.includes(permission.id)}
                        id={permission.id}
                      />
                      <Label className="cursor-pointer" htmlFor={permission.id}>
                        {permission.name}
                      </Label>
                    </div>
                  ))}
                </PopoverContent>
              </Popover>

              {errors?.permissionIds && (
                <p className="col-span-3 my-2 w-full  pl-[34%] text-left text-sm italic text-red-600">
                  {errors.permissionIds.message}
                </p>
              )}
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex w-full flex-row items-center justify-between">
          <Button onClick={onSubmit} className="ml-auto" variant={"default"}>
            Update
          </Button>
        </CardFooter>
      </CardHeader>
    </Card>
  );
}
