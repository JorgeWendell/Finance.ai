import React from "react";
import { transationsColumns } from "./_columns";
import AddTransactionButton from "../_components/add-transaction-button";
import { DataTable } from "../_components/ui/data-table";
import { db } from "../_lib/prisma";
import Navbar from "../_components/navbar";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { ScrollArea } from "../_components/ui/scroll-area";
import { canUserAddTransaction } from "../_data/can-user-add-transation";

const transationsPage = async () => {
  const { userId } = await auth();
  if (!userId) {
    redirect("/login");
  }

  const transations = await db.transaction.findMany({
    where: {
      userId,
    },
  });
  const userAddTransaction = await canUserAddTransaction();
  return (
    <>
      <Navbar />
      <div className="flex flex-col space-y-6 overflow-hidden p-6">
        <div className="flex w-full justify-between items-center">
          <h1 className="font-bold text-2xl">Transações</h1>
          <AddTransactionButton userCanAddTransaction={userAddTransaction} />
        </div>
        <ScrollArea>
          <DataTable
            columns={transationsColumns}
            data={JSON.parse(JSON.stringify(transations))}
          />
        </ScrollArea>
      </div>
    </>
  );
};

export default transationsPage;
