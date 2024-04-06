import { Title } from "@/components/common/title";
import { prisma } from "@/lib/db.server";
import { PatientVisitForm } from "../new/patientVisitForm";

export default async function Page({
  params,
}: {
  params: {
    id: string;
    vid: string;
  };
}) {
  const visit = await prisma.patientVisit.findUnique({
    where: { id: Number(params.vid) },
  });
  if (!visit) {
    return null;
  }

  return (
    <div>
      <Title title="Edit visit" backUrl={`/dashboard/patients/${params.id}`} />
      <PatientVisitForm visit={visit} patientId={params.id} />
    </div>
  );
}
