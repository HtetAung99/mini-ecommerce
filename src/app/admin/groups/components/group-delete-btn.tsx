"use client";
import { deleteGroup } from "@/app/actions/group";
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

export function GroupDeleteButton({ groupId }: { groupId: string }) {
  const { toast } = useToast();
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
            group, which could potentially affect group members.
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
