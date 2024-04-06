import { Table } from "@/components/tanstackTable/table";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/db.server";
import Link from "next/link";
import { column } from "./columns";

export default async function Page({ searchParams }: { searchParams: SearchParams }) {
  const page = Number(searchParams.page) || 1;
  const size = Number(searchParams.size) || 10;
  const sort = (searchParams.sort as string) || undefined;
  const sortDirection = searchParams.sortDirection || undefined;

  const orderBy: SearchParams = {};

  if (sort) {
    orderBy[sort] = sortDirection;
  }

  const data = await prisma.patient.findMany({
    take: size,
    skip: (page - 1) * size,
    orderBy: {
      ...orderBy,
    },
  });

  const count = await prisma.patient.count();

  const pageCount = Math.ceil(count / size);
  return (
    <div className="">
      <div className="flex flex-row justify-between items-center my-2">
        <h1 className="font-semibold">Patients</h1>
        <Button>
          <Link href="/dashboard/patients/new">New Patient</Link>
        </Button>
      </div>

      <div className="space-y-2">
        <Table data={data} columns={column} pageCount={pageCount} href="/dashboard/patients/{id}" />
      </div>
    </div>
  );
}
