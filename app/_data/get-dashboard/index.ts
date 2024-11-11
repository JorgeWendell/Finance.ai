import { db } from "@/app/_lib/prisma";
import { TransactionType } from "@prisma/client";
import { TransactionPercentagePerType } from "./types";

export const getDashboard = async (month: string) => {
  const where = {
    date: {
      gte: new Date(`2024-${month}-01`),
      lt: new Date(`2024-${month}-31`),
    },
  };
  const depositTotal = Number(
    (
      await db.transaction.aggregate({
        where: { ...where, type: "DEPOSIT" },
        _sum: { amount: true },
      })
    )?._sum?.amount
  );
  const investimentTotal = Number(
    (
      await db.transaction.aggregate({
        where: { ...where, type: "INVESTIMENT" },
        _sum: { amount: true },
      })
    )?._sum?.amount
  );
  const expenseTotal = Number(
    (
      await db.transaction.aggregate({
        where: { ...where, type: "EXPENSE" },
        _sum: { amount: true },
      })
    )._sum.amount
  );
  const balance = depositTotal - investimentTotal - expenseTotal;

  const transactionTotal = Number(
    (
      await db.transaction.aggregate({
        where,
        _sum: { amount: true },
      })
    )._sum.amount
  );

  const typesPercentage: TransactionPercentagePerType = {
    [TransactionType.DEPOSIT]: Math.round(
      (Number(depositTotal || 0) / Number(transactionTotal)) * 100
    ),
    [TransactionType.EXPENSE]: Math.round(
      (Number(expenseTotal || 0) / Number(transactionTotal)) * 100
    ),
    [TransactionType.INVESTIMENT]: Math.round(
      (Number(investimentTotal || 0) / Number(transactionTotal)) * 100
    ),
  };

  return {
    depositTotal,
    investimentTotal,
    expenseTotal,
    balance,
    typesPercentage,
  };
};
