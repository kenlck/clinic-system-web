"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { type InvoiceType, createInvoice, editInvoice } from "./action";
import Input from "@/components/form/input";
import Textarea from "@/components/form/textarea";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { LoaderIcon, MinusCircleIcon, PlusIcon } from "lucide-react";
import type { Invoice, InvoiceItem, PatientAllergy } from "@prisma/client";
import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toCurrencyString } from "@/lib/utils";

export function InvoiceForm({
  patientId,
  invoice,
}: {
  patientId: string;
  invoice?: Invoice & {
    items: InvoiceItem[];
  };
}) {
  const router = useRouter();
  const { mutate, isPending } = useMutation({
    mutationFn: async (data: { invoice: InvoiceType; patientId: string }) => {
      if (invoice) {
        return editInvoice(invoice.id.toString(), data.invoice);
      }
      return createInvoice(data.patientId, data.invoice);
    },
    onSuccess: () => {
      toast.success("Invoice created");
      router.push(`/dashboard/patients/${patientId}?tab=invoice`);
    },
    onError: (err) => {
      toast.error("Something went wrong. Please try again.");
    },
  });

  const [items, setItems] = useState([
    {
      description: "",
      amount: "",
      quantity: "",
      unitPrice: "",
    },
  ]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (invoice?.id) {
      setItems(
        invoice.items.map((item) => {
          return {
            description: item.description,
            amount: (item.amount / 100).toString(),
            quantity: item.quantity.toString(),
            unitPrice: (item.unitPrice / 100).toString(),
          };
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [invoice?.id]);

  const total = items.reduce((a, b) => {
    return a + Number(b.amount);
  }, 0);

  return (
    <form
      className="flex flex-col gap-4 mb-4"
      onSubmit={(e) => {
        e.preventDefault();

        const data = {
          invoice: {
            items,
          },
          patientId,
        };
        mutate(data);
      }}
    >
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead />
            <TableHead>Description</TableHead>
            {/* <TableHead className="w-[120px]">Amount</TableHead> */}
            <TableHead className="w-[60px]">Quantity</TableHead>
            <TableHead className="w-[120px]">Unit Price</TableHead>
            <TableHead className="w-[120px]">Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item, i) => {
            let unitTotal = Number(item.unitPrice) * Number(item.quantity);
            if (Number.isNaN(unitTotal)) {
              unitTotal = 0;
            }
            return (
              <TableRow
                key={`item${
                  // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                  i
                }`}
              >
                <TableCell className="w-12">
                  <Button
                    variant="destructive"
                    size="sm"
                    type="button"
                    onClick={() => setItems([...items.filter((_, index) => index !== i)])}
                  >
                    <MinusCircleIcon className="size-4" />
                  </Button>
                </TableCell>
                <TableCell>
                  <Input
                    name="description"
                    value={item.description}
                    onChange={(e) => {
                      setItems([
                        ...items.slice(0, i),
                        {
                          ...item,
                          description: e.target.value,
                        },
                        ...items.slice(i + 1),
                      ]);
                    }}
                  />
                </TableCell>
                {/* <TableCell>
                  <Input
                    name="amount"
                    type="number"
                    value={item.amount}
                    onChange={(e) => {
                      setItems([
                        ...items.slice(0, i),
                        {
                          ...item,
                          amount: e.target.value,
                        },
                        ...items.slice(i + 1),
                      ]);
                    }}
                  />
                </TableCell> */}
                <TableCell>
                  <Input
                    name="quantity"
                    type="number"
                    value={item.quantity}
                    onChange={(e) => {
                      const quantity = e.target.value;
                      let unitTotal = Number(item.unitPrice) * Number(quantity);
                      if (Number.isNaN(unitTotal)) {
                        unitTotal = 0;
                      }
                      setItems([
                        ...items.slice(0, i),
                        {
                          ...item,
                          quantity,
                          amount: unitTotal.toString(),
                        },
                        ...items.slice(i + 1),
                      ]);
                    }}
                  />
                </TableCell>
                <TableCell>
                  <Input
                    name="unitPrice"
                    type="number"
                    value={item.unitPrice}
                    onChange={(e) => {
                      const unitPrice = e.target.value;
                      let unitTotal = Number(item.quantity) * Number(unitPrice);
                      if (Number.isNaN(unitTotal)) {
                        unitTotal = 0;
                      }
                      setItems([
                        ...items.slice(0, i),
                        {
                          ...item,
                          unitPrice,
                          amount: unitTotal.toString(),
                        },
                        ...items.slice(i + 1),
                      ]);
                    }}
                  />
                </TableCell>
                <TableCell className="text-right">
                  RM {toCurrencyString(item.amount ? Number(item.amount) : 0)}
                </TableCell>
              </TableRow>
            );
          })}
          <TableRow>
            <TableCell colSpan={999}>
              <Button
                variant="ghost"
                className="w-full"
                type="button"
                onClick={() => {
                  setItems([
                    ...items,
                    {
                      description: "",
                      amount: "",
                      quantity: "",
                      unitPrice: "",
                    },
                  ]);
                }}
              >
                <PlusIcon className="size-5" />
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={4}>
              <p className="text-right">Total</p>
            </TableCell>
            <TableCell>
              <p className="text-right">RM {toCurrencyString(total)}</p>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      <Button type="submit" disabled={isPending}>
        {isPending ? <LoaderIcon className="size-5 animate-spin" /> : "Save"}
      </Button>
    </form>
  );
}
