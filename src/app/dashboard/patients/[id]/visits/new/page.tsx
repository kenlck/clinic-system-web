import { Title } from "@/components/common/title";
import { PatientInfo } from "../../_components/patientInfo";
import { PatientVisitForm } from "./patientVisitForm";

export default function Page({
  params,
}: {
  params: {
    id: string;
  };
}) {
  return (
    <div>
      <Title title="Create a new visit" backUrl={`/dashboard/patients/${params.id}`} />
      <PatientInfo patientId={params.id} />
      <div className="mt-2">
        <PatientVisitForm patientId={params.id} />
      </div>
    </div>
  );
}
