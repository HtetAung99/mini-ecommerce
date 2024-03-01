"use client";
import { deletePermission } from "@/app/actions/permission";
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

export function PermissionDeleteButton({ pid }: { pid: string }) {
  const { toast } = useToast();
  const handleDelete = async () => {
    try {
      await deletePermission(pid);
      toast({
        title: "Permission deleted",
        description: "The permission has been successfully deleted",
      });
    } catch (e: any) {
      toast({
        title: "Failed to delete permission",
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
            permission, which could potentially affect assigned roles and users.
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
