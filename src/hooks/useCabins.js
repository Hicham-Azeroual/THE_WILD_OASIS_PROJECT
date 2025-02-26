import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getCabins, createCabin, updateCabin, deleteCabin } from "../services/apiCabins";
import toast from "react-hot-toast";

export function useCabins() {
  const queryClient = useQueryClient();

  // Fetch cabins
  const {
    isLoading,
    data: cabins,
    error,
  } = useQuery({
    queryKey: ["cabin"],
    queryFn: getCabins,
  });

  // Create or update cabin
  const { mutate: mutateCabin, isLoading: isMutating } = useMutation({
    mutationFn: (data) => data.id ? updateCabin(data) : createCabin(data),
    onSuccess: (data) => {
      toast.success(data.id ? "Cabin updated successfully" : "Cabin created successfully");
      queryClient.invalidateQueries({
        queryKey: ["cabin"],
      });
    },
    onError: (error,data) => {
      toast.error(error.message || (data.id ? "An error occurred while updating the cabin" : "An error occurred while creating the cabin"));
    },
  });

  // Delete cabin
  const { mutate: deleteCabinMutation, isLoading: isDeleting } = useMutation({
    mutationFn: deleteCabin,
    onSuccess: () => {
      toast.success("Cabin Deleted Successfully");
      queryClient.invalidateQueries({
        queryKey: ["cabin"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return {
    isLoading,
    cabins,
    error,
    mutateCabin,
    isMutating,
    deleteCabin: deleteCabinMutation,
    isDeleting,
  };
}