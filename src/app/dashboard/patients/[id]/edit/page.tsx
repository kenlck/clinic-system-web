import { Title } from "@/components/common/title";
import { prisma } from "@/lib/db.server";
import { PatientForm } from "../../form";

export default async function Page({ params }: { params: { id: string } }) {
  const patient = await prisma.patient.findUnique({
    where: { id: Number(params.id) },
  });
  return (
    <div className="">
      <Title title={`Edit patient details ${params.id}`} backUrl={`/dashboard/patients/${patient?.id}`} />
      <div className="my-6 max-w-lg">
        <PatientForm patient={patient ?? undefined} />T
      </div>
    </div>
  );
}
