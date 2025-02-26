import supabase from "./supabase";

// Function to upload a file to Supabase Storage and return the public URL
export async function uploadImageToStorage(file) {
  const fileName = `${Date.now()}-${file.name}`.replace("/", ""); // Ensure no slashes in the filename
  const { error: uploadError } = await supabase.storage
    .from("cabin-images") // Replace with your bucket name
    .upload(fileName, file);

  if (uploadError) {
    console.error("Image upload failed", uploadError);
    throw new Error("Image upload failed");
  }

  const { data: urlData } = supabase.storage
    .from("cabin-images")
    .getPublicUrl(fileName);

  return urlData.publicUrl;
}

export async function getCabins() {
  let { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.log("Cabins not be loaded", error);
    throw new Error(error);
  }
  return data;
}

export async function getCabin(id) {
  let { data, error } = await supabase
    .from("cabins")
    .select("*")
    .eq("id", id);

  if (error) {
    console.log("Cabin not be loaded", error);
    throw new Error(error);
  }
  return data[0];
}

export async function deleteCabin(id) {
  let { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.log("Cabin not be deleted", error);
    throw new Error(error);
  }
  return data;
}

export async function createCabin(cabin) {
  // Check if cabin.image is a file
  if (cabin.image instanceof File) {
    const imageUrl = await uploadImageToStorage(cabin.image);
    cabin.image = imageUrl;
  }

  const { data, error } = await supabase
    .from("cabins")
    .insert([{ ...cabin }])
    .select(); // Use .select() to return the inserted record

  if (error) {
    console.error("Cabin could not be created", error);
    throw new Error(error);
  }

  return data;
}

export async function updateCabin(cabin) {
  // Check if cabin.image is a file
  if (cabin.image instanceof File) {
    const imageUrl = await uploadImageToStorage(cabin.image);
    cabin.image = imageUrl;
  }

  const { data, error } = await supabase
    .from("cabins")
    .update(cabin)
    .eq("id", cabin.id)
    .select();

  if (error) {
    console.error("Cabin could not be updated", error);
    throw new Error(error);
  }

  return data;
}