import UserFilter from "./user-filter";
import UserTable from "./user-table";
import { TabsContent } from "@/components/ui/tabs";

export default function UserManagement({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return (
    <TabsContent value="users">
      <UserFilter />
      <UserTable searchParams={searchParams} />
    </TabsContent>
  );
}
