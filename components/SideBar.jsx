import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function SideBar({ users, groups }) {
  return (
    <Tabs defaultValue={"users"} className="flex flex-col w-full">
      <TabsList>
        <TabsTrigger value="users">Users</TabsTrigger>
        <TabsTrigger value="groups">Groups</TabsTrigger>
      </TabsList>
      <TabsContent value="users">
        <div className="flex flex-col pt-5">
          {users?.map((u) => (
            <button key={u.id} onClick={() => {}}>
              {u.name}
            </button>
          ))}
        </div>
      </TabsContent>
      <TabsContent value="groups">
        <div className="flex flex-col">
          {groups?.map((g) => (
            <button key={g.id} onClick={() => {}}>
              {g.name}
            </button>
          ))}
        </div>
      </TabsContent>
    </Tabs>
  );
}
