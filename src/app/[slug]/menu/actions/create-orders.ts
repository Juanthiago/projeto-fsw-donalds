"use serve";

import { ConsumptionMethod } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/prisma";

import { removeCpfPunctuation } from "../helpers/cpf";

interface CreateOrdersInput {
  customerName: string;
  customerCpf: string;
  product: Array<{
    id: string;
    quantity: number;
  }>;
  consumptionMethod: ConsumptionMethod;
  slug: string;
}

export const createOrder = async (input: CreateOrdersInput) => {
  const restaurant = await db.restaurant.findUnique({
    where: {
      slug: input.slug,
    },
  });
  if (!restaurant) {
    throw new Error("Restaurant not Found");
  }
  const productWithPrices = await db.product.findMany({
    where: {
      id: {
        in: input.product.map((product) => product.id),
      },
    },
  });
  const productWithPricesAndQuatities = input.product.map((product) => ({
    productId: product.id,
    quantity: product.quantity,
    price: productWithPrices.find((p) => p.id === product.id)!.price,
  }));
  const order = await db.order.create({
    data: {
      status: "PENDING",
      customerName: input.customerName,
      customerCpf: removeCpfPunctuation(input.customerCpf),
      orderProducts: {
        createMany: {
          data: productWithPricesAndQuatities,
        },
      },
      total: productWithPricesAndQuatities.reduce(
        (acc, product) => acc + product.price * product.quantity,
        0
      ),
      consumptionMethod: input.consumptionMethod,
      restaurantId: restaurant.id,
    },
  });
  revalidatePath(`/${input.slug}/orders`);
  return order;
};
