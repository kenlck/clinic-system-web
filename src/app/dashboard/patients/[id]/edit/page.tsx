import { prisma } from "@/lib/db.server";
import { PatientForm } from "../../form";

export default async function Page({ params }: { params: { id: string } }) {
  const patient = await prisma.patient.findUnique({
    where: { id: Number(params.id) },
  });
  return (
    <div className="px-4 py-4">
      <p className="font-semibold">Edit patient details {params.id}</p>
      <div className=" my-6 max-w-lg">
        <PatientForm patient={patient ?? undefined} />
      </div>
    </div>
  );
}
