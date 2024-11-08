import React from "react";
import { transationsColumns } from "./_columns";
import AddTransactionButton from "../_components/add-transaction-button";
import { DataTable } from "../_components/ui/data-table";
import { db } from "../_lib/prisma";
import Navbar from "../_components/navbar";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const transationsPage = async () => {
  const { userId } = await auth()
  if (!userId) {
    redirect("/login")
  }
  const transations = await db.transaction.findMany({
    where: {
      userId,
    },
  });
  return (
    <>
    <Navbar />
    <div className="p-6 space-y-6">
      <div className="flex w-full justify-between items-center">
        <h1 className="font-bold text-2xl">Transações</h1>
        <AddTransactionButton />
      </div>
      <DataTable columns={transationsColumns} data={transations} />
    </div>
    </>
  );
};

export default transationsPage;
