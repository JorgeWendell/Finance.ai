"use client";
import React, { useState } from "react";

import { PencilIcon } from "lucide-react";
import { Button } from "@/app/_components/ui/button";
import UpsertTransactionDialog from "@/app/_components/upsert-transation-dialog";
import { Transaction } from "@prisma/client";

interface EditTransactionButtonProps {
    transation: Transaction;
}

const EditTransactionButton = ({ transation }: EditTransactionButtonProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      <Button variant="ghost" size="icon" className="text-muted-foreground" onClick={() => setDialogOpen(true)}>
        <PencilIcon />
      </Button>
      <UpsertTransactionDialog isOpen={dialogOpen} setIsOpen={setDialogOpen} defaultValues={{...transation, amount: Number(transation.amount)}} transactionId={transation.id} />
    </>
  );
};

export default EditTransactionButton;
