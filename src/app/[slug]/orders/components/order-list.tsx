import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { OrderStatus, Prisma } from "@prisma/client";
import { ChevronLeftIcon, ScrollTextIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { formatCurrency } from "@/helpers/formart-currency";
import { Separator } from "@/components/ui/separator";

interface OrderListProps {
  orders: Array<
    Prisma.OrderGetPayload<{
      include: {
        restaurant: {
          select: {
            name: true;
            avatarImageUrl: true;
          };
        };
        orderProducts: {
          include: {
            product: true;
          };
        };
      };
    }>
  >;
}

const getStatusLabel = (status: OrderStatus) => {
  if (status === "FINISHED") return "Finalizado";
  if (status === "IN_PREPARATION") return "Em Preparo";
  if (status === "PENDING") return "Pendente";
  if (status === "PAYMENT_CONFIRMED") return "Pagamento Confirmado";
  if (status === "PAYMENT_FAILED") return "Pagamento Falhou";
  return "";
};

const OrderList = ({ orders }: OrderListProps) => {
  const router = useRouter();
  const handleBackClick = () => router.back();
  return (
    <div className="space-y-6 p-6">
      <Button size="icon" variant="secondary" onClick={handleBackClick}>
        <ChevronLeftIcon />
      </Button>
      <div className="flex items-center gap-3">
        <ScrollTextIcon />
        <h2 className="text-lg font-semibold">Meus Pedidos</h2>
      </div>
      {orders.map((order) => (
        <Card key={order.id}>
          <CardContent className="space-y-4 p-5">
            <div
              className={`w-fit rounded-full px-2 py-1 text-xs font-semibold text-white ${
                (
                  [
                    OrderStatus.PAYMENT_CONFIRMED,
                    OrderStatus.FINISHED,
                  ] as OrderStatus[]
                ).includes(order.status)
                  ? "bg-green-500 text-white"
                  : "bg-gray-200 text-gray-500"
              }`}
            >
              {getStatusLabel(order.status)}
            </div>
            <div className="flex items-center gap-2">
              <div className="relative h-5 w-5">
                <Image
                  src={order.restaurant.avatarImageUrl}
                  alt={order.restaurant.name}
                  className="roudend-sm"
                  fill
                />
                <p className="text-sm font-semibold">{order.restaurant.name}</p>
              </div>
              <Separator />
              <div className="space-y-2">
                {order.orderProducts.map((orderProduct) => (
                  <div
                    key={orderProduct.id}
                    className="flex items-center gap-2"
                  >
                    <div className="flex h-5 items-center justify-center rounded-full bg-gray-400 text-xs font-semibold text-white">
                      {orderProduct.quantity}
                    </div>
                    <p className="text-sm">{orderProduct.product.name}</p>
                  </div>
                ))}
              </div>
            </div>
            <Separator />
            <p className="text-sm font-medium">{formatCurrency(order.total)}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default OrderList;
