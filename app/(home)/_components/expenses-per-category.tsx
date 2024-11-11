import { CardContent, CardHeader, CardTitle } from "@/app/_components/ui/card";
import { Progress } from "@/app/_components/ui/progress";
import { ScrollArea } from "@/app/_components/ui/scroll-area";
import { TRANSACTION_CATEGORY_LABEL } from "@/app/_constants/transactions";
import { TotalExpensePerCategory } from "@/app/_data/get-dashboard/types";
import React from "react";

interface ExpansesPerCategoryProps {
  expensesPerCategory: TotalExpensePerCategory[];
}

const ExpensesPerCategory = ({
  expensesPerCategory,
}: ExpansesPerCategoryProps) => {
  return (
    <ScrollArea className="col-span-2 rounded-md border pb-6 h-full">
      <CardHeader>
        <CardTitle className="font-bold">Gastos por Categoria</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {expensesPerCategory.map((category) => (
          <div key={category.category} className="space-y-2">
            <div className="flex justify-between w-full">
              <p className="text-sm font-bold">{TRANSACTION_CATEGORY_LABEL[category.category]}</p>
              <p className="text-sm font-bold">{category.percentageOfTotal}%</p>
            </div>
            <Progress value={category.percentageOfTotal} />
          </div>
        ))}
      </CardContent>
    </ScrollArea>
  );
};

export default ExpensesPerCategory;
