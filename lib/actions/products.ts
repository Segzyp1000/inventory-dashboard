"use server";

import { getCurrentUser } from "../auth";
import { prisma } from "../prisma";
import { z } from "zod";
import { redirect } from "next/navigation";

// Zod validation schema
const ProductSchema = z.object({
  name: z.string().min(1),
  quantity: z.number().min(0),
  price: z.number().min(0),
  sku: z.string().nullable().optional(),
  lowStockAt: z.number().min(0).optional(),
});

// ----------------------------
// CREATE PRODUCT
// ----------------------------
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
    },
  });

  redirect("/inventory");
}

// ----------------------------
// DELETE PRODUCT
// ----------------------------
export async function deleteProduct(formData: FormData) {
  const user = await getCurrentUser();
  const id = formData.get("id") as string;

  if (!id) return;

  await prisma.product.deleteMany({
    where: { id, userId: user.id },
  });

  redirect("/inventory");
}