"use server";

import { getCurrentUser } from "../auth";
import { prisma } from "../prisma";
import {z} from "zod";  
import { redirect } from "next/navigation";

// Define schema using conventional camelCase for object fields
const ProductSchema = z.object({    
    name: z.string().min(1, "Product name is required."),
    quantity: z.number().min(0, "Quantity cannot be negative."),
    price: z.number().min(0, "Price cannot be negative."),
    sku: z.string().nullable().optional(), // SKU should be nullable if optional
    lowStockAt: z.number().min(0, "Low stock threshold cannot be negative.").optional(),
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
export async function createProduct(formData: FormData): Promise<{ success: boolean; message: string }> {
  const user = await getCurrentUser();
  if (!user) {
    return { success: false, message: "Authentication failed. Please log in again." };
  }

  // Parse data ensuring correct type conversions
  const dataToParse = {
    name: formData.get("name"),
    quantity: Number(formData.get("quantity")),
    price: Number(formData.get("price")),
    sku: formData.get("sku") || null,
    // Use the corrected camelCase name here: 'lowStockAt'
    lowStockAt: formData.get("lowStockAt") ? Number(formData.get("lowStockAt")) : undefined,
  };

  const parseResult = ProductSchema.safeParse(dataToParse);

  if (!parseResult.success) {
    // If validation fails, extract the first error message to return to the user
    const firstIssue = parseResult.error.issues[0];
    return { 
        success: false, 
        message: `${String(firstIssue.path[0])}: ${firstIssue.message}` 
    };
  }

  try {
    await prisma.product.create({
      data: { ...parseResult.data, userId: user.id },
    });
  } catch (error) {
    console.error("Product creation failed:", error);
    return { success: false, message: "Failed to create product due to a database error." };
  }

  // Redirect on successful creation
  redirect("/inventory?status=success&message=Product created successfully!");
}