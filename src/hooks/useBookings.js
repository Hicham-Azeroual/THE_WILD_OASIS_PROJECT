import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllBookings,
  getBooking,
  updateBooking,
  deleteBooking,
} from "../services/apiBookings";
import toast from "react-hot-toast";
import { useParams, useSearchParams } from "react-router-dom";

const itemsPerPage = 10;

export function useBookings() {
  const [searchParams] = useSearchParams();
const queryClient = useQueryClient();
  // Get filter and sort parameters from URL
  const filterStatus = searchParams.get("status") || "all";
  const sortValue = searchParams.get("sortBy") || "startDate-asc";
  const [sortField, sortDirection] = sortValue.split("-");
  const paginationPage = Number(searchParams.get("page")) || 1;
  const {bookinId}=useParams();
  

  // Fetch all bookings
  const { isLoading, data, error } = useQuery({
    queryKey: [
      "bookings",
      filterStatus,
      sortField,
      sortDirection,
      paginationPage,
    ],
    queryFn: () =>
      getAllBookings(
        filterStatus,
        sortField,
        sortDirection,
        paginationPage,
        itemsPerPage
      ),
  });
  // Destructure bookings and count from data
  const { data: bookings, count } = data || {};

  // Pre-fetch the next page of bookings when the user scrolls to the bottom of the current page
  const nextPage = paginationPage + 1;
  const hasNextPage = nextPage <= Math.ceil(count / itemsPerPage);

  if (hasNextPage) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filterStatus, sortField, sortDirection, nextPage],
      queryFn: () =>
        getAllBookings(
          filterStatus,
          sortField,
          sortDirection,
          nextPage,
          itemsPerPage
        ),
    });
  }

  // Fetch a single booking (remains unchanged, but ensure queryKey matches if used dynamically)
  const {
    isLoading: isBookingLoading,
    data: booking,
    error: bookingError,
  } = useQuery({
    queryKey: ["booking"],
    queryFn: () => getBooking(bookinId),
    enabled: false, // This query will only run when explicitly enabled
    retry:false  
});


  // Update a booking
  const { mutate: mutateBooking, isLoading: isUpdating } = useMutation({
    mutationFn: updateBooking,
    onSuccess: (data) => {
      toast.success("Booking updated successfully");
      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });
    },
    onError: (error) => {
      toast.error(
        error.message || "An error occurred while updating the booking"
      );
    },
  });

  // Delete a booking
  const { mutate: deleteBookingMutation, isLoading: isDeleting } = useMutation({
    mutationFn: deleteBooking,
    onSuccess: () => {
      toast.success("Booking deleted successfully");
      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });
    },
    onError: (error) => {
      toast.error(
        error.message || "An error occurred while deleting the booking"
      );
    },
  });

  return {
    isLoading,
    bookings,
    error,
    isBookingLoading,
    booking,
    bookingError,
    mutateBooking,
    isUpdating,
    deleteBooking: deleteBookingMutation,
    isDeleting,
    count,
  };
}
