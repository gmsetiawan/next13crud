import { addNewProduct, deleteProduct } from "@/actions/serverAction";
import AddProductButton from "@/components/AddProductButton";
import { Product } from "@/typings";
import Link from "next/link";
import React from "react";

export default async function ProductPage(product: Product) {
  const res = await fetch(
    "https://64ad3d34b470006a5ec596e5.mockapi.io/products",
    {
      cache: "no-cache",
      next: {
        tags: ["products"],
      },
    }
  );

  const products: Product[] = await res.json();

  return (
    <div className="relative max-w-2xl mx-auto py-10">
      <div className="flex flex-col gap-2 p-2 lg:p-0">
        <h1 className="text-center text-xl font-semibold">Product Page</h1>

        <AddProductButton />

        <form action={addNewProduct}>
          <div className="flex flex-col gap-2">
            <div>
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="product"
                placeholder="Enter product name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="price"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Price
              </label>
              <input
                type="number"
                id="price"
                name="price"
                placeholder="Enter product price"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>

            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Save
            </button>
          </div>
        </form>

        <h1 className="text-center text-xl font-semibold">Product List</h1>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <div key={product.id} className="p-2 border rounded text-sm">
              <p>{product.product}</p>
              <p>{product.price}</p>
              <div className="flex justify-between items-center">
                <form>
                  <button
                    formAction={async () => {
                      "use server";
                      await deleteProduct(product);
                    }}
                    className="text-xs text-red-400 hover:cursor-pointer hover:text-red-300"
                  >
                    Delete
                  </button>
                </form>
                <Link
                  href={`products/${product.id}`}
                  className="text-xs text-green-400 hover:cursor-pointer hover:text-green-300"
                >
                  Edit
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
