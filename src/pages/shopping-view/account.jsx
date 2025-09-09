import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import User from "@/components/shopping-view/user";
import ShoppingOrders from "@/components/shopping-view/orders";
import { Button } from "@/components/ui/button";

function ShoppingAccount() {

  return (
    <div className="flex flex-col">
      <div className="container mx-auto grid grid-cols-1 gap-8 py-8">
        <div className="flex flex-col bg-background shadow-sm">
          <Tabs defaultValue="user">
            <TabsList>
              <TabsTrigger value="user">User</TabsTrigger>
              <TabsTrigger value="orders">Orders</TabsTrigger>
            </TabsList>
            <TabsContent value="orders">
              <ShoppingOrders />
            </TabsContent>
            <TabsContent value="user">
              <User />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default ShoppingAccount;
