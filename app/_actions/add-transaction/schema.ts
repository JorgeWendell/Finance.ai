import { TransactionCategory, TransactionPaymentMethod } from "@prisma/client";
import { z } from "zod";

export const UpsertTransactionSchema = z.object({
  name: z.string().trim().min(1),
  amount: z.number().positive(),
  category: z.nativeEnum(TransactionCategory),
  paymentMethod: z.nativeEnum(TransactionPaymentMethod),
  date: z.date(),
});
