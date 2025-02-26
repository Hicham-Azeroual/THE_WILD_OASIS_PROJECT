import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useSettings } from "./useSettings";

function UpdateSettingsForm() {
  const {
    settings: {
      minBookingLength, // Fixed typo: minBookingLenght -> minBookingLength
      maxBookingLength, // Fixed typo: maxBookinLenght -> maxBookingLength
      maxGuestsPerBooking,
      breakfastPrice,
    } = {}, // Default to empty object to avoid destructuring undefined
    isLoadingSettings,
    updateSetting,
    isUpdating,
  } = useSettings();

  // Handle update when input loses focus
  function handleUpdate(e) {
    const { name, value } = e.target;
    if (name && value !== "") {
      // Ensure name and value are valid
      updateSetting({ [name]: Number(value) }); // Pass as object to match API expectation
    }
  }

  // Show a loading state while settings are being fetched
  if (isLoadingSettings) {
    return <div>Loading settings...</div>;
  }

  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="min-nights"
          name="minBookingLength" // Added name prop
          defaultValue={minBookingLength}
          onBlur={handleUpdate} // Trigger update on blur
          disabled={isUpdating} // Disable while updating
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="max-nights"
          name="maxBookingLength" // Added name prop
          defaultValue={maxBookingLength}
          onBlur={handleUpdate} // Trigger update on blur
          disabled={isUpdating} // Disable while updating
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="max-guests"
          name="maxGuestsPerBooking" // Added name prop
          defaultValue={maxGuestsPerBooking}
          onBlur={handleUpdate} // Trigger update on blur
          disabled={isUpdating} // Disable while updating
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfast-price"
          name="breakfastPrice" // Added name prop
          defaultValue={breakfastPrice}
          onBlur={handleUpdate} // Trigger update on blur
          disabled={isUpdating} // Disable while updating
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
