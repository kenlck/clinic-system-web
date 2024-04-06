import { Title } from "@/components/common/title";
import { PatientInfo } from "../../_components/patientInfo";
import { PatientAllergyForm } from "./patientAllergyForm";

export default function Page({
  params,
}: {
  params: {
    id: string;
  };
}) {
  return (
    <div>
      <Title title="Create a new allergy" backUrl={`/dashboard/patients/${params.id}?tab=allergy`} />
      <PatientInfo patientId={params.id} />
      <div className="mt-2">
        <PatientAllergyForm patientId={params.id} />
      </div>
    </div>
  );
}
