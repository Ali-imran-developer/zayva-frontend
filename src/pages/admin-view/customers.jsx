import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import {  Table,  TableBody,  TableCell,  TableHead,  TableHeader,  TableRow } from "../../components/ui/table";
import { useSelector } from "react-redux";
import { ensureArray, formatPrice } from "@/helper-functions/use-formater";
import Loading from "../../components/ui/loader";
import { useCustomers } from "@/hooks/useCustomer";

function CustomerView() {
  const { customers } = useSelector((state) => state.Customer);
  const { isLoading, handleGetCustomers } = useCustomers();

  useEffect(() => {
    handleGetCustomers();

  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>All Customers</CardTitle>
      </CardHeader>
      <CardContent className="w-full overflow-y-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>City</TableHead>
              <TableHead>Total Orders</TableHead>
              <TableHead>Total Spent</TableHead>
            </TableRow>
          </TableHeader>
            <TableBody style={{ minHeight: "400px" }}>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-20">
                    <Loading className="bg-black" />
                  </TableCell>
                </TableRow>
              ) : ensureArray(customers)?.length > 0 ? (
                ensureArray(customers)?.map((item) => (
                  <TableRow key={item?._id}>
                    <TableCell>
                      <div className="flex flex-col">
                        <span>{item?.name ?? ""}</span>
                        <span>{item?.email ?? ""}</span>
                      </div>
                    </TableCell>
                    <TableCell>{item?.phone ?? ""}</TableCell>
                    <TableCell>{item?.createdAt?.split("T")[0]}</TableCell>
                    <TableCell>{item?.address ?? ""}</TableCell>
                    <TableCell>{item?.city ?? ""}</TableCell>
                    <TableCell className="text-center">{item?.totalOrders ?? 0}</TableCell>
                    <TableCell>Rs. {formatPrice(item?.totalSpent ?? 0)}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-20 text-gray-500">
                    No customers found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default CustomerView;