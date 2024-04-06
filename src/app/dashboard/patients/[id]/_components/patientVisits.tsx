"use client";

import { Table } from "@/components/tanstackTable/table";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { LoaderIcon } from "lucide-react";
import { useState } from "react";
import { getPatientVisit } from "./action";

export function PatientVisits({ patientId }: { patientId: string }) {
  // const sp = useSearchParams();
  // const searchParams = Object.fromEntries(sp.entries());
  const [searchParams, setSearchParams] = useState({
    page: 1,
    size: 10,
    sort: "",
    sortDirection: "",
  });

  const { data, isLoading } = useQuery({
    queryKey: ["visits", patientId, searchParams],
    queryFn: () => getPatientVisit(patientId, searchParams),
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
            accessorKey: "note",
            header: "Note",
          },
          {
            accessorKey: "diagnosis",
            header: "Diagnosis",
          },
          {
            accessorKey: "visitDate",
            header: "Visit Date",
          },
          {
            accessorKey: "updatedAt",
            header: "Updated Date",
          },
        ]}
        href={`/dashboard/patients/${patientId}/visits/{id}`}
        onSortAndPaginateChange={(state) => setSearchParams(state)}
        pageCount={data?.pageCount ?? 1}
      />
    </div>
  );
}
