import AuthController from "@/controllers/authController";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog";
import { LogOutIcon, User2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const Address = () => {
  const session = AuthController.getSession();
  const user = session?.user || null;
  const { handleLogout } = useAuth();

  const handleLogoutUser = () => {
    handleLogout();
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="w-full flex items-center justify-between">
          <Label className="text-xl">Account Information</Label>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button className="cursor-pointer px-3">
                <LogOutIcon className="w-6 h-6" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure to logout?</AlertDialogTitle>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleLogoutUser}>
                  Logout
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <h1 className="font-bold text-black">Name:</h1>
            <span className="font-semibold text-gray-800">{user?.userName ?? ""}</span>
          </div>
          <div className="flex items-center gap-4">
            <h1 className="font-bold text-black">Email:</h1>
            <span className="font-semibold text-gray-800">{user?.email ?? ""}</span>
          </div>
          <div className="flex items-center gap-4">
            <h1 className="font-bold text-black">Country:</h1>
            <span className="font-semibold text-gray-800">{user?.country ?? "Pakistan"}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default Address;