"use client";

import { Table } from "@/components/tanstackTable/table";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { LoaderIcon } from "lucide-react";
import { useState } from "react";
import { getPatientInvoices, getPatientVisit } from "./action";
import { toCurrencyString } from "@/lib/utils";

export function PatientInvoices({ patientId }: { patientId: string }) {
  // const sp = useSearchParams();
  // const searchParams = Object.fromEntries(sp.entries());
  const [searchParams, setSearchParams] = useState({
    page: 1,
    size: 10,
    sort: "",
    sortDirection: "",
  });

  const { data, isLoading } = useQuery({
    queryKey: ["invoices", patientId, searchParams],
    queryFn: () => getPatientInvoices(patientId, searchParams),
    placeholderData: keepPreviousData,
  });

  if (isLoading) {
    return (
      <div>
        <LoaderIcon className="size-8 animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <Table
        data={data?.data ?? []}
        columns={[
          {
            accessorKey: "invoiceId",
            header: "ID",
          },
          {
            accessorKey: "amount",
            header: "Amount",
            cell: ({ row }) => {
              return (
                <div>
                  <p className="font-medium">RM {toCurrencyString(row.original.amount / 100)}</p>
                </div>
              );
            },
          },
          {
            accessorKey: "createdAt",
            header: "Date",
          },
        ]}
        href={`/dashboard/patients/${patientId}/invoices/{id}`}
        onSortAndPaginateChange={(state) => setSearchParams(state)}
        pageCount={data?.pageCount ?? 1}
      />
    </div>
  );
}
