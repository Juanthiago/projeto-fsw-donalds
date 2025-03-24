import { db } from "@/lib/prisma";
import { isValidCpf } from "../menu/helpers/cpf";
import CpfForm from "./components/cpf-form";
import OrderList from "./components/order-list";

interface OrderPageProps {
  searchParams: Promise<{ cpf: string }>;
}

const OrderPage = async ({ searchParams }: OrderPageProps) => {
  const { cpf } = await searchParams;
  if (!cpf) {
    return <CpfForm />;
  }
  if (!isValidCpf(cpf)) {
    return <CpfForm />;
  }
  const orders = await db.order.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      restaurant: {
        select: {
          name: true,
          avatarImageUrl: true,
        },
      },
      orderProducts: {
        include: {
          product: true,
        },
      },
    },
  });
  return <OrderList orders={orders} />;
};

export default OrderPage;
