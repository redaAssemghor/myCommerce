import PriceTag from "@/components/PriceTag";
import { prisma } from "@/lib/db/prisma";
import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { cache } from "react";
import AddToCartButton from "./AddToCartButton";
import { incrementProductQuantity } from "./actions";
import { getProduct } from "./getProduct";

interface ProductPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({
  params: { id },
}: ProductPageProps): Promise<Metadata> {
  const product = await getProduct(id);

  return {
    title: product.name + " - MyShopee",
    description: product.description,
    openGraph: {
      images: [{ url: product.imageUrl }],
    },
  };
}

export default async function ProductPage({
  params: { id },
}: ProductPageProps) {
  const product = await getProduct(id);
  const imageUrlArray = product.imageUrl.split(",");

  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center relative">
      <div className="flex flex-col gap-4">
        {imageUrlArray[1] && (
          <Image
            src={imageUrlArray[1]}
            alt={product.name}
            width={500}
            height={400}
            className="z-10 rounded-lg max-w-36 hover:max-w-full hover:min-w-96 hover:absolute hover:top-0"
          />
        )}
        {imageUrlArray[2] && (
          <Image
            src={imageUrlArray[2]}
            alt={product.name}
            width={500}
            height={400}
            className="rounded-lg max-w-36 hover:max-w-full hover:min-w-96 z-10 hover:absolute top-0"
          />
        )}
      </div>
      <Image
        src={imageUrlArray[0]}
        alt={product.name}
        width={500}
        height={400}
        className="rounded-lg z-0"
      />
      <div>
        <h1 className="text-5xl font-bold">{product.name}</h1>
        <PriceTag price={product.price} className="mt-4" />
        <p className="py-6">{product.description}</p>
        <AddToCartButton
          productId={product.id}
          incrementProductQuantity={incrementProductQuantity}
        />
      </div>
    </div>
  );
}
