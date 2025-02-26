import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getSettings, updateSetting } from "../../services/apiSettings";
import toast from "react-hot-toast";

export function useSettings() {
  const queryClient = useQueryClient();

  // Fetch all settings
  const {
    data: settings,
    isLoading: isLoadingSettings,
    error: fetchError,
  } = useQuery({
    queryKey: ["settings"],
    
    queryFn: getSettings, // Correct: expects a promise-returning function
  });

  // Update a setting
  const {
    mutate: updateSettingMutation, // Renamed to avoid conflict
    isLoading: isUpdating,
    error: updateError,
  } = useMutation({
    mutationFn: updateSetting, // Refers to the imported API function
    onSuccess: () => {
      queryClient.invalidateQueries(["settings"]);
      toast.success("Setting updated successfully");
    },
    onError: (err) => {
      toast.error("Failed to update setting: " + err.message);
    },
  });

  return {
    settings,
    isLoadingSettings,
    fetchError,
    updateSetting: updateSettingMutation, // Exposed as updateSetting for consumers
    isUpdating,
    updateError,
  };
}