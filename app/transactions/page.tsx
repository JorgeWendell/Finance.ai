import React from "react";
import { transationsColumns } from "./_columns";
import AddTransactionButton from "../_components/add-transaction-button";
import { DataTable } from "../_components/ui/data-table";
import { db } from "../_lib/prisma";
import Navbar from "../_components/navbar";

const transationsPage = async () => {
  const transations = await db.transaction.findMany({});
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
