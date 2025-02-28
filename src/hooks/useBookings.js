import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllBookings,
  getBooking,
  updateBooking,
  deleteBooking,
} from "../services/apiBookings";
import toast from "react-hot-toast";
import { useSearchParams } from "react-router-dom";

export function useBookings() {
  const [searchParams] = useSearchParams();

  // Get filter and sort parameters from URL
  const filterStatus = searchParams.get("status") || "all";
  const sortValue = searchParams.get("sortBy") || "startDate-asc";
  const [sortField, sortDirection] = sortValue.split("-");
  const queryClient = useQueryClient();

  // Fetch all bookings
  const {
    isLoading,
    data: bookings,
    error,
  } = useQuery({
    queryKey: ["bookings", filterStatus, sortField, sortDirection], // Dynamic query key
    queryFn: () => getAllBookings(filterStatus, sortField, sortDirection),
  });

  // Fetch a single booking (remains unchanged, but ensure queryKey matches if used dynamically)
  const {
    isLoading: isBookingLoading,
    data: booking,
    error: bookingError,
  } = useQuery({
    queryKey: ["bookings"],
    queryFn: getBooking,
    enabled: false, // This query will only run when explicitly enabled
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
  };
}
