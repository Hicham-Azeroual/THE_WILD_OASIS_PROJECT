import styled from "styled-components";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useCabins } from "../../hooks/useCabins";


const FormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;
  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  } 

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

function CreateCabinForm({ cabinToEdit = {} ,onClose}) {
  const { id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId);
  const { mutateCabin, isMutating } = useCabins();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });

  const regularPrice = watch("regularPrice");

  function onSubmit(data) {
    const formData = { ...data, image: data.image[0] };
    if (isEditSession) {
      formData.id = editId;
    }
    mutateCabin(formData);
    onClose?.()
    reset();
  }

  function onError(errors) {
    console.log(errors);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)} type={onClose?'modal':'regular'}>
      <FormRow>
        <Label htmlFor="name">Cabin name</Label>
        <Input
          type="text"
          id="name"
          {...register("name", { required: "Cabin name is required" })}
        />
        {errors.name && <Error>{errors.name.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="maxCapacity">Maximum capacity</Label>
        <Input
          type="number"
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "Maximum capacity is required",
            min: { value: 1, message: "Minimum capacity is 1" },
          })}
        />
        {errors.maxCapacity && <Error>{errors.maxCapacity.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="regularPrice">Regular price</Label>
        <Input
          type="number"
          id="regularPrice"
          {...register("regularPrice", {
            required: "Regular price is required",
            min: { value: 1, message: "Minimum price is 1" },
          })}
        />
        {errors.regularPrice && <Error>{errors.regularPrice.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="discount">Discount</Label>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          {...register("discount", {
            required: "Discount is required",
            validate: (value) =>
              (value >= 0 && value <= regularPrice) ||
              "Discount must be between 0 and regular price",
          })}
        />
        {errors.discount && <Error>{errors.discount.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="description">Description for website</Label>
        <Textarea
          type="text"
          id="description"
          defaultValue=""
          {...register("description", {
            required: "Description is required",
          })}
        />
        {errors.description && <Error>{errors.description.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="image">Cabin photo</Label>
        <FileInput
          id="image"
          type="file"
          accept="image/*"
          {...register("image", {
            required: isEditSession ? false : "Cabin photo is required",
          })}
        />
        {errors.image && <Error>{errors.image.message}</Error>}
      </FormRow>

      <FormRow>
        <Button variation="secondary" type="reset" onClick={()=>onClose?.()}>
          Cancel
        </Button>
        <Button variation="primary" disabled={isMutating}>
          {isMutating ? "Saving..." : isEditSession ? "Update cabin" : "Add cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;