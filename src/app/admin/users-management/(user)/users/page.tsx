import { TabsContent } from "@/components/ui/tabs";
import UserFilter from "../components/user-filter";
import UserTable from "../components/user-table";

export default function UserManagementPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return (
    <TabsContent value={"users"} forceMount={true}>
      <UserFilter />
      <UserTable searchParams={searchParams} />
    </TabsContent>
  );
}
