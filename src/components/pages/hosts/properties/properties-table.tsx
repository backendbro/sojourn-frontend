"use client";

import * as React from "react";
import HorizontalDotsIcon from "@/components/svgs/HorizontalDotsIcon";
import {
  ChevronDownIcon,
  Edit,
  Eye,
  EyeIcon,
  Home,
  Power,
  Search,
  SlidersHorizontal,
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
import { getProperties, updatePropertyWithoutPhotos } from "@/http/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
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
import TableLoader from "@/components/ui/table-loader";
import { Skeleton } from "@/components/ui/skeleton";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { toast } from "sonner";
import Link from "next/link";
import Image from "next/image";
import LocationIcon from "@/components/svgs/LocationIcon";
import BookingIcon from "@/components/svgs/BookingIcon";
import PropertiesIcon from "@/components/svgs/PropertiesIcon";
import Spinner from "@/components/svgs/Spinner";
import humanNumber from "human-number";
import { original } from "@reduxjs/toolkit";

export type Properties = {
  id: string;
  type: string;
  status: "pending" | "approved" | "cancelled";
  location: string;
  views: number;
  activeFrom: Date;
  revenue: number;
  bookings: number;
  photos: Array<string>;
  activeStatus: string;
  title: string;
};

export const columns: ColumnDef<Properties>[] = [
  {
    id: "select",
    header: ({ table }) => <></>,
    cell: ({ row }) => <></>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "activeStatus",
    header: "Status",
    cell: ({ row }) => {
      let statusStyle = "";
      switch (row.getValue("activeStatus")) {
        case "active":
          statusStyle = "bg-green-100 text-green-800";
          break;
        default:
          statusStyle = "bg-amber-100 text-amber-800";
          break;
      }

      const activeStatus = row.original.activeStatus;

      return (
        <div
          className={`${statusStyle} px-4 py-1 font-semibold rounded-full capitalize`}
        >
          {activeStatus === "active" && row.original.status === "approved"
            ? "active"
            : activeStatus !== "active"
            ? "inactive"
            : "pending"}
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
    accessorKey: "views",
    header: () => <div className="">Views</div>,
    cell: ({ row }) => {
      return <div className="capitalize">{row.getValue("views")}</div>;
    },
  },

  {
    accessorKey: "activeFrom",
    header: () => <div className="truncate">Active From</div>,
    cell: ({ row }) => {
      const activeFromValue: React.ReactNode = row.getValue("activeFrom") ? (
        row.getValue("activeFrom")
      ) : (
        <span>not active</span>
      );
      return <div className="capitalize">{activeFromValue}</div>;
    },
  },

  {
    accessorKey: "bookings",
    header: () => <div className="">Bookings</div>,
    cell: ({ row }) => {
      return <div className="capitalize">{row.getValue("bookings")}</div>;
    },
  },

  {
    accessorKey: "revenue",
    header: () => <div className="">Revenue</div>,
    cell: ({ row }) => {
      return (
        <div className="capitalize">
          ₦{humanNumber(row.getValue("revenue"))}
        </div>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const property = row.original;

      const hostId = useSelector((state: RootState) => state.user.me?.host?.id);

      const client = useQueryClient();

      const mutation = useMutation({
        mutationKey: ["update-status"],
        mutationFn: updatePropertyWithoutPhotos,
        async onSuccess() {
          await client.invalidateQueries({ queryKey: ["properties"] });
        },
        onError() {},
      });

      const activeateOrDeactivated =
        property.activeStatus === "active" ? "Deactivate" : "Activate";

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0 focus-ring-0">
              <HorizontalDotsIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>
              <Link
                href={`/hosts/dashboard/properties/${property.id}`}
                className="flex w-full items-center space-x-2"
              >
                <Eye size={17} /> <span>View</span>
              </Link>
            </DropdownMenuItem>
            {row.getValue("status") === "approved" ? (
              <>
                <DropdownMenuSeparator />
                <div
                  role="button"
                  onClick={() => {
                    const payload = {
                      hostId,
                      id: property.id,
                      activeStatus:
                        property.activeStatus === "active"
                          ? "deactivated"
                          : "active",
                    };
                    mutation.mutate(payload);
                  }}
                  className="flex p-2 w-full flex items-center justify-center cursor-pointer items-center space-x-2 hover:bg-primary hover:text-white"
                >
                  {mutation.isPending ? (
                    <Spinner size={17} color="red" />
                  ) : (
                    <>
                      <Power size={17} />
                      <span className="text-[15px]">
                        {activeateOrDeactivated}
                      </span>
                    </>
                  )}
                </div>
              </>
            ) : null}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default () => {
  const client = useQueryClient();

  const id = useSelector((state: RootState) => state.user.me?.host?.id);

  const mutation = useMutation({
    mutationKey: ["update-status"],
    mutationFn: updatePropertyWithoutPhotos,
    async onSuccess() {
      await client.invalidateQueries({ queryKey: ["properties"] });
    },
    onError() {},
  });

  const { data, error, isLoading } = useQuery({
    queryKey: ["properties"],
    queryFn: () => getProperties(id),
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
      <div className="w-full grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:hidden">
        {table.getRowModel().rows.map((row, idx: number) => {
          const photoUrl =
            data?.length && data[idx].photos?.length ? data[idx].photos[0] : "";
          const url = photoUrl;

          const property = row.original;

          const status = property.status;
          const title = property.title;
          const type = property.type;
          const address = property.location;
          const views = property.views;
          const bookings = property.bookings;
          const revenue = property.revenue;

          const activeStatus = property.activeStatus;

          let statusStyle = "";
          switch (activeStatus) {
            case "active":
              statusStyle = "bg-green-100 text-green-800";
              break;
            default:
              statusStyle = "bg-amber-100 text-amber-800";
              break;
          }

          const statusText =
            activeStatus === "active" && property.status === "approved"
              ? "active"
              : activeStatus !== "active"
              ? "inactive"
              : "pending";

          const activeateOrDeactivated =
            property.activeStatus === "active" ? "Deactivate" : "Activate";

          return (
            <div
              key={idx}
              className="w-full min-h-[200px]  flex flex-col bg-paper rounded-xl overflow-hidden shadow-md"
            >
              <div className="w-full h-[300px] relative overflow-hidden">
                <div
                  className={`absolute z-[99] shadow-md top-2 left-2 text-center px-5 py-1 text-lg rounded-full font-bold ${statusStyle}`}
                >
                  {statusText}
                </div>
                <Image src={url} alt="property image" fill />
              </div>
              <div className="w-full p-3 space-y-2">
                <div className="w-full flex items-start justify-between font-semibold truncate text-lg capitalize">
                  <span>{title}</span>
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
                          href={`/hosts/dashboard/properties/${row.original.id}`}
                          className="flex w-full items-center space-x-2"
                        >
                          <Eye size={17} /> <span>View/Edit</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      {status === "approved" ? (
                        <>
                          <DropdownMenuSeparator />
                          <div
                            role="button"
                            onClick={() => {
                              const payload = {
                                hostId: id,
                                id: property.id,
                                activeStatus:
                                  property.activeStatus === "active"
                                    ? "deactivated"
                                    : "active",
                              };
                              mutation.mutate(payload);
                            }}
                            className="flex p-2 w-full flex items-center justify-center cursor-pointer items-center space-x-2 hover:bg-primary hover:text-white"
                          >
                            {mutation.isPending ? (
                              <Spinner size={17} color="red" />
                            ) : (
                              <>
                                <Power size={17} />
                                <span className="text-[15px]">
                                  {activeateOrDeactivated}
                                </span>
                              </>
                            )}
                          </div>
                        </>
                      ) : null}
                    </DropdownMenuContent>
                  </DropdownMenu>
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
                      <EyeIcon size={20} color="#777" />
                    </span>
                    <span className="font-semibold text-md">{views}</span>
                  </div>
                  <div className="w-full flex items-center space-x-1 text-md capitalize">
                    <span>
                      <BookingIcon size={20} color="#777" />
                    </span>
                    <span className="font-semibold text-md">{bookings}</span>
                  </div>
                  <div className="w-full flex items-center space-x-1 text-md capitalize">
                    <span className="font-bold text-lg">₦</span>
                    <span className="font-semibold text-sm">
                      {((revenue ?? 0) as number).toFixed(2)}
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
      <PropertiesIcon size={50} color="gray" />
      <p>No properties at the moment</p>
    </div>
  );
};
