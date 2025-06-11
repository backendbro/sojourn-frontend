"use client";

import HorizontalDotsIcon from "@/components/svgs/HorizontalDotsIcon";
import {
  ArrowBigRight,
  ArrowRight,
  ChevronDownIcon,
  Copy,
  Eye,
  MessageCircle,
  Pencil,
  Plane,
  Plus,
  Search,
  X,
} from "lucide-react";
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
import {
  createTicket,
  getBookingsByUserId,
  getMessagesByGuestId,
  getMessagesByHostId,
} from "@/http/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import TableLoader from "@/components/ui/table-loader";
import { Skeleton } from "@/components/ui/skeleton";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ChangeEvent, FormEvent, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { DialogClose } from "@radix-ui/react-dialog";
import useQueryString from "@/hooks/useQueryString";
import Image from "next/image";
import MessageViewer from "./message-viewer";
import hdate from "human-date";
import PropertiesIcon from "@/components/svgs/PropertiesIcon";
import BookingIcon from "@/components/svgs/BookingIcon";
import Spinner from "@/components/svgs/Spinner";

export type Messages = {
  id: string;
  title: string;
  hostFirstName: string;
  hostLastName: string;
  unread: number;
  date: string;
  time: string;
  userPhoto: string;
  hostPhoto: string;
};

export const columns: ColumnDef<Messages>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
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
          Title
          <ChevronDownIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <Tooltip>
        <TooltipTrigger>
          <div className="max-w-[100px] truncate">{row.getValue("title")}</div>
        </TooltipTrigger>
        <TooltipContent className="max-w-[300px] p-2 z-[999999]">
          {row.getValue("description")}
        </TooltipContent>
      </Tooltip>
    ),
  },
  {
    accessorKey: "hostFirstName",
    header: () => <div>First Name</div>,
    cell: ({ row }) => {
      return <div className="capitalize">{row.getValue("hostFirstName")}</div>;
    },
  },
  {
    accessorKey: "hostLastName",
    header: () => <div>Last Name</div>,
    cell: ({ row }) => {
      return <div className="capitalize">{row.getValue("hostLastName")}</div>;
    },
  },

  {
    accessorKey: "unread",
    header: () => <div>amount</div>,
    cell: ({ row }) => {
      return <div className="capitalize">₦{row.getValue("unread")}</div>;
    },
  },

  {
    accessorKey: "date",
    header: () => <div>Transaction fee</div>,
    cell: ({ row }) => {
      return <div className="capitalize">₦{row.getValue("date")}</div>;
    },
  },
  {
    accessorKey: "time",
    header: () => <div>Payment type</div>,
    cell: ({ row }) => {
      return <div className="capitalize">{row.getValue("time")}</div>;
    },
  },
];

export default () => {
  const id = useSelector((state: RootState) => state.user.me?.user?.id);

  const client = useQueryClient();

  const { router } = useQueryString();

  const { data, isLoading, error } = useQuery({
    queryKey: ["messages-user"],
    queryFn: () => getMessagesByGuestId(id),
    refetchOnReconnect: true,
    refetchIntervalInBackground: true,
  });

  const {
    data: bookingsData,
    isLoading: isLoadingBookings,
    error: isBookingError,
  } = useQuery({
    queryKey: ["get-bookings"],
    queryFn: () => getBookingsByUserId(id),
    refetchOnReconnect: true,
    refetchIntervalInBackground: true,
  });

  const mutation = useMutation({
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

  const [currentTicket, setCurrentTicket] = useState<string>("");

  const [newChat, setNewChatDetails] = useState({
    title: "",
    message: "",
    hostId: "",
    bookingId: "",
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

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    if (name === "bookingId") {
      const booking = data[0].bookings.find(
        (b: { id: string }) => b.id === value
      );
      setNewChatDetails((prevState) => ({
        ...prevState,
        [name]: value,
        hostId: booking.property.hostId,
      }));
    } else {
      setNewChatDetails((prevState) => ({ ...prevState, [name]: value }));
    }
  }

  function createNewTicket(e: FormEvent) {
    e.preventDefault();
    mutation.mutate({
      senderId: id,
      userId: id,
      message: newChat.message,
      hostId: newChat.hostId,
      title: newChat.title,
      bookingId: newChat.bookingId,
    });
  }

  if (error) {
    toast("Error getting messages", {
      position: "bottom-left",
    });
  }

  if (isLoading || isLoadingBookings) {
    return (
      <div className="w-full mt-4">
        <div className="w-full md:w-1/3 mt-4">
          <Skeleton className="h-8 w-full bg-gray-200 mt-2" />
          {[1, 2, 3, 4].map((_, idx: number) => (
            <TableLoader key={idx} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="w-full flex h-[80vh]  lg:h-[calc(100vh-70px)] 2xl:h-[calc(100vh-70px)]">
        <div
          className={`w-full md:w-[26%] flex flex-col h-full ${
            currentTicket ? "border-r border-r-gray-300" : ""
          }`}
        >
          <h3 className="text-3xl my-2">Inbox</h3>
          <div className="w-full flex items-center justify-between space-x-0 md:space-x-2 mb-[20px] pr-2">
            <div className="w-4/6 h-[40px] flex items-center justify-center py-4 border rounded-md border-gray-400">
              <input
                placeholder="Search by title"
                value={
                  (table.getColumn("title")?.getFilterValue() as string) ?? ""
                }
                onChange={(event) =>
                  table.getColumn("title")?.setFilterValue(event.target.value)
                }
                className="w-2/3 placeholder:text-gray-400 outline-none border-0 bg-transparent pr-1 text-[16px]"
              />
              <Search color="#aaa" size={20} />
            </div>
            <Dialog>
              <DialogTrigger className="flex bg-primary items-center py-3 px-4 rounded-md space-x-1 bg-gray-100 ease duration-300 hover:shadow-lg">
                <Pencil size={15} color="white" />
              </DialogTrigger>
              <DialogContent className="md:w-[400px]">
                <div className="w-full flex justify-between">
                  <h4 className="text-sm font-semibold">New Chat</h4>
                </div>
                <form className="w-full space-y-3" onSubmit={createNewTicket}>
                  <div className="w-full flex flex-col">
                    <label htmlFor="title">
                      What do you want to talk about ?
                    </label>
                    <input
                      id="title"
                      name="title"
                      onChange={handleChange}
                      value={newChat.title}
                      className="w-full py-3 px-2 my-3 outline-none border-b border-b-secondary placeholder:text-gray-400 text-[16px]"
                    />
                  </div>
                  <div className="w-full flex flex-col">
                    <label htmlFor="booking">Select booking</label>
                    <select
                      onChange={handleChange}
                      id="booking"
                      name="bookingId"
                      className="w-full py-3 px-2 my-3 outline-none border-b border-b-secondary placeholder:text-gray-400"
                    >
                      <option selected>select</option>
                      {bookingsData.map(
                        (
                          d: { id: string; propertyTitle: string },
                          idx: number
                        ) => (
                          <option key={d.id} value={d.id}>
                            {d.propertyTitle}
                          </option>
                        )
                      )}
                    </select>
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
                    {mutation.isPending ? (
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
          </div>
          <div className="w-full flex flex-col h-full overflow-y-auto">
            {data?.length ? (
              table.getRowModel().rows.map((row, idx: number) => {
                const title = row.getVisibleCells()[1].renderValue() as any;
                const firstName = row.getVisibleCells()[2].renderValue() as any;
                const lastName = row.getVisibleCells()[3].renderValue() as any;
                const unread = row.getVisibleCells()[4].renderValue() as any;
                const date = row.getVisibleCells()[5].renderValue() as any;
                const time = row.getVisibleCells()[6].renderValue() as any;

                const photoUrl = data ? data[idx].hostPhoto : "";
                const photo = photoUrl;

                const activeChatCss =
                  currentTicket === row.original.id ? "bg-[#F7F7F7]" : "";

                return (
                  <>
                    <div
                      key={idx}
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrentTicket(row.original.id);
                      }}
                      className={`flex w-full cursor-pointer hidden md:flex space-y-2 p-3 border-b relative ${activeChatCss} hover:bg-[#F7F7F7]`}
                    >
                      <div className="w-[17%] h-[60px] flex items-center justify-center rounded-full">
                        <div className="flex w-[40px] h-[40px] items-center bg-gray-200 overflow-hidden relative flex items-center justify-center rounded-full">
                          {photo ? (
                            <Image
                              src={photo}
                              alt="person_placeholder"
                              fill
                              priority
                            />
                          ) : (
                            <Image
                              src={"/assets/icons/person-placeholder.png"}
                              alt="person_placeholder"
                              width={23}
                              height={23}
                            />
                          )}
                        </div>
                      </div>
                      {unread ? (
                        <div className="absolute top-10 right-2  py-1 px-2 uppercase rounded-full text-[10px] bg-red-600 text-white flex items-center space-x-[1px]">
                          <span className="font-bold font-inter">{unread}</span>
                        </div>
                      ) : null}
                      <div className="w-[83%] flex flex-col justify-start space-y-1 px-2">
                        <div className="flex items-center space-x-2 text-md capitalize font-semibold">
                          <p className="w-[110px] font-bold text-md truncate">
                            {firstName} {lastName}
                          </p>
                        </div>
                        <div className="text-md w-5/6 truncate font-semibold space-x-1">
                          {title}
                        </div>
                        <div className="w-full flex items-center">
                          <div className="w-full flex items-center justify-between">
                            {date ? (
                              <div className="absolute top-1/3 right-4 -translate-y-1/3  p-1 uppercase rounded-md text-[10px] flex items-center lowercase">
                                {hdate.relativeTime(date)}
                              </div>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      onClick={(e) => {
                        e.preventDefault();
                        router.push(`/dashboard/inbox/${row.original.id}`);
                      }}
                      className="flex w-full md:hidden flex space-y-2 p-3 min-h-[100px] relative border-b"
                    >
                      <div className="w-[17%] h-[60px] flex items-center justify-center">
                        <div className="flex w-[60px] h-[60px] items-center bg-gray-200 overflow-hidden relative flex items-center justify-center rounded-full">
                          {photo ? (
                            <Image
                              src={photo}
                              alt="person_placeholder"
                              fill
                              priority
                            />
                          ) : (
                            <Image
                              src={"/assets/icons/person-placeholder.png"}
                              alt="person_placeholder"
                              width={23}
                              height={23}
                            />
                          )}
                        </div>
                      </div>
                      {unread ? (
                        <div className="absolute top-10 right-2  py-1 px-2 uppercase rounded-full text-[10px] bg-red-600 text-white flex items-center space-x-[1px]">
                          <span className="font-bold font-inter">{unread}</span>
                        </div>
                      ) : null}
                      <div className="w-[83%] flex flex-col justify-start space-y-1 px-2">
                        <div className="w-full flex items-center space-x-2 text-md capitalize font-semibold">
                          <span className="font-bold text-md">{firstName}</span>
                          <span className="font-bold text-md">{lastName}</span>
                        </div>
                        <div className="flex items-center text-md w-5/6 truncate font-semibold space-x-1">
                          <span>{title}</span>
                        </div>
                        <div className="w-full flex items-center">
                          <div className="w-full flex items-center justify-between">
                            {date ? (
                              <div className="absolute top-1/3 right-4 -translate-y-1/3  p-1 uppercase rounded-md text-[10px] flex items-center lowercase">
                                {hdate.relativeTime(date)}
                              </div>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })
            ) : (
              <div>No messages at the moment</div>
            )}
          </div>
        </div>
        <div className="w-[74%] hidden h-full md:flex">
          {currentTicket ? (
            <MessageViewer id={currentTicket} />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center space-y-1">
              <MessageCircle size={40} color="gray" />
              <p className=" p-3 text-gray-400">Messages will appear here.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
