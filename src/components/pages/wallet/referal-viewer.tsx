"use client";

import Spinner from "@/components/svgs/Spinner";
import { getReferalById } from "@/http/api";
import { useQuery } from "@tanstack/react-query";

interface ReferalProps {
  id: string;
}

export default ({ id }: ReferalProps) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["get-referal"],
    queryFn: () => getReferalById(id),
    refetchOnReconnect: true,
  });

  if (isLoading) {
    return (
      <div className="w-full flex items-center justify-center">
        <Spinner size={17} color="red" />
      </div>
    );
  }

  return (
    <div className="w-full p-2 space-y-2">
      <div className="w-full flex flex-col border-b border-gray-200 py-2">
        <h4 className="font-semibold text-2xl">Referal Details</h4>
      </div>
      <div className="w-full grid md:grid-cols-2 gap-3">
        <div className="flex flex-col space-y-2">
          <h5 className="font-semibold">Transaction Details</h5>
          <ul className="w-full overflow-x-hidden space-y-1">
            {data.paymentType === "incoming" ? (
              <>
                {" "}
                <li className="w-full space-x-1">
                  <span>First Name:</span>
                  <span className="font-semibold">{data?.user?.firstName}</span>
                </li>
                <li className="w-full space-x-1">
                  <span>Last Name:</span>
                  <span className="font-semibold">{data?.user?.lastName}</span>
                </li>
              </>
            ) : null}
            <li className="w-full space-x-1">
              <span>Transaction Type:</span>
              <span className="font-semibold">{data.paymentType}</span>
            </li>
            <li className="w-full space-x-1">
              <span>
                {data.paymentType === "incoming"
                  ? "Amount Received"
                  : "Amount Withdrawn"}
                :
              </span>
              <span className="font-semibold">₦{data.amount}</span>
            </li>
            <li className="w-full space-x-1">
              <span>Date Recieved:</span>
              <span className="font-semibold">
                {new Date(data.updatedAt).toDateString()}
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
