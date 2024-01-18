import { Trash2 } from "lucide-react";
import {
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useSession } from "next-auth/react";

function RemoveButton({ id }: { id: number }) {
  const { update } = useSession();

  const handleRemove = async (id: number) => {
    const res = await fetch("/api/user/address", {
      method: "DELETE",
      body: JSON.stringify({
        id,
      }),
    });
    if (res.ok) {
      update({ isDeleteCall: true, id });
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Trash2 className="absolute right-3 top-3 cursor-pointer" size={18} />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure to remove this address?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            address.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => handleRemove(id)}>
            Remove
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default RemoveButton;
