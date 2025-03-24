"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { isValidCpf } from "../helpers/cpf";
import { z } from "zod";
import { useParams, useSearchParams } from "next/navigation";
import { useContext, useState } from "react";
import { CartContext } from "../contexts/cart";
import { useForm } from "react-hook-form";
import { ConsumptionMethod } from "@prisma/client";
import { createOrder } from "../actions/create-orders";
import { createStripeCheckout } from "../actions/create-stripe-checkout"; // Corrigido o nome da função
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Loader2Icon } from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";
import { PatternFormat } from "react-number-format";
import { Input } from "@/components/ui/input";

const formschema = z.object({
  name: z.string().trim().min(1, {
    message: "Nome é obrigatório",
  }),
  cpf: z
    .string()
    .trim()
    .min(1, {
      message: "O CPF é obrigatório",
    })
    .refine((value) => isValidCpf(value), {
      message: "CPF inválido",
    }),
});

type FormSchema = z.infer<typeof formschema>;

interface FinishOrderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const FinishOrderDialog = ({ open, onOpenChange }: FinishOrderDialogProps) => {
  const { slug } = useParams<{ slug: string }>();
  const { products } = useContext(CartContext);
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormSchema>({
    resolver: zodResolver(formschema),
    defaultValues: {
      name: "",
      cpf: "",
    },
    shouldUnregister: true,
  });

  const onSubmit = async (data: FormSchema) => {
    try {
      setIsLoading(true);
      const consumptionMethod = searchParams.get(
        "consumptionMethod"
      ) as ConsumptionMethod;

      const order = await createOrder({
        consumptionMethod,
        customerCpf: data.cpf,
        customerName: data.name,
        products,
        slug,
      });
      const { sessionId } = await createStripeCheckout({
        products,
        orderId: order.id,
        slug,
        consumptionMethod,
        cpf: data.cpf,
      });
      if (!process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY) return;
      const stripe = await loadStripe(
        process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY
      );
      stripe?.redirectToCheckout({
        sessionId: sessionId,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerTrigger asChild></DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Finalizar Pedido</DrawerTitle>
          <DrawerDescription>
            Insira suas informações abaixo para finalizar o seu pedido.
          </DrawerDescription>
        </DrawerHeader>
        <div className="p-5">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Seu Nome</FormLabel>
                    <FormControl>
                      <Input placeholder="Digite seu nome..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="cpf"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Seu CPF</FormLabel>
                    <FormControl>
                      <PatternFormat
                        placeholder="Digite seu CPF..."
                        format="###.###.###-##"
                        customInput={Input}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DrawerFooter>
                <Button
                  type="submit"
                  variant="destructive"
                  className="rounded-full"
                  disabled={isLoading}
                  aria-label="Finalizar pedido"
                >
                  {isLoading && <Loader2Icon className="animate-spin" />}
                  Finalizar
                </Button>
                <DrawerClose asChild>
                  <Button className="w-full rounded-full" variant="outline">
                    Cancelar
                  </Button>
                </DrawerClose>
              </DrawerFooter>
            </form>
          </Form>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default FinishOrderDialog;
