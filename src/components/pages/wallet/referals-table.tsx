"use client";

import HorizontalDotsIcon from "@/components/svgs/HorizontalDotsIcon";
import {
  ArrowDown,
  ArrowUp,
  ChevronDownIcon,
  Copy,
  Eye,
  Search,
  SlidersHorizontal,
  Users,
  UsersRound,
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
import { getReferalsByRefererId, getWalletRecordsByUserId } from "@/http/api";
import { useQuery } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
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
import ReferalViewer from "./referal-viewer";
import { DialogClose } from "@radix-ui/react-dialog";
import humanize from "human-date";
import ReferalWithdraw from "./referal-withdraw";

export type Referal = {
  referalType: string;
  referalFirstName: string;
  referalLastName: string;
  amount: number;
  date: Date;
  id: string;
};

export const columns: ColumnDef<Referal>[] = [
  {
    id: "select",
    header: ({ table }) => <></>,
    cell: ({ row }) => <></>,
    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorKey: "referalFirstName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          First Name
          <ChevronDownIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="max-w-[100px] truncate capitalize">
        {row.getValue("referalFirstName")}
      </div>
    ),
  },
  {
    accessorKey: "referalLastName",
    header: () => <div> Last Name</div>,
    cell: ({ row }) => {
      return (
        <div className="capitalize">{row.getValue("referalLastName")}</div>
      );
    },
  },
  {
    accessorKey: "amount",
    header: () => <div>Amount</div>,
    cell: ({ row }) => {
      return <div>₦{row.getValue("amount")}</div>;
    },
  },

  {
    accessorKey: "referalType",
    header: () => <div>Referral Type</div>,
    cell: ({ row }) => {
      return <div className="capitalize">{row.getValue("referalType")}</div>;
    },
  },

  {
    accessorKey: "date",
    header: () => <div>Date Received</div>,
    cell: ({ row }) => {
      return <div className="capitalize">{row.getValue("date")}</div>;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const referal = row.original;

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
                className="md:min-w-[200px]"
              >
                <ReferalViewer id={referal.id} />
              </DialogContent>
            </Dialog>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default () => {
  const id = useSelector((state: RootState) => state.user.me?.user?.id);

  const { data, isLoading, error } = useQuery({
    queryKey: ["wallet-multiple"],
    queryFn: () => getReferalsByRefererId(id),
    refetchOnReconnect: true,
  });

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data: data ? data.data : [],
    columns,
    rowCount: data && data?.data ? data?.data?.length : 0,
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
    if (data && Array.isArray(data.data)) {
      setOpenState(data.data.map(() => false));
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

  return (
    <div className="w-full my-4">
      <div className="w-full py-3  flex flex-col md:flex-row md:items-center justify-between bg-primary text-white px-6">
        <div className="flex items-center space-x-10 ">
          <Users color="white" size={40} />
          <div className="flex items-center flex-col md:flex-row">
            <p className="text-white md:w-[90px] text-sm">Referral Balance:</p>
            <div className="font-bold text-white text-3xl font-inter">
              ₦{Number(data.balance).toLocaleString()}
            </div>
          </div>
        </div>
        <Dialog>
          <DialogTrigger className="rounded-full font-[600] text-black bg-white px-4 py-2 ease duration-300 hover:bg-gray-300">
            Withdraw
          </DialogTrigger>
          <DialogContent className="md:w-[400px]">
            <div className="w-full border-b py-2">
              <h3 className="text-center text-xl">Withdrawal Details</h3>
            </div>
            <ReferalWithdraw id={id} />
          </DialogContent>
        </Dialog>
      </div>
      {data?.data?.length ? (
        <>
          <div className="w-full grid gap-3 sm:grid-cols-2 md:grid-cols-3">
            {table.getRowModel().rows.map((row, idx: number) => {
              const firstName = row.getVisibleCells()[1].renderValue() as any;
              const lastName = row.getVisibleCells()[2].renderValue() as any;
              const amount = row.getVisibleCells()[3].renderValue() as any;
              const referalType = row.getVisibleCells()[4].renderValue() as any;
              const date = row.getVisibleCells()[5].renderValue() as any;

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
                          {referalType === "incoming" ? (
                            <ArrowDown color="black" size={20} />
                          ) : (
                            <ArrowUp color="black" size={20} />
                          )}
                        </div>
                        <div className="w-5/6 flex flex-col">
                          <div className="w-full flex items-center justify-between">
                            <p className="w-full capitalize font-bold text-md truncate">
                              {firstName} {lastName}
                            </p>
                            <span className="font-semibold">₦{amount}</span>
                          </div>
                          <div className="w-full flex items-center justify-between">
                            <span className="text-xs font-semibold mt-1">
                              {referalType === "incoming"
                                ? "Deposits"
                                : "Withdrawal"}
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
                    <ReferalViewer id={row.original.id} />
                  </DialogContent>
                </Dialog>
              );
            })}
          </div>

          <div className="hidden sm:flex items-center py-4">
            <div className="w-full md:w-1/4 space-x-2  mb-4 h-[40px] flex items-center justify-center py-4 border rounded-md border-gray-400">
              <input
                placeholder="Search by first name"
                value={
                  (table
                    .getColumn("referalFirstName")
                    ?.getFilterValue() as string) ?? ""
                }
                onChange={(event) =>
                  table
                    .getColumn("referalFirstName")
                    ?.setFilterValue(event.target.value)
                }
                className="w-2/3 placeholder:text-gray-400 outline-none border-0 bg-transparent pr-1 text-[16px]"
              />
              <Search color="#aaa" size={20} />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="ml-auto bg-black  hover:bg-black"
                >
                  <SlidersHorizontal color="white" className="ml-2 h-4 w-4" />
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
          <div className="hidden sm:block rounded-md shadow-md">
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
        </>
      ) : (
        <div className="w-full mt-4 p-3 min-h-[200px] flex flex-col items-center justify-center space-y-1">
          <UsersRound size={50} color="gray" />
          <p>No records at the moment</p>
        </div>
      )}
    </div>
  );
};
