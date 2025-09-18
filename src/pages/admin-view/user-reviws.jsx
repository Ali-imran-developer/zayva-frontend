import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import {  Table,  TableBody,  TableCell,  TableHead,  TableHeader,  TableRow } from "../../components/ui/table";
import { useSelector } from "react-redux";
import { ensureArray, formatPrice } from "@/helper-functions/use-formater";
import Loading from "../../components/ui/loader";
import { useReviews } from "@/hooks/useReview";
import { Star } from "lucide-react";
import { Label } from "@/components/ui/label";

function WebReviews() {
  const { userReviews } = useSelector((state) => state.Review);
  const { isLoading, handleGetUserReviews } = useReviews();

  useEffect(() => {
    handleGetUserReviews();

  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Web Reviews</CardTitle>
      </CardHeader>
      <CardContent className="w-full overflow-y-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Created</TableHead>
              <TableHead>Username</TableHead>
              <TableHead>Message</TableHead>
              <TableHead>Reviews</TableHead>
            </TableRow>
          </TableHeader>
            <TableBody style={{ minHeight: "400px" }}>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-20">
                    <Loading className="bg-black" />
                  </TableCell>
                </TableRow>
              ) : ensureArray(userReviews)?.length > 0 ? (
                ensureArray(userReviews)?.map((item) => (
                  <TableRow key={item?._id}>
                    <TableCell>{item?.createdAt?.split("T")[0]}</TableCell>
                    <TableCell className="ms-3">{item?.name ?? ""}</TableCell>
                    <TableCell>{item?.message ?? ""}</TableCell>
                    <TableCell className="text-center flex items-center gap-2">
                      <Label className="font-semibold text-lg text-gray-800">{item?.review ?? 0}</Label>
                      <Star fill="yellow" /></TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-20 text-gray-500">
                    No reviews found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default WebReviews;