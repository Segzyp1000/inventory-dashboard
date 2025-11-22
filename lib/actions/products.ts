"use server";

import { getCurrentUser } from "../auth";
import { prisma } from "../prisma";
import {z} from "zod";  
import { redirect } from "next/navigation";

// Define schema using conventional camelCase for object fields
const ProductSchema = z.object({
  name: z.string().min(1),
  quantity: z.number().min(0),
  price: z.number().min(0),
  sku: z.string().nullable().optional(),
  lowStockAt: z.number().min(0).optional()
});

/**
 * Deletes a single product identified by its ID.
 */
export async function deleteProduct(formData: FormData) {
  try {
    const user = await getCurrentUser();
    const id = formData.get("id") as string;

    if (!id) {
      console.error("Product ID not provided for deletion.");
      return;
    }

    await prisma.product.deleteMany({
      where: {
        id,
        userId: user.id, // Security: Ensure only the owner can delete
      },
    });
    console.log(`Successfully deleted product with ID: ${id}`);
    redirect("/inventory"); // Redirect to force UI refresh
  } catch (error) {
    console.error("Failed to delete product:", error);
    // Note: Deletion errors are often best handled by the client-side component 
    // or through an external toast/notification system.
  }
}


/**
 * Creates a new product from the submitted form data using Zod validation.
 */
export async function createProduct(formData: FormData) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const data = {
    name: formData.get("name"),
    quantity: Number(formData.get("quantity")),
    price: Number(formData.get("price")),
    sku: formData.get("sku") || null,
    lowStockAt: formData.get("lowStockAt")
      ? Number(formData.get("lowStockAt"))
      : undefined,
  };

  const parsed = ProductSchema.safeParse(data);
  if (!parsed.success) {
    console.log(parsed.error);
    return;
  }

  await prisma.product.create({
    data: {
      ...parsed.data,
      userId: user.id,
    }
  });

  redirect("/inventory");
}