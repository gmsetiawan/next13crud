"use client";

import { addNewProduct } from "@/actions/serverAction";
import { useTransition } from "react";

function AddProductButton() {
  const [isPending, startTransition] = useTransition();

  const formData = new FormData();
  formData.append("product", "Nokia 9000");
  formData.append("price", "499");

  return (
    <button
      onClick={() => startTransition(() => addNewProduct(formData))}
      className="fixed bottom-4 right-4 p-2 bg-gray-400 hover:bg-gray-600 rounded text-sm text-gray-200"
    >
      {isPending ? "Adding..." : "Add Nokia"}
    </button>
  );
}

export default AddProductButton;
