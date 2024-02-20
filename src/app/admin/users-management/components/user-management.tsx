import UserFilter from "./user-filter";
import UserTable from "./user-table";
import { TabsContent } from "@/components/ui/tabs";

export default function UserManagement() {
  return (
    <TabsContent value="users">
      <UserFilter />
      <UserTable />
    </TabsContent>
  );
}
