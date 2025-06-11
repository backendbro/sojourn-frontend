"use client";

import * as React from "react";
import { ChevronDownIcon, Heart, Search } from "lucide-react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { getWishListByUserId } from "@/http/api";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import TableLoader from "@/components/ui/table-loader";
import { Skeleton } from "@/components/ui/skeleton";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { toast } from "sonner";
import SearchResultCard from "@/components/property/search-result-card";

export type WishList = {
  id: string;
  country: string;
  city: string;
  title: string;
  price: number;
  reviews: Array<{ rating: number }>;
};

export const columns: ColumnDef<WishList>[] = [
  {
    id: "select",
    header: ({ table }) => <></>,
    cell: ({ row }) => <></>,
    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          TItle
          <ChevronDownIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("title")}</div>
    ),
  },
  {
    accessorKey: "city",
    header: () => <div className="">City</div>,
    cell: ({ row }) => {
      // Format the amount as a dollar amount
      // const formatted = new Intl.NumberFormat("en-US", {
      //   style: "currency",
      //   currency: "USD",
      // }).format(amount);

      return <div className="capitalize">{row.getValue("city")}</div>;
    },
  },
  {
    accessorKey: "country",
    header: () => <div className="">Country</div>,
    cell: ({ row }) => {
      return <div className="capitalize">{row.getValue("country")}</div>;
    },
  },

  {
    accessorKey: "price",
    header: () => <div className="">Price</div>,
    cell: ({ row }) => {
      return <div className="capitalize">{row.getValue("price")}</div>;
    },
  },
];

export default () => {
  const id = useSelector((state: RootState) => state.user.me?.user?.id);

  const { data, error, isLoading } = useQuery({
    queryKey: ["user-wishlist"],
    queryFn: () => getWishListByUserId(id),
    refetchOnReconnect: true,
  });

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    rowCount: data?.length ? data.length : 0,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  if (error) {
    toast("Error getting Inspections", {
      position: "bottom-left",
    });
  }

  if (isLoading) {
    return (
      <div className="w-full mt-4">
        <Skeleton className="h-8 w-1/3 bg-gray-200 mt-2" />
        {[1, 2, 3, 4].map((_, idx: number) => (
          <TableLoader key={idx} />
        ))}
      </div>
    );
  }

  return data.length > 0 ? (
    <div className="w-full my-4">
      <div className="w-full md:w-1/4  mb-4 h-[40px] flex items-center justify-center py-4 border rounded-md border-gray-400">
        <input
          placeholder="Filter property"
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className="w-2/3 placeholder:text-gray-400 outline-none border-0 bg-transparent pr-1 text-[16px]"
        />
        <Search color="#aaa" size={20} />
      </div>
      <div className="w-full grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {table.getRowModel().rows.map((row, idx: number) => {
          const title = row.getVisibleCells()[1].renderValue() as any;
          const city = row.getVisibleCells()[2].renderValue() as any;
          const country = row.getVisibleCells()[3].renderValue() as any;
          const price = row.getVisibleCells()[4].renderValue() as any;
          const index = data.findIndex(
            (d: { id: string }) => d.id === row.original.id
          );

          const photos = data ? data[index]?.photos : [];
          const wishlist = data.map((d: { userId: any }) => ({
            userId: d.userId,
          }));
          const propertyId = row.original.id;

          return (
            <SearchResultCard
              reviews={row.original.reviews}
              key={idx}
              {...{
                title,
                city,
                country,
                price,
                photos,
                wishlist,
                id: propertyId,
              }}
            />
          );
        })}
      </div>

      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  ) : (
    <div className="w-full mt-4 p-3 min-h-[200px] flex flex-col items-center justify-center space-y-1">
      <Heart size={50} color="gray" />
      <p>No Wishes at the moment</p>
    </div>
  );
};
