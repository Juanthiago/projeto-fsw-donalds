import { notFound } from "next/navigation";
import ProductHeader from "./components/product-header";
import ProductDetails from "./components/product-details";
import { db } from "@/lib/prisma";

interface ProductPageProps {
  params: Promise<{ slug: string; productid: string }>;
}

const ProductPage = async ({ params }: ProductPageProps) => {
  const { slug, productid } = await params;
  const product = await db.product.findUnique({
    where: { id: String(productid) },
    include: {
      restaurant: {
        select: {
          name: true,
          avatarImageUrl: true,
          slug: true,
        },
      },
    },
  });
  if (!product) {
    return notFound();
  }
  if (product.restaurant.slug.toUpperCase() !== slug.toUpperCase()) {
    return notFound();
  }
  return (
    <div className="flex h-full flex-col">
      <ProductHeader product={product} />
      <ProductDetails product={product} />
    </div>
  );
};
export default ProductPage;
