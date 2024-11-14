"use client";

import { Transaction } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";

import { Button } from "@/app/_components/ui/button";
import { TrashIcon } from "lucide-react";
import {
  TRANSACTION_CATEGORY_LABEL,
  TRANSACTION_PAYMENT_METHOD_LABEL,
} from "@/app/_constants/transactions";
import TransactionTypeBadge from "../_components/type-badge";
import EditTransactionButton from "../_components/edit-transaction-button";
import DeleteTransactionButton from "../_components/delete-transaction-button";

export const transationsColumns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "type",
    header: "Tipo",
    cell: ({ row: { original: transaction } }) => (
      <TransactionTypeBadge transation={transaction} />
    ),
  },

  {
    accessorKey: "category",
    header: "Categoria",
    cell: ({ row: { original: transaction } }) =>
      TRANSACTION_PAYMENT_METHOD_LABEL[transaction.paymentMethod],
  },
  {
    accessorKey: "paymentMethod",
    header: "Metodo de Pagamento",
    cell: ({ row: { original: transaction } }) =>
      TRANSACTION_CATEGORY_LABEL[transaction.category],
  },
  {
    accessorKey: "date",
    header: "Data",
    cell: ({ row: { original: transaction } }) =>
      new Date(transaction.date).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }),
  },
  {
    accessorKey: "amount",
    header: "Valor",
    cell: ({ row: { original: transaction } }) =>
      new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(Number(transaction.amount)),
  },
  {
    accessorKey: "Actions",
    header: "Ações",
    cell: ({ row: { original: transaction } }) => {
      return (
        <div className="space-x-1">
          <EditTransactionButton transation={transaction} />
          <DeleteTransactionButton transactionId={transaction.id} />
        </div>
      );
    },
  },
];
