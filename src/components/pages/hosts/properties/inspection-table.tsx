"use client";

import * as React from "react";
import HorizontalDotsIcon from "@/components/svgs/HorizontalDotsIcon";
import {
  Calendar,
  CalendarSearch,
  ChevronDownIcon,
  Clock,
  Edit,
  Eye,
  Home,
  PersonStanding,
  Search,
  SlidersHorizontal,
  XCircle,
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
import { getInspections } from "@/http/api";
import { useQuery } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
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
import Link from "next/link";
import Image from "next/image";
import LocationIcon from "@/components/svgs/LocationIcon";

const data: Inspections[] = [];

export type Inspections = {
  id: string;
  type: string;
  status: "pending" | "approved" | "cancelled";
  location: string;
  phone: string;
  title: string;
  inspectionDate: Date;
};

export const columns: ColumnDef<Inspections>[] = [
  {
    id: "select",
    header: ({ table }) => <></>,
    cell: ({ row }) => <></>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      let statusStyle = "";
      switch (row.getValue("status")) {
        case "approved":
          statusStyle = "bg-green-100 text-green-800";
          break;
        case "cancelled":
          statusStyle = "bg-red-100 text-red-800";
          break;
        default:
          statusStyle = "bg-amber-100 text-amber-800";
          break;
      }
      return (
        <div
          className={`${statusStyle} px-4 py-1 font-semibold rounded-full capitalize`}
        >
          {row.getValue("status")}
        </div>
      );
    },
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Property
          <ChevronDownIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("title")}</div>
    ),
  },
  {
    accessorKey: "type",
    header: () => <div className="">Type</div>,
    cell: ({ row }) => {
      // Format the amount as a dollar amount
      // const formatted = new Intl.NumberFormat("en-US", {
      //   style: "currency",
      //   currency: "USD",
      // }).format(amount);

      return <div className="capitalize">{row.getValue("type")}</div>;
    },
  },
  {
    accessorKey: "location",
    header: () => <div className="">Location</div>,
    cell: ({ row }) => {
      return <div className="capitalize">{row.getValue("location")}</div>;
    },
  },

  {
    accessorKey: "phone",
    header: () => <div className="">Phone</div>,
    cell: ({ row }) => {
      return <div className="capitalize">{row.getValue("phone")}</div>;
    },
  },

  {
    accessorKey: "inspectionDate",
    header: () => <div className="">Inspection Date</div>,
    cell: ({ row }) => {
      return <div className="capitalize">{row.getValue("inspectionDate")}</div>;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const inspection = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0 focus-ring-0">
              <HorizontalDotsIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem className="space-x-2">
              <Link
                href={`/hosts/dashboard/properties/inspections/${inspection.id}`}
                className="flex w-full items-center space-x-2"
              >
                <Eye size={17} /> <span>View</span>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default () => {
  const id = useSelector((state: RootState) => state.user.me?.id);

  const { data, error, isLoading } = useQuery({
    queryKey: ["inspections"],
    queryFn: () => getInspections(id),
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
    <div className="w-full mt-4">
      <div className="w-full grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:hidden">
        {table.getRowModel().rows.map((row, idx: number) => {
          const photoUrl =
            data && data[idx].photos?.length ? data[idx].photos[0] : "";
          const url = photoUrl;

          const status = row.getVisibleCells()[1].renderValue() as any;
          const title = row.getVisibleCells()[2].renderValue() as any;
          const type = row.getVisibleCells()[3].renderValue() as any;
          const address = row.getVisibleCells()[4].renderValue() as any;
          const [inspectionDate, inspectionTime] = (
            row.getVisibleCells()[6].renderValue() as string
          ).split(" ");

          let statusStyle = "";
          switch (status) {
            case "approved":
              statusStyle = "bg-green-100 text-green-800";
              break;
            case "cancelled":
              statusStyle = "bg-red-100 text-red-800";
              break;
            default:
              statusStyle = "bg-amber-100 text-amber-800";
              break;
          }

          return (
            <div
              key={idx}
              className="w-full min-h-[200px]  flex flex-col bg-paper rounded-xl overflow-hidden shadow-md"
            >
              <div className="w-full h-[300px] relative overflow-hidden">
                <div className="absolute px-5 py-1 top-2 left-2 z-[50] rounded-full shadow-md bg-red-50 text-primary font-bold text-lg">
                  Inspection
                </div>
                <Image src={url} alt="property image" fill />
              </div>
              <div className="w-full  p-3 space-y-2">
                <div className="w-full flex items-start justify-between font-semibold truncate text-lg capitalize">
                  <span className="text-lg">{title}</span>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className="h-8 w-8 p-0 focus:ring-0 ring-0 bg-paper"
                      >
                        <HorizontalDotsIcon size={25} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>
                        <Link
                          href={`/hosts/dashboard/properties/inspections/${row.original.id}`}
                          className="flex w-full items-center space-x-2"
                        >
                          <Eye size={17} /> <span>View/Edit</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem disabled className="space-x-2">
                        <XCircle size={17} /> <span>Cancel</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div
                  className={` pl-3 w-auto py-2 text-lg capitalize rounded-md font-semibold ${statusStyle}`}
                >
                  {status}
                </div>
                <div className="w-full flex flex-col space-y-3">
                  <div className="w-full flex items-center space-x-1 text-sm capitalize">
                    <span>
                      <Home size={20} color="#777" />
                    </span>
                    <span className="font-semibold text-md">{type}</span>
                  </div>
                  <div className="w-full flex items-center space-x-1 text-md capitalize">
                    <span>
                      <LocationIcon size={20} color="stroke-gray-700" />
                    </span>
                    <span className="font-semibold text-md">{address}</span>
                  </div>
                  <div className="w-full flex items-center space-x-1 text-md capitalize">
                    <span>
                      <Calendar size={20} color="#777" />
                    </span>
                    <span className="font-semibold text-md">
                      {inspectionDate}
                    </span>
                  </div>
                  <div className="w-full flex items-center space-x-1 text-md capitalize">
                    <span>
                      <Clock size={20} color="#777" />
                    </span>
                    <span className="font-semibold text-md">
                      {inspectionTime}
                    </span>
                  </div>
                  <div className="w-full flex items-center space-x-1 text-md capitalize">
                    <span>
                      <PersonStanding size={20} color="#777" />
                    </span>
                    <span className="font-semibold text-md">
                      Mazi Inspector
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="hidden lg:flex items-center py-4">
        <div className="w-full md:w-1/4 space-x-2  mb-4 h-[40px] flex items-center justify-center py-4 border rounded-md border-gray-400">
          <input
            placeholder="Search by property"
            value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("title")?.setFilterValue(event.target.value)
            }
            className="w-2/3 placeholder:text-gray-400 outline-none border-0 bg-transparent pr-1 text-[16px]"
          />
          <Search color="#aaa" size={20} />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="default" className="ml-auto bg-black text-white">
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
    <div className="w-full mt-4 p-3 min-h-[200px] flex flex-col items-center justify-center space-y-1">
      <CalendarSearch size={50} color="gray" />
      <p>No inspections at the moment</p>
    </div>
  );
};
