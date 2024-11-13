"use server";

import { db } from "@/app/_lib/prisma";
import OpenAi from "openai";
import { GenerateAiReportSchema, generateAiReportSchema } from "./schema";
import { auth, clerkClient } from "@clerk/nextjs/server";

export const generateAiReport = async ({ month }: GenerateAiReportSchema) => {
  generateAiReportSchema.parse({ month });
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }
  const user = await clerkClient().users.getUser(userId);
  const hasPremiumPlan = user?.publicMetadata.subscriptionPlan === "premium";
  if (!hasPremiumPlan) {
    throw new Error("Unauthorized");
  }
  const openai = new OpenAi({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const transactions = await db.transaction.findMany({
    where: {
      createdAt: {
        gte: new Date(`2024-${month}-01`),
        lte: new Date(`2024-${month}-31`),
      },
    },
  });
  const content = `Gere um relatório com insights sobre minha saúde financeira, com dicas e orientações de como melhorar minha vida financeira.As transações estão divididas por ponto e vírgula.A estrutura de cada uma é {DATA}-{TIPO}-{VALOR}-{CATEGORIA}. São elas:
    ${transactions
      .map(
        (transaction) =>
          `${transaction.date.toLocaleDateString("pt-BR")} - {R$${
            transaction.amount
          }-${transaction.type}-${transaction.category}`
      )

      .join(";")}`;
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content:
          "Você é um especialista em gestão e organização de finanças pessoais. Você ajuda as pessoas a organizarem melhor suas finanças",
      },
      {
        role: "user",
        content,
      },
    ],
  });
  return completion.choices[0].message.content;
};
