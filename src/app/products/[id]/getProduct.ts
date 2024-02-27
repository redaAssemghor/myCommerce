import { prisma } from "@/lib/db/prisma";
import { notFound } from "next/navigation";
import { cache } from "react";

interface ProductPageProps {
  params: {
    id: string;
  };
}

export const getProduct = cache(async (id: string) => {
  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) notFound();
  return product;
});
