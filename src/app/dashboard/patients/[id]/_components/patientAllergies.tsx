"use client";

import { Table } from "@/components/tanstackTable/table";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { LoaderIcon } from "lucide-react";
import { useState } from "react";
import { getPatientAllergies } from "./action";

export function PatientAllergies({ patientId }: { patientId: string }) {
  const [searchParams, setSearchParams] = useState({
    page: 1,
    size: 10,
    sort: "",
    sortDirection: "",
  });

  const { data, isLoading } = useQuery({
    queryKey: ["allergies", patientId, searchParams],
    queryFn: () => getPatientAllergies(patientId, searchParams),
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
            accessorKey: "refCode",
            header: "Ref Code",
          },
          {
            accessorKey: "allergyName",
            header: "Name",
          },
          {
            accessorKey: "note",
            header: "Note",
          },
          {
            accessorKey: "updatedAt",
            header: "Updated Date",
          },
        ]}
        href={`/dashboard/patients/${patientId}/allergies/{id}`}
        onSortAndPaginateChange={(state) => setSearchParams(state)}
        pageCount={data?.pageCount ?? 1}
      />
    </div>
  );
}
