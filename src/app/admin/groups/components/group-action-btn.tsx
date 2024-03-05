"use client";
import { assginUsersToGroup, deleteGroup } from "@/app/actions/group";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/components/ui/use-toast";

import { Cog, MoreHorizontal, Trash, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";
import { useEffect, useState } from "react";
import { Group } from "@prisma/client";

export function GroupActionButton({
  groupId,
  users,
}: {
  groupId: string;
  users: any;
}) {
  const [assignedUser, setAssignedUser] = useState<string[]>(
    users
      .filter((user: any) => {
        return user.groups.some((group: Group) => group.id === groupId);
      })
      .map((user: any) => user.id),
  );

  const checkedHandler = (checked: boolean, userId: string) =>
    setAssignedUser((prev) => {
      setChanged(true);
      if (checked) {
        return [...prev, userId];
      }
      return prev.filter((id) => id !== userId);
    });
  const { toast } = useToast();

  const assignHandler = async () => {
    try {
      await assginUsersToGroup(groupId, assignedUser);
      setChanged(false);
    } catch (error: any) {
      toast({
        title: "Oh! Failed to assign users to group",
        description: error.message,
      });
    }
  };

  const handleDelete = async () => {
    try {
      await deleteGroup(groupId);
      toast({
        title: "Group deleted",
        description: "Group has been deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete group",
      });
    }
  };
  const [changed, setChanged] = useState(false);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm">
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px]">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link
              className="flex cursor-pointer items-center"
              href={"/admin/groups/editGroup?gpId=" + groupId}
            >
              <Cog className="mr-2 h-4 w-4" />
              Configuration...
            </Link>
          </DropdownMenuItem>

          <DropdownMenuSeparator />
          <DropdownMenuSub
            onOpenChange={(open: boolean) => {
              if (!open && changed) {
                assignHandler();
              }
            }}
          >
            <DropdownMenuSubTrigger>
              <User className="mr-2 h-4 w-4" />
              Assign to...
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent className="p-0">
              <Command>
                <CommandInput
                  placeholder="Search for a user"
                  autoFocus={true}
                />
                <CommandList>
                  <CommandEmpty>No User found.</CommandEmpty>
                  <CommandGroup>
                    {users.map((user: any) => (
                      <CommandItem
                        className="flex items-center gap-4"
                        key={user.id}
                        value={user.name}
                      >
                        <Checkbox
                          checked={assignedUser.includes(user.id)}
                          onCheckedChange={(val: boolean) =>
                            checkedHandler(val, user.id)
                          }
                          className=" border-slate-400"
                          key={user.id}
                        />
                        {user.name}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <AlertDialog>
              <AlertDialogTrigger
                className={
                  "relative flex w-full cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm text-red-600 outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                }
              >
                <Trash className="mr-2 h-4 w-4" />
                Delete
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    this group, which could potentially affect group members.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDelete}>
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
