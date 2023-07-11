import { updateProduct } from "@/actions/serverAction";
import React from "react";

type Props = {
  params: {
    id: string;
  };
};

export default async function ProductEditPage({ params: { id } }: Props) {
  const res = await fetch(
    `https://64ad3d34b470006a5ec596e5.mockapi.io/products/${id}`
  );

  const product = await res.json();

  return (
    <div className="relative max-w-2xl mx-auto py-10">
      <div className="flex flex-col gap-2 p-2 lg:p-0">
        <h1 className="text-center text-xl font-semibold">
          Edit Product <span className="text-red-400">{product.product}</span>
        </h1>

        <form>
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
              formAction={async () => {
                "use server";
                await updateProduct(product);
              }}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
