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
import { Trash } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

function VariantDeleteBtn({
  id,
  setVariantOptions,
}: {
  id: number;
  setVariantOptions: React.Dispatch<any>;
}) {
  const { toast } = useToast();

  const handleDelete = async () => {
    const res = await fetch(`/api/variants?id=${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      setVariantOptions((prev: any) => {
        return prev.filter((v: any) => v.id !== id);
      });
      toast({
        title: "Deleted successfully",
      });
    }
  };
  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Trash className=" cursor-pointer text-red-500" size={18} />
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure to delete?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone.
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
    </div>
  );
}

export default VariantDeleteBtn;
