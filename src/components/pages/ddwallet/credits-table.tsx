"use client";

import {
  ArrowDown,
  ArrowUp,
  ChevronDownIcon,
  Coins,
  Search,
  SlidersHorizontal,
  UsersRound,
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

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useState } from "react";
import humanize from "human-date";

export type Credit = {
  amount: number;
  id: string;
  date: Date;
  type: string;
  total: number;
};

export const columns: ColumnDef<Credit>[] = [
  {
    id: "select",
    header: ({ table }) => <></>,
    cell: ({ row }) => <></>,
    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorKey: "amount",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Amount
          <ChevronDownIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="max-w-[100px] truncate capitalize">
        ₦{row.getValue("amount")}
      </div>
    ),
  },
  {
    accessorKey: "type",
    header: () => <div> Type</div>,
    cell: ({ row }) => {
      return <div className="capitalize">{row.getValue("type")}</div>;
    },
  },

  {
    accessorKey: "date",
    header: () => <div>Date Received</div>,
    cell: ({ row }) => {
      return (
        <div className="capitalize">
          {new Date(row.getValue("date")).toDateString()}
        </div>
      );
    },
  },
];

export default ({ data }: { data: any[] }) => {
  const id = useSelector((state: RootState) => state.user.me?.user?.id);

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data: data ? data : [],
    columns,
    rowCount: data ? data?.length : 0,
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

  return (
    <div className="w-full my-4">
      <div className="w-full py-3  flex flex-col md:flex-row md:items-center justify-between bg-primary text-white px-6">
        <div className="flex items-center space-x-10 ">
          <Coins className="white" size={40} />
          <div className="flex items-center flex-col md:flex-row">
            <p className="text-white md:w-[90px] text-sm">Credits Balance:</p>
            <div className="font-bold text-white text-3xl font-inter">
              {data?.length ? Number(data[0].total).toLocaleString() : 0}
            </div>
          </div>
        </div>
      </div>
      {data?.length ? (
        <>
          <div className="w-full grid gap-3 sm:grid-cols-2 md:grid-cols-3">
            {table.getRowModel().rows.map((row, idx: number) => {
              const amount = row.getVisibleCells()[1].renderValue() as any;
              const type = row.getVisibleCells()[2].renderValue() as any;
              const date = row.getVisibleCells()[3].renderValue() as any;

              return (
                <div className="w-full lg:hidden min-h-[50px]  flex flex-col rounded-xl overflow-hidden border-b">
                  <div className="w-full flex py-4 px-2 space-x-2">
                    <div className="bg-gray-200 w-[50px] h-[50px] rounded-full flex items-center justify-center">
                      {type === "incoming" ? (
                        <ArrowDown color="black" size={20} />
                      ) : (
                        <ArrowUp color="black" size={20} />
                      )}
                    </div>
                    <div className="w-5/6 flex flex-col">
                      <div className="w-full flex items-center justify-between">
                        <p className="w-full capitalize font-bold text-md truncate">
                          {type === "incoming" ? "Reward" : "Debit"}
                        </p>
                        <span className="font-semibold">₦{amount}</span>
                      </div>
                      <div className="w-full flex items-center justify-between">
                        <span className="text-xs font-semibold mt-1">
                          {type}
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
            <div className="w-full md:w-1/4 h-[40px] flex items-center justify-center py-4 border rounded-md border-gray-400">
              <input
                placeholder="Search by amount"
                value={
                  (table.getColumn("amount")?.getFilterValue() as string) ?? ""
                }
                onChange={(event) =>
                  table.getColumn("amount")?.setFilterValue(event.target.value)
                }
                className="w-2/3 placeholder:text-gray-400 outline-none border-0 bg-transparent pr-1 text-[16px]"
              />
              <Search color="#aaa" size={20} />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="ml-auto bg-black hover:bg-black"
                >
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
