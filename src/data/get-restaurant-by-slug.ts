import { db } from "@/lib/prisma";

export const getRestaurantSlug = async (slug: string) => {
  const restaurant = await db.restaurant.findUnique({ where: { slug } });
  return restaurant;
};
