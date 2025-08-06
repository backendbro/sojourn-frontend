"use client";

import HorizontalDotsIcon from "@/components/svgs/HorizontalDotsIcon";
import {
  ArrowDown,
  ArrowUp,
  Copy,
  Eye,
  Search,
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
import { cancelBooking, getWalletRecordsByHostId } from "@/http/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
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
import WalletViewer from "./wallet-viewer";
import { DialogClose } from "@radix-ui/react-dialog";
import humanize from "human-date";
import Spinner from "@/components/svgs/Spinner";
import useCurrency from "@/hooks/useCurrency";

export type Wallet = {
  description: string;
  id: string;
  paymentType: string;
  paymentMethod: string;
  amount: number;
  date: string;
  transactionFee: number;
  paymentReference: string;
};

export const columns: ColumnDef<Wallet>[] = [
  {
    id: "select",
    header: ({ table }) => <></>,
    cell: ({ row }) => <></>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "paymentType",
    header: () => <div>Payment type</div>,
    cell: ({ row }) => {
      return <div className="capitalize">{row.getValue("paymentType")}</div>;
    },
  },
  {
    accessorKey: "paymentMethod",
    header: () => <div>Payment method</div>,
    cell: ({ row }) => {
      return <div className="capitalize">{row.getValue("paymentMethod")}</div>;
    },
  },

  {
    accessorKey: "amount",
    header: () => <div>amount</div>,
    cell: ({ row }) => {
      const { exchangeRate, error: currencyError, loading } = useCurrency();

      const currency = useSelector(
        (state: RootState) => state.currency.currency
      );

      const symbol = currency === "NGN" ? "₦" : "$";

      const estimatedPrice =
        symbol === "$"
          ? Number(row.getValue("amount")) / exchangeRate
          : Number(row.getValue("amount"));

      if (loading) {
        return <Spinner color="red" size={20} />;
      }

      return (
        <div className="capitalize font-inter">
          {symbol}
          {estimatedPrice.toFixed(2)}
        </div>
      );
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
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const wallet = row.original;

      const [open, setOpen] = useState([false]);

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0 focus-ring-0">
              <HorizontalDotsIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <Dialog
              open={open[0]}
              onOpenChange={(open) => {
                setOpen([open]);
              }}
            >
              <DialogTrigger asChild>
                <div className="w-full py-1 px-2 flex items-center space-x-2 hover:bg-blue-50">
                  <Eye size={17} /> <span>View</span>
                </div>
              </DialogTrigger>
              <DialogContent
                id="host-booking-receipt"
                className="md:min-w-[700px]"
              >
                <WalletViewer id={wallet.id} />
              </DialogContent>
            </Dialog>
            <DropdownMenuItem
              onClick={() => {
                navigator.clipboard.writeText(row.original.paymentReference);
                toast(<div className="text-md">Copied!</div>);
              }}
              className="cursor-pointer flex items-center space-x-2"
            >
              <Copy size={17} />
              <span> Copy Reference no.</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default () => {
  const id = useSelector((state: RootState) => state.user.me?.host?.id);

  const { exchangeRate, error: currencyError, loading } = useCurrency();

  const currency = useSelector((state: RootState) => state.currency.currency);

  const { data, isLoading, error } = useQuery({
    queryKey: ["wallet-multiple"],
    queryFn: () => getWalletRecordsByHostId(id),
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
    toast("Error getting records", {
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

  return data?.length ? (
    <div className="w-full my-10 md:my-4">
      <div className="flex items-center py-4">
        <div className="w-full md:w-2/4 lg:w-1/4 space-x-2  mb-4 h-[40px] flex items-center justify-center py-4 border rounded-md border-gray-400">
          <input
            placeholder="Search by amount"
            value={
              (table.getColumn("amount")?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn("amount")?.setFilterValue(+event.target.value)
            }
            className="w-2/3 placeholder:text-gray-400 outline-none border-0 bg-transparent pr-1 text-[16px]"
          />
          <Search color="#aaa" size={20} />
        </div>
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
      <div className="w-full grid gap-3 sm:grid-cols-2 md:grid-cols-3">
        {table.getRowModel().rows.map((row, idx: number) => {
          const paymentType = row.getVisibleCells()[1].renderValue() as any;
          const paymentMethod = row.getVisibleCells()[2].renderValue() as any;
          // const amount = row.getVisibleCells()[3].renderValue() as any;
          const date = row.getVisibleCells()[4].renderValue() as any;

          const symbol = currency === "NGN" ? "₦" : "$";

          const estimatedPrice =
            symbol === "$"
              ? Number(row.getValue("amount")) / exchangeRate
              : Number(row.getValue("amount"));

          return (
            <Dialog
              key={idx}
              open={openState[idx]}
              onOpenChange={(open) => {
                setOpenState((prevState) => {
                  prevState[idx] = open;
                  return [...prevState];
                });
              }}
            >
              <DialogTrigger asChild>
                <div className="w-full sm:hidden min-h-[50px]  flex flex-col rounded-xl overflow-hidden border-b">
                  <div className="w-full flex py-4 px-2 space-x-2">
                    <div className="bg-gray-200 w-[50px] h-[50px] rounded-full flex items-center justify-center">
                      {String(paymentType).toLowerCase() === "booking" ? (
                        <ArrowDown color="black" size={20} />
                      ) : (
                        <ArrowUp color="black" size={20} />
                      )}
                    </div>
                    <div className="w-5/6 flex flex-col">
                      <div className="w-full flex items-center justify-between">
                        <p className="w-full capitalize font-bold text-md truncate">
                          {paymentType}
                        </p>
                        {loading ? (
                          <Spinner color="red" size={20} />
                        ) : (
                          <span className="font-semibold font-inter">
                            {symbol}
                            {estimatedPrice.toFixed(2)}
                          </span>
                        )}
                      </div>
                      <div className="w-full flex items-center justify-between">
                        <span className="text-xs font-semibold mt-1">
                          {paymentMethod}
                        </span>
                        <span className="text-xs font-semibold mt-1">
                          {humanize.relativeTime(new Date(date))}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </DialogTrigger>
              <DialogContent
                id="host-booking-receipt"
                className="md:min-w-[700px]"
              >
                <WalletViewer id={row.original.id} />
              </DialogContent>
            </Dialog>
          );
        })}
      </div>
      <div className="hidden md:block rounded-md shadow-md">
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
    <div className="w-full mt-4 p-3 min-h-[200px] flex flex-col items-center justify-center space-y-1">
      <Wallet size={50} color="gray" />
      <p>No records at the moment</p>
    </div>
  );
};
