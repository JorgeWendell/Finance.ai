"use client";

import {
  PiggyBankIcon,
  TrendingDownIcon,
  TrendingUp,
  TrendingUpIcon,
} from "lucide-react";
import { Pie, PieChart } from "recharts";

import { Card, CardContent } from "@/app/_components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/app/_components/ui/chart";
import { TransactionType } from "@prisma/client";
import { TransactionPercentagePerType } from "@/app/_data/get-dashboard/types";
import PercentageItem from "./percentage-items";

const chartConfig = {
  [TransactionType.DEPOSIT]: {
    label: "Receita",
    color: "#55B92E",
  },
  [TransactionType.EXPENSE]: {
    label: "Despesas",
    color: "#E93030",
  },
  [TransactionType.INVESTIMENT]: {
    label: "Investido",
    color: "#FFFFFF",
  },
} satisfies ChartConfig;

interface TransationsPieChartProps {
  typesPercentage: TransactionPercentagePerType;
  balance: number;
  depositTotal: number;
  expenseTotal: number;
  investimentTotal: number;
}

const TransactionPieChart = ({
  depositTotal,
  expenseTotal,
  investimentTotal,
  typesPercentage,
}: TransationsPieChartProps) => {
  const chartData = [
    {
      type: TransactionType.DEPOSIT,
      amount: depositTotal,
      fill: "#55B92E",
    },
    {
      type: TransactionType.EXPENSE,
      amount: expenseTotal,
      fill: "#E93030",
    },
    {
      type: TransactionType.INVESTIMENT,
      amount: investimentTotal,
      fill: "#FFFFFF",
    },
  ];
  return (
    <Card className="flex flex-col p-12">
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="amount"
              nameKey="type"
              innerRadius={60}
            />
          </PieChart>
        </ChartContainer>
        <div className="space-y-2">
          <PercentageItem
            icon={<TrendingUpIcon size={16} className="text-primary" />}
            title="Receita"
            value={typesPercentage[TransactionType.DEPOSIT]}
          />
          <PercentageItem
            icon={<TrendingDownIcon size={16} className="text-red-500" />}
            title="Gastos"
            value={typesPercentage[TransactionType.EXPENSE]}
          />
          <PercentageItem
            icon={<PiggyBankIcon size={16} className="text-white" />}
            title="Investido"
            value={typesPercentage[TransactionType.INVESTIMENT]}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default TransactionPieChart;
