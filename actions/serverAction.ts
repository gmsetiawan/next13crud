"use server";

import { Product } from "@/typings";
import { revalidateTag } from "next/cache";

export async function addNewProduct(e: FormData) {
  const product = e.get("product")?.toString();
  const price = e.get("price")?.toString();

  if (!product || !price) return;

  const newProduct: Product = {
    product,
    price,
  };

  await fetch("https://64ad3d34b470006a5ec596e5.mockapi.io/products", {
    method: "POST",
    body: JSON.stringify(newProduct),
    headers: {
      "Content-Type": "application/json",
    },
  });

  revalidateTag("products");
}

export async function deleteProduct(product: Product) {
  const res = await fetch(
    `https://64ad3d34b470006a5ec596e5.mockapi.io/products/${product.id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: product.id,
      }),
    }
  );

  revalidateTag("products");
}

export async function updateProduct(product: Product) {
  const res = await fetch(
    `https://64ad3d34b470006a5ec596e5.mockapi.io/products/${product.id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...product,
      }),
    }
  );

  revalidateTag("products");
}
