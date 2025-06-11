"use client";

import {
  ArrowDown,
  ArrowUp,
  Download,
  SlidersHorizontal,
  Wallet,
  X,
} from "lucide-react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { cancelBooking, getSubscriptionPaymentsById } from "@/http/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TableLoader from "@/components/ui/table-loader";
import { Skeleton } from "@/components/ui/skeleton";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useState, useEffect } from "react";
import { DialogClose } from "@radix-ui/react-dialog";
import humanize from "human-date";

export type SubscriptionPayment = {
  id: string;
  amount: number;
  date: string;
  status: number;
  downloadLink: string;
};

export const columns: ColumnDef<SubscriptionPayment>[] = [
  {
    id: "select",
    header: ({ table }) => <></>,
    cell: ({ row }) => <></>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "invoice",
    header: () => <div>Invoice</div>,
    cell: ({ row }) => {
      return <div className="capitalize">{row.getValue("id")}</div>;
    },
  },
  {
    accessorKey: "amount",
    header: () => <div>Amount</div>,
    cell: ({ row }) => {
      return <div className="capitalize">₦{row.getValue("amount")}</div>;
    },
  },

  {
    accessorKey: "date",
    header: () => <div>Date</div>,
    cell: ({ row }) => {
      return <div className="capitalize">{row.getValue("date")}</div>;
    },
  },

  {
    accessorKey: "status",
    header: () => <div>Status</div>,
    cell: ({ row }) => {
      return <div className="capitalize">{row.getValue("status")}</div>;
    },
  },
  // {
  //   accessorKey: "download",
  //   header: () => <></>,
  //   cell: ({ row }) => {
  //     return (
  //       <div className="capitalize">
  //         <Download color="gray" size={25} />
  //       </div>
  //     );
  //   },
  // },
];

export default () => {
  const id = useSelector((state: RootState) => state.user.me?.host?.id);

  const client = useQueryClient();
  const mutation = useMutation({
    mutationFn: cancelBooking,
    async onSuccess() {
      await client.invalidateQueries({ queryKey: ["bookings"] });
    },
    onError() {
      toast(<div className="text-red-500"> could not cancel booking</div>);
    },
  });

  const { data, isLoading, error } = useQuery({
    queryKey: ["get-subscriptions-payments"],
    queryFn: () => getSubscriptionPaymentsById(id),
    refetchOnReconnect: true,
  });

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

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

  const [openState, setOpenState] = useState<boolean[]>([]);

  useEffect(() => {
    if (Array.isArray(data)) {
      setOpenState(data.map(() => false));
    }
  }, [data]);

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

  return data.length ? (
    <div className="w-full my-4">
      <div className="w-full grid gap-3 sm:grid-cols-2 md:grid-cols-3">
        {table.getRowModel().rows.map((row, idx: number) => {
          // const paymentType = row.getVisibleCells()[1].renderValue() as any;
          const amount = row.getVisibleCells()[2].renderValue() as any;
          const date = row.getVisibleCells()[3].renderValue() as any;
          const status = row.getVisibleCells()[4].renderValue() as any;

          return (
            <div className="w-full sm:hidden min-h-[50px]  flex flex-col rounded-xl overflow-hidden border-b">
              <div className="w-full flex  items-center py-4 px-2 space-x-2">
                <div className="bg-gray-200 w-[50px] h-[50px] rounded-full flex items-center justify-center">
                  <ArrowUp color="black" size={20} />
                </div>
                <div className="w-5/6 flex flex-col">
                  <div className="w-full flex items-center">
                    <span className="font-semibold">₦{amount}</span>
                  </div>
                  <div className="w-full flex items-center justify-between">
                    <span className="text-xs font-semibold mt-1 capitalize">
                      {status}
                    </span>
                    <span className="text-xs font-semibold mt-1">
                      {humanize.relativeTime(new Date(date))}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="hidden lg:flex items-center py-4">
        <Input
          placeholder="Search wallet by booking"
          value={
            (table.getColumn("propertyTitle")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("propertyTitle")?.setFilterValue(event.target.value)
          }
          className="max-w-sm placeholder:text-gray-300 text-[16px]"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="default" className="ml-auto bg-black">
              <SlidersHorizontal color="white" className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="hidden lg:block rounded-md shadow-md">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
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
    <div className="w-full flex flex-col">
      <h4 className="font-semibold text-[32px]">Billing History</h4>
      <div className="w-full mt-4 p-3 min-h-[200px] flex flex-col items-center justify-center space-y-1">
        <Wallet size={50} color="gray" />
        <p>No records at the moment</p>
      </div>
    </div>
  );
};
