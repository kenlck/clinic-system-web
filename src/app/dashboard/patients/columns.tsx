"use client";

import { cn } from "@/lib/utils";
import type { Patient } from "@prisma/client";
import type { ColumnDef } from "@tanstack/react-table";

export const column: ColumnDef<Patient>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      return (
        <div>
          <p
            className={cn(
              "font-medium",
              row.original.gender === "MALE" && "text-blue-500",
              row.original.gender === "FEMALE" && "text-pink-500"
            )}
          >
            {row.original.name}
          </p>
        </div>
      );
    },
  },
  {
    accessorKey: "contactNo",
    header: "Contact No",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
];
