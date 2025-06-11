"use client";

import HorizontalDotsIcon from "@/components/svgs/HorizontalDotsIcon";
import {
  Calendar,
  ChevronDownIcon,
  Copy,
  Download,
  Eye,
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
import {
  cancelBooking,
  downloadHostBookingInvoice,
  getBookingsByHostId,
} from "@/http/api";
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
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import BookingView from "./booking-view";
import { useState, useEffect } from "react";
import PropertiesIcon from "@/components/svgs/PropertiesIcon";
import PersonsIcon from "@/components/svgs/PersonsIcon";
import {
  openPrompt,
  setId,
  setPromptQuestion,
} from "@/store/features/prompt-slice";
import Image from "next/image";
import Spinner from "@/components/svgs/Spinner";
import useCurrency from "@/hooks/useCurrency";

type BookingStatus =
  | "in-progress"
  | "pending"
  | "cancelled"
  | "completed"
  | "confirmed";

export type Bookings = {
  propertyTitle: string;
  id: string;
  checkInAndOut: string;
  people: number;
  status: BookingStatus;
  guestName: string;
  guestPhone: string;
  payment: number;
  paymentDate: string;
  downloadUrl: string;
  bookingReference: string;
  isBookingCancellable: boolean;
  photo: string;
};

export const columns: ColumnDef<Bookings>[] = [
  {
    id: "select",
    header: ({ table }) => <></>,
    cell: ({ row }) => <></>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "status",
    header: () => <div>Status</div>,
    cell: ({ row }) => {
      let statusStyle = "";
      switch (row.getValue("status") as BookingStatus) {
        case "in-progress":
          statusStyle = "bg-green-100 text-green-800";
          break;
        case "cancelled":
          statusStyle = "bg-red-100 text-red-800";
          break;

        case "confirmed":
          statusStyle = "bg-blue-100 text-blue-800";
          break;
        case "completed":
          statusStyle = "bg-slate-100 text-gray-800";
          break;
        default:
          statusStyle = "bg-amber-100 text-amber-800";
          break;
      }
      return (
        <div
          className={`${statusStyle} px-2 py-1 font-semibold  rounded-full capitalize text-center`}
        >
          {row.getValue("status")}
        </div>
      );
    },
  },
  {
    accessorKey: "propertyTitle",
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
      <div className="capitalize">{row.getValue("propertyTitle")}</div>
    ),
  },
  {
    accessorKey: "checkInAndOut",
    header: () => <div>Check in - Check out</div>,
    cell: ({ row }) => {
      return <div className="capitalize">{row.getValue("checkInAndOut")}</div>;
    },
  },
  {
    accessorKey: "people",
    header: () => <div>People</div>,
    cell: ({ row }) => {
      return <div className="capitalize">{row.getValue("people")}</div>;
    },
  },

  {
    accessorKey: "guestName",
    header: () => <div>Guest</div>,
    cell: ({ row }) => {
      return <div className="capitalize">{row.getValue("guestName")}</div>;
    },
  },

  {
    accessorKey: "payment",
    header: () => <div>Payment</div>,
    cell: ({ row }) => {
      const { exchangeRate, error: currencyError, loading } = useCurrency();

      const currency = useSelector(
        (state: RootState) => state.currency.currency
      );

      const symbol = currency === "NGN" ? "₦" : "$";

      const estimatedPrice =
        symbol === "$"
          ? Number(row.getValue("payment")) / exchangeRate
          : Number(row.getValue("payment"));

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
    accessorKey: "paymentDate",
    header: () => <div>Payment Date</div>,
    cell: ({ row }) => {
      return <div className="capitalize">{row.getValue("paymentDate")}</div>;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const client = useQueryClient();
      const booking = row.original;
      const mutation = useMutation({
        mutationFn: cancelBooking,
        async onSuccess() {
          await client.invalidateQueries({ queryKey: ["bookings"] });
        },
        onError() {
          toast(<div className="text-red-500"> could not cancel booking</div>);
        },
      });
      const dispatch = useDispatch();

      const [open, setOpen] = useState([false]);

      const [openDropDown, setOpenDropDown] = useState(false);

      const status = row.getValue("status");

      const invoiceMutation = useMutation({
        mutationKey: ["download-host-invoice"],
        mutationFn: downloadHostBookingInvoice,
        onSuccess(data) {
          const blob = new Blob([data], { type: "application/pdf" });
          const link = document.createElement("a");
          link.href = window.URL.createObjectURL(blob);
          link.download = `${row.original.bookingReference}.pdf`;
          link.click();
        },
        onError() {
          toast(
            "The was an error when downloading the file, please try again.",
            { closeButton: true }
          );
        },
      });

      const download = (id: string) => {
        invoiceMutation.mutate(id);
      };

      return (
        <DropdownMenu
          open={openDropDown}
          onOpenChange={(value) => {
            setOpenDropDown(value);
          }}
        >
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
                className="md:min-w-[900px]"
              >
                <BookingView setOpen={setOpen} bookingId={booking.id} />
              </DialogContent>
            </Dialog>
            {row.original.isBookingCancellable ? (
              <>
                <DropdownMenuSeparator />
                <button
                  onClick={(e) => {
                    dispatch(
                      setPromptQuestion(
                        "Are you sure you want cancel this booking?"
                      )
                    );
                    dispatch(setId(booking.id));
                    dispatch(openPrompt("open"));
                    setOpenDropDown(false);
                  }}
                  className={`w-full py-1 px-2 cursor-pointer flex items-center space-x-2 hover:bg-blue-50`}
                >
                  <XCircle size={17} />
                  <span>Cancel</span>
                </button>
                <DropdownMenuSeparator />
              </>
            ) : null}
            <DropdownMenuItem
              onClick={() => {
                navigator.clipboard.writeText(booking.bookingReference);
                toast(<div className="text-lg">Copied!</div>);
              }}
              className="cursor-pointer flex items-center space-x-2"
            >
              <Copy size={17} />
              <span> Copy Reference no.</span>
            </DropdownMenuItem>
            <div
              onClick={() => download(row.original.id)}
              className="cursor-pointer py-2 flex items-center space-x-2"
            >
              {invoiceMutation.isPending ? (
                <Spinner color="red" size={20} />
              ) : (
                <Download size={20} color="black" />
              )}
              <span>Download receipt</span>
            </div>
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

  const dispatch = useDispatch();

  const { data, error, isLoading } = useQuery({
    queryKey: ["bookings"],
    queryFn: () => getBookingsByHostId(id),
    refetchOnReconnect: true,
    refetchInterval: 3000,
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

  const invoiceMutation = useMutation({
    mutationKey: ["download-host-invoice"],
    mutationFn: downloadHostBookingInvoice,
    onSuccess(data) {
      const blob = new Blob([data], { type: "application/pdf" });
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = `download.pdf`;
      link.click();
    },
    onError() {
      toast("The was an error when downloading the file, please try again.", {
        closeButton: true,
      });
    },
  });

  const download = (id: string) => {
    invoiceMutation.mutate(id);
  };

  const [openState, setOpenState] = useState<boolean[]>([]);
  const [openDropDown, setOpenDropDown] = useState<boolean[]>([]);

  useEffect(() => {
    if (data) {
      setOpenState(data.map(() => false));
    }
  }, [data]);

  if (error) {
    toast("Error getting Bookings", {
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
    <div className="w-full my-4">
      <div className="flex space-x-1">
        <span className="font-semibold text-lg">Total Bookings:</span>
        <span className="font-semibold text-lg">{data.length}</span>
      </div>
      <div className="w-full grid gap-3 sm:grid-cols-2 md:grid-cols-3">
        {table.getRowModel().rows.map((row, idx: number) => {
          const status = row.getVisibleCells()[1].renderValue() as any;
          const propertyName = row.getVisibleCells()[2].renderValue() as any;
          const checkInAndOut = row.getVisibleCells()[3].renderValue() as any;
          const numberOfPeople = row.getVisibleCells()[4].renderValue() as any;
          const guestName = row.getVisibleCells()[5].renderValue() as any;
          // const payment = row.getVisibleCells()[6].renderValue() as any;

          const symbol = currency === "NGN" ? "₦" : "$";

          const estimatedPrice =
            symbol === "$"
              ? Number(row.getValue("payment")) / exchangeRate
              : Number(row.getValue("payment"));

          let statusStyle = "";
          switch (status as BookingStatus) {
            case "in-progress":
              statusStyle = "bg-green-100 text-green-800";
              break;
            case "cancelled":
              statusStyle = "bg-red-100 text-red-800";
              break;
            case "completed":
              statusStyle = "bg-slate-100 text-gray-800";
              break;
            case "confirmed":
              statusStyle = "bg-blue-100 text-blue-800";
              break;
            default:
              statusStyle = "bg-amber-100 text-amber-800";
              break;
          }

          return (
            <div
              key={idx}
              className="w-full lg:hidden min-h-[200px]  flex flex-col bg-paper rounded-xl overflow-hidden shadow-md"
            >
              <div className="w-full h-[300px] flex items-center justify-center bg-gradient-to-r from-cyan-100 to-blue-100 relative">
                <Image
                  src={row.original.photo}
                  alt="property_image"
                  fill
                  priority
                />
              </div>
              <div className="w-full py-4 px-2 space-y-3">
                <div className="w-full flex items-center justify-between">
                  <div
                    className={`py-1 px-4 rounded-full font-semibold capitalize ${statusStyle}`}
                  >
                    {status}
                  </div>
                  <DropdownMenu
                    open={openDropDown[idx]}
                    onOpenChange={(value) => {
                      const values = openDropDown;
                      values[idx] = value;
                      setOpenDropDown(() => [...values]);
                    }}
                  >
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className="h-8 w-8 p-0 focus-ring-0"
                      >
                        <HorizontalDotsIcon />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <Dialog
                        open={openState[idx]}
                        onOpenChange={(open) => {
                          setOpenState((prevState) => {
                            prevState[idx] = open;
                            return [...prevState];
                          });
                        }}
                      >
                        <DialogTrigger asChild>
                          <div className="w-full py-1 px-2 flex items-center space-x-2 hover:bg-blue-50">
                            <Eye size={17} /> <span>View</span>
                          </div>
                        </DialogTrigger>
                        <DialogContent className="md:min-w-[700px]">
                          <BookingView
                            setOpen={setOpenState}
                            bookingId={row.original.id}
                            index={idx}
                          />
                        </DialogContent>
                      </Dialog>
                      {row.original.isBookingCancellable ? (
                        <>
                          <DropdownMenuSeparator />
                          <button
                            onClick={() => {
                              dispatch(
                                setPromptQuestion(
                                  "Are you sure you want to cancel this booking ?"
                                )
                              );
                              dispatch(setId(id));
                              dispatch(openPrompt("open"));
                              const values = openDropDown;
                              values[idx] = false;
                              setOpenDropDown(() => [...values]);
                            }}
                            disabled={status !== "pending"}
                            className="w-full py-1 px-2 flex items-center space-x-2 hover:bg-blue-50 disabled:text-gray-300"
                          >
                            <XCircle size={17} /> <span>Cancel</span>
                          </button>
                          <DropdownMenuSeparator />
                        </>
                      ) : null}
                      <DropdownMenuItem
                        onClick={() => {
                          navigator.clipboard.writeText(
                            row.original.bookingReference
                          );
                          toast(<div className="text-lg">Copied!</div>);
                        }}
                        className="cursor-pointer flex items-center space-x-2"
                      >
                        <Copy size={17} />
                        <span> Copy Reference no.</span>
                      </DropdownMenuItem>
                      <div
                        onClick={() => download(row.original.id)}
                        className="cursor-pointer py-2 flex items-center space-x-2"
                      >
                        {invoiceMutation.isPending ? (
                          <Spinner color="red" size={20} />
                        ) : (
                          <Download size={20} color="black" />
                        )}
                        <span>Download receipt</span>
                      </div>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div className="flex items-center space-x-2">
                  <span>
                    <PropertiesIcon size={17} color="#444" />
                  </span>
                  <span className="text-sm capitalize font-semibold">
                    {propertyName}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span>
                    <Calendar size={17} color="#444" />
                  </span>
                  <span className="text-sm font-semibold">{checkInAndOut}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span>
                    <PersonsIcon size={17} />
                  </span>
                  <span className="text-sm font-semibold">
                    {numberOfPeople}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span>
                    <PersonStanding size={17} color="#444" />
                  </span>
                  <span className="text-sm capitalize font-semibold">
                    {guestName}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  {loading ? (
                    <Spinner color="red" size={20} />
                  ) : (
                    <>
                      <span className="font-semibold text-xl">{symbol}</span>
                      <span className="text-xl font-semibold font-inter">
                        {estimatedPrice.toFixed(2).toLocaleString()}
                      </span>
                    </>
                  )}
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
            value={
              (table.getColumn("propertyTitle")?.getFilterValue() as string) ??
              ""
            }
            onChange={(event) =>
              table
                .getColumn("propertyTitle")
                ?.setFilterValue(event.target.value)
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
    <div className="w-full mt-4 p-3 min-h-[200px] flex flex-col items-center justify-center space-y-2">
      <p className="text-lg font-[600]">No bookings yet</p>
      <p>You don't have any bookings yet. It's time to start</p>
    </div>
  );
};
