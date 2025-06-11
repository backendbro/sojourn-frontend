"use client";

import HorizontalDotsIcon from "@/components/svgs/HorizontalDotsIcon";
import {
  ArrowRight,
  Calendar,
  ChevronDownIcon,
  Copy,
  Download,
  Eye,
  Mail,
  PersonStanding,
  Search,
  SlidersHorizontal,
  Star,
  X,
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
  createTicket,
  downloadGuestBookingInvoice,
  getBookingsByUserId,
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
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import BookingView from "./booking-view";
import { useState, useEffect, FormEvent, ChangeEvent } from "react";
import PropertiesIcon from "@/components/svgs/PropertiesIcon";
import PersonsIcon from "@/components/svgs/PersonsIcon";
import Spinner from "@/components/svgs/Spinner";
import {
  openPrompt,
  setId,
  setPromptQuestion,
} from "@/store/features/prompt-slice";
import QrCodeView from "./qr-code-view";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

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
  hostId: string;
  guestPhone: string;
  payment: number;
  holdingWindow: string;
  cryptoPaymentAmount?: number;
  cryptoPaymentAddress?: string;
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
          className={`${statusStyle} px-2 py-1 font-semibold text-center rounded-full capitalize text-center`}
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
      return <div className="capitalize">₦{row.getValue("payment")}</div>;
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
    accessorKey: "paymentDate",
    header: () => <></>,
    cell: ({ row }) => {
      const id = useSelector((state: RootState) => state.user.me?.user?.id);

      const client = useQueryClient();
      const booking = row.original;

      const ticket = useMutation({
        mutationKey: ["create-ticket"],
        mutationFn: createTicket,
        async onSuccess() {
          toast("Success message", {
            description: "message sent successfully.",
            action: {
              label: "OK",
              onClick: () => null,
            },
          });
          await client.invalidateQueries({ queryKey: ["messages-user"] });
        },
        onError() {
          toast("Error message", {
            description: "Soory, we could not send your message at this time.",
            action: {
              label: "OK",
              onClick: () => null,
            },
          });
        },
      });
      const [newChat, setNewChatDetails] = useState({
        title: "",
        message: "",
        hostId: "",
      });
      function handleChange(
        e: ChangeEvent<
          HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >
      ) {
        const { name, value } = e.target;
        setNewChatDetails((prevState) => ({ ...prevState, [name]: value }));
      }

      function createNewTicket(e: FormEvent) {
        e.preventDefault();
        ticket.mutate({
          senderId: id,
          userId: id,
          message: newChat.message,
          hostId: booking.hostId,
          title: newChat.title,
          bookingId: booking.id,
        });
      }
      return (
        <Dialog>
          <DialogTrigger className="p-2 rounded-md bg-white border border-white hover:bg-red-50">
            <Mail size={13} color="black" />
          </DialogTrigger>
          <DialogContent className="md:w-[400px]">
            <div className="w-full flex justify-between z-[99999999]">
              <DialogHeader className="w-auto flex flex-col">
                <DialogTitle className="text-left p-0 m-0">
                  New Chat
                </DialogTitle>
                <DialogDescription>Adds a new Ticket</DialogDescription>
              </DialogHeader>
              <DialogClose className="w-auto">
                <X />
              </DialogClose>
            </div>
            <form className="w-full space-y-3" onSubmit={createNewTicket}>
              <div className="w-full flex flex-col">
                <label htmlFor="title">What do you want to talk about ?</label>
                <input
                  id="title"
                  name="title"
                  placeholder="Enter title here..."
                  onChange={handleChange}
                  value={newChat.title}
                  className="w-full py-3 px-2 my-3 outline-none border-b border-b-secondary placeholder:text-gray-400 text-[16px]"
                />
              </div>
              <div className="w-full flex flex-col">
                <textarea
                  value={newChat.message}
                  onChange={handleChange}
                  name="message"
                  className="w-full py-3 px-2 my-3 outline-none border-b border-b-secondary placeholder:text-gray-400"
                  placeholder="type message..."
                />
              </div>
              <button className="w-full p-2 rounded-full flex space-x-2 items-center justify-center outline-none bg-black text-white">
                {ticket.isPending ? (
                  <Spinner color="red" size={20} />
                ) : (
                  <>
                    <span>Send message</span>
                    <ArrowRight />
                  </>
                )}
              </button>
            </form>
          </DialogContent>
        </Dialog>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const id = useSelector((state: RootState) => state.user.me?.user?.id);

      const booking = row.original;

      const isCompleted =
        (row.getValue("status") as BookingStatus) === "completed";

      const dispatch = useDispatch();

      const [open, setOpen] = useState([false]);

      const [openPay, setOpenPay] = useState(false);

      const [openDropDown, setOpenDropDown] = useState(false);

      const status = row.getValue("status");
      const isCancellable =
        status === "pending"
          ? ""
          : "disabled:text-gray-300 disabled:cursor-not-allowed";

      const invoiceMutation = useMutation({
        mutationKey: ["download-guest-invoice"],
        mutationFn: downloadGuestBookingInvoice,
        onSuccess(data) {
          const blob = new Blob([data], { type: "application/pdf" });
          const link = document.createElement("a");
          link.href = window.URL.createObjectURL(blob);
          link.download = `download.pdf`;
          link.click();
        },
        onError() {
          toast(
            "The was an error when downloading the file, please try again.",
            {
              closeButton: true,
            }
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
                <DialogTitle className="text-sm font-semibold"></DialogTitle>
                <BookingView setOpen={setOpen} bookingId={booking.id} />
              </DialogContent>
            </Dialog>
            <DropdownMenuSeparator />
            {row.original.holdingWindow ? (
              <Dialog
                open={openPay}
                onOpenChange={(value) => {
                  setOpenPay(value);
                }}
              >
                <DialogTrigger asChild>
                  <div className="w-full py-1 px-2 flex items-center space-x-2 hover:bg-blue-50">
                    <ArrowRight size={17} />
                    <span>Pay now</span>
                  </div>
                </DialogTrigger>
                <DialogContent
                  id="host-booking-receipt"
                  className="w-auto bg-primary"
                >
                  <QrCodeView
                    cryptoPaymentAddress={
                      row.original.cryptoPaymentAddress as string
                    }
                    cryptoPaymentAmount={
                      row.original.cryptoPaymentAmount as number
                    }
                    holdingWindow={new Date(row.original.holdingWindow)}
                  />
                </DialogContent>
              </Dialog>
            ) : null}
            {row.original.isBookingCancellable ? (
              <>
                <DropdownMenuSeparator />
                <button
                  onClick={(e) => {
                    dispatch(
                      setPromptQuestion(
                        "Are you sure you want to cancel this booking ?"
                      )
                    );
                    dispatch(setId(booking.id));
                    setOpenDropDown(false);
                    dispatch(openPrompt("open"));
                  }}
                  className={`w-full py-1 px-2 cursor-pointer flex items-center space-x-2 hover:bg-blue-50 ${isCancellable}`}
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
            
            <DropdownMenuSeparator />
            {isCompleted ? (
              <Link href={`/dashboard/bookings/reviews/${booking.id}`} prefetch>
                <DropdownMenuItem className="cursor-pointer flex items-center space-x-2">
                  <Star color="black" size={17} />
                  <span>leave a review</span>
                </DropdownMenuItem>
              </Link>
            ) : null}
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
  const id = useSelector((state: RootState) => state.user.me?.user?.id);

  const router = useRouter();

  const dispatch = useDispatch();

  const client = useQueryClient();

  const { data, error, isLoading } = useQuery({
    queryKey: ["bookings"],
    queryFn: () => getBookingsByUserId(id),
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

  const ticket = useMutation({
    mutationKey: ["create-ticket"],
    mutationFn: createTicket,
    async onSuccess() {
      toast("Success message", {
        description: "message sent successfully.",
        action: {
          label: "OK",
          onClick: () => null,
        },
      });
      await client.invalidateQueries({ queryKey: ["messages-user"] });
    },
    onError() {
      toast("Error message", {
        description: "Soory, we could not send your message at this time.",
        action: {
          label: "OK",
          onClick: () => null,
        },
      });
    },
  });

  const [newChat, setNewChatDetails] = useState({
    title: "",
    message: "",
    hostId: "",
  });

  const [openState, setOpenState] = useState<boolean[]>([]);

  const [openDropDown, setOpenDropDown] = useState<boolean[]>([]);

  const [openPay, setOpenPay] = useState<boolean[]>([]);

  const invoiceMutation = useMutation({
    mutationKey: ["download-guest-invoice"],
    mutationFn: downloadGuestBookingInvoice,
    onSuccess(response) {
      const blob = new Blob([response], { type: "application/pdf" });
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

  useEffect(() => {
    if (data) {
      setOpenState(data.map(() => false));
      setOpenPay(data.map(() => false));
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

  return data && data?.length ? (
    <div className="w-full my-4">
      <div className="flex space-x-1 mb-4 md:mb-0">
        <span className="font-semibold text-lg">Total:</span>
        <span className="font-semibold text-lg font-inter">{data.length}</span>
      </div>
      <div className="w-full grid gap-3 sm:grid-cols-2 md:grid-cols-3">
        {table.getRowModel().rows.map((row, idx: number) => {
          const status = row.getVisibleCells()[1].renderValue() as any;
          const propertyName = row.getVisibleCells()[2].renderValue() as any;
          const checkInAndOut = row.getVisibleCells()[3].renderValue() as any;
          const numberOfPeople = row.getVisibleCells()[4].renderValue() as any;
          const guestName = row.getVisibleCells()[5].renderValue() as any;
          const payment = row.getVisibleCells()[6].renderValue() as any;

          function handleChange(
            e: ChangeEvent<
              HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
            >
          ) {
            const { name, value } = e.target;
            setNewChatDetails((prevState) => ({ ...prevState, [name]: value }));
          }

          function createNewTicket(bookingId: string) {
            return (e: FormEvent) => {
              e.preventDefault();
              ticket.mutate({
                senderId: id,
                userId: id,
                message: newChat.message,
                hostId: row.original.hostId,
                title: newChat.title,
                bookingId: bookingId,
              });
            };
          }

          const isCompleted = (status as BookingStatus) === "completed";

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
                                  "Are you sure you want this delete this booking?"
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
                      {isCompleted ? (
                        <Link
                          href={`/dashboard/bookings/reviews/${row.original.id}`}
                          prefetch
                        >
                          <DropdownMenuItem className="cursor-pointer flex items-center space-x-2">
                            <Star color="black" size={17} />
                            <span>leave a review</span>
                          </DropdownMenuItem>
                        </Link>
                      ) : null}
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
                  <span className="font-semibold text-xl">₦</span>
                  <span className="text-xl font-semibold">
                    {(payment as number).toLocaleString()}
                  </span>
                </div>
                <div className="w-full flex items-center space-x-3">
                  <Dialog>
                    <DialogTrigger className="py-3 px-3 cursor-pointer bg-black text-white rounded-md flex items-center space-x-2 ">
                      <Mail size={17} /> <span>Message host</span>
                    </DialogTrigger>
                    <DialogContent className="md:w-[400px]">
                      <div className="w-full flex justify-between z-[99999999]">
                        <DialogHeader className="w-auto flex flex-col">
                          <DialogTitle className="text-left p-0 m-0">
                            New Chat
                          </DialogTitle>
                          <DialogDescription>
                            Adds a new Ticket
                          </DialogDescription>
                        </DialogHeader>
                        <DialogClose className="w-auto">
                          <X />
                        </DialogClose>
                      </div>
                      <form
                        className="w-full space-y-3"
                        onSubmit={createNewTicket(row.original.id)}
                      >
                        <div className="w-full flex flex-col">
                          <label htmlFor="title">
                            What do you want to talk about ?
                          </label>
                          <input
                            id="title"
                            name="title"
                            placeholder="Enter title here..."
                            onChange={handleChange}
                            value={newChat.title}
                            className="w-full py-3 px-2 my-3 outline-none border-b border-b-secondary placeholder:text-gray-400 text-[16px]"
                          />
                        </div>
                        <div className="w-full flex flex-col">
                          <textarea
                            value={newChat.message}
                            onChange={handleChange}
                            name="message"
                            className="w-full py-3 px-2 my-3 outline-none border-b border-b-secondary placeholder:text-gray-400"
                            placeholder="type message..."
                          />
                        </div>
                        <button className="w-full p-2 rounded-full flex space-x-2 items-center justify-center outline-none bg-black text-white">
                          {ticket.isPending ? (
                            <Spinner color="red" size={20} />
                          ) : (
                            <>
                              <span>Send message</span>
                              <ArrowRight />
                            </>
                          )}
                        </button>
                      </form>
                    </DialogContent>
                  </Dialog>
                  {row.original.holdingWindow ? (
                    <Dialog>
                      <DialogTrigger asChild>
                        <div className="text-center w-[150px] py-3 px-3 cursor-pointer bg-primary text-white rounded-md flex items-center justify-center space-x-2 ">
                          <span>Pay now</span>
                        </div>
                      </DialogTrigger>
                      <DialogContent
                        id="host-booking-receipt"
                        className="w-auto bg-primary"
                      >
                        <QrCodeView
                          cryptoPaymentAddress={
                            row.original.cryptoPaymentAddress as string
                          }
                          cryptoPaymentAmount={
                            row.original.cryptoPaymentAmount as number
                          }
                          holdingWindow={new Date(row.original.holdingWindow)}
                        />
                      </DialogContent>
                    </Dialog>
                  ) : null}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="hidden lg:flex items-center py-4">
        <div className="w-full md:w-1/4 h-[40px] flex items-center justify-center py-4 border rounded-md border-gray-400">
          <input
            placeholder="Search bookings"
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
              <SlidersHorizontal color="white" className=" h-4 w-4" />
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
      {/* <BookingIcon size={50} color="gray" /> */}
      <p className="text-lg font-[600]">No bookings yet</p>
      <button
        onClick={() => {
          const today = new Date();
          const dayAfterTomorrow = new Date(Date.now() + 86400000 * 2);
          router.push(
            `/properties?city=abuja&adults=${1}&children=${1}&infants=${1}&check-in=${today.toISOString()}&check-out=${dayAfterTomorrow.toISOString()}`
          );
        }}
        className="py-3 px-7 bg-primary text-white font-semibold rounded-full"
      >
        Go to Search
      </button>
      <p>You don't have any bookings yet. It's time to start</p>
      <Image
        src="/assets/icons/empty-bookings.svg"
        width={150}
        height={150}
        alt="bookings_logo"
        priority
      />
    </div>
  );
};
