"use server";

import { prisma } from "@/lib/db.server";
import { revalidatePath } from "next/cache";

export type InvoiceType = {
  items: {
    description: string;
    amount: string;
    quantity: string;
    unitPrice: string;
  }[];
};

export async function createInvoice(patientId: string, data: InvoiceType) {
  const items = data.items.map((item) => {
    return {
      description: item.description,
      amount: Number(item.amount) * 100,
      quantity: Number(item.quantity),
      unitPrice: Number(item.unitPrice) * 100,
    };
  });
  const amount = items.reduce((acc, item) => acc + item.amount, 0);
  return await prisma.invoice.create({
    data: {
      amount,
      items: {
        createMany: {
          data: items,
        },
      },
      patientId: Number(patientId),
    },
  });
}

export async function editInvoice(invoiceId: string, data: InvoiceType) {
  const items = data.items.map((item) => {
    return {
      description: item.description,
      amount: Number(item.amount) * 100,
      quantity: Number(item.quantity),
      unitPrice: Number(item.unitPrice) * 100,
    };
  });
  const amount = items.reduce((acc, item) => acc + item.amount, 0);

  await prisma.invoiceItem.deleteMany({
    where: {
      invoiceId: Number(invoiceId),
    },
  });

  const invoice = await prisma.invoice.update({
    where: {
      id: Number(invoiceId),
    },
    data: {
      amount,
      items: {
        createMany: {
          data: items,
        },
      },
    },
  });
  revalidatePath(`/dashboard/patients/${invoice.patientId}`);
  revalidatePath(`/dashboard/patients/${invoice.patientId}/invoices/${invoice.id}`);

  return true;
}
