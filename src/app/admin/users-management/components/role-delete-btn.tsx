"use client";
import { deleteRole } from "@/app/actions/role";
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

import { X } from "lucide-react";

export function RoleDeleteBtn({ roleId }: { roleId: string }) {
  const { toast } = useToast();
  const handleDelete = async () => {
    try {
      await deleteRole(roleId);
      toast({
        title: "Role deleted",
        description: "The role has been successfully deleted",
      });
    } catch (e: any) {
      toast({
        title: "Failed to delete role",
        description: e.message,
      });
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <X className="text-red-500" size={"20px"} />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this
            role, which could potentially affect assigned users.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
