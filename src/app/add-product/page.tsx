import { prisma } from "@/lib/db/prisma";
import { Metadata } from "next";
import { redirect } from "next/navigation";

import FormSubmitButton from "@/components/FormSubmitButton";

export const metadata: Metadata = {
  title: "Add Product - Myshop",
};

async function addProduct(formData: FormData) {
  "use server";

  const name = formData.get("name")?.toString();
  const description = formData.get("description")?.toString();
  const price = Number(formData.get("price") || 0);
  const [imageUrl1, imageUrl2, imageUrl3] = formData.getAll("imageUrl");

  if (
    !name ||
    !description ||
    !price ||
    [imageUrl1, imageUrl2, imageUrl3].length === 0
  ) {
    throw Error("Missing required fields");
  }

  const imageUrl = [imageUrl1, imageUrl2, imageUrl3].join(",");

  await prisma.product.create({
    data: { name, description, imageUrl, price },
  });

  redirect("/");
}

export default function AddProductPage() {
  return (
    <div>
      <h1 className="mb-3 text-lg font-bold">Add Product</h1>
      <form action={addProduct}>
        <input
          required
          name="name"
          placeholder="Name"
          className="input-bordered input mb-3 w-full"
        />
        <textarea
          required
          name="description"
          placeholder="Description"
          className="textarea-bordered textarea mb-3 w-full"
        />
        <input
          required
          name="imageUrl"
          placeholder="Image URL"
          type="url"
          className="input-bordered input mb-3 w-full"
        />
        <input
          required
          name="imageUrl"
          placeholder="Image URL"
          type="url"
          className="input-bordered input mb-3 w-full"
        />
        <input
          required
          name="imageUrl"
          placeholder="Image URL"
          type="url"
          className="input-bordered input mb-3 w-full"
        />
        {/* Add more input fields for additional image URLs if needed */}
        <input
          required
          name="price"
          placeholder="Price"
          type="number"
          className="input-bordered input mb-3 w-full"
        />
        <FormSubmitButton className="btn-primary btn-block">
          Add Product
        </FormSubmitButton>
      </form>
    </div>
  );
}
