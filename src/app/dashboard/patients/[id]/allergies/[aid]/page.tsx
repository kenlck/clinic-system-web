import { Title } from "@/components/common/title";
import { prisma } from "@/lib/db.server";
import { PatientAllergyForm } from "../new/patientAllergyForm";

export default async function Page({
  params,
}: {
  params: {
    id: string;
    aid: string;
  };
}) {
  const allergy = await prisma.patientAllergy.findUnique({
    where: { id: Number(params.aid) },
  });

  if (!allergy) {
    return null;
  }

  return (
    <div>
      <Title title="Edit visit" backUrl={`/dashboard/patients/${params.id}?tab=allergy`} />
      <PatientAllergyForm allergy={allergy} patientId={params.id} />
    </div>
  );
}
