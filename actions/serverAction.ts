"use server";

import { Product } from "@/typings";
import { revalidateTag } from "next/cache";

export const addNewProduct = async (e: FormData) => {
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
};
