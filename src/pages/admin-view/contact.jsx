import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useSelector } from "react-redux";
import { Badge } from "@/components/ui/badge";
import { ensureArray, formatPrice } from "@/helper-functions/use-formater";
import Loading from "@/components/ui/loader";
import { useNavigate } from "react-router-dom";
import { useContact } from "@/hooks/useContact";

function AdminContacts() {
  const { contactList } = useSelector((state) => state.Contact);
  const { isLoading, handleGetContact } = useContact();
  const navigate = useNavigate();

  useEffect(() => {
    handleGetContact();

  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>All Contacts</CardTitle>
      </CardHeader>
      <CardContent className="w-full overflow-y-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Message</TableHead>
              <TableHead>Created</TableHead>
            </TableRow>
          </TableHeader>
            <TableBody style={{ minHeight: "400px" }}>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-20">
                    <Loading className="bg-black" />
                  </TableCell>
                </TableRow>
              ) : ensureArray(contactList)?.length > 0 ? (
                ensureArray(contactList)?.map((item) => (
                  <TableRow key={item?._id}>
                    <TableCell>{item?.name ?? ""}</TableCell>
                    <TableCell>{item?.email ?? ""}</TableCell>
                    <TableCell>{item?.subject ?? ""}</TableCell>
                    <TableCell>{item?.message ?? ""}</TableCell>
                    <TableCell>{item?.createdAt?.split("T")[0]}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-20 text-gray-500">
                    No orders found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default AdminContacts;