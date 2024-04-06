import { Title } from "@/components/common/title";
import { PatientInfo } from "../../_components/patientInfo";
import { InvoiceForm } from "./invoiceForm";

export default function Page({
  params,
}: {
  params: {
    id: string;
  };
}) {
  return (
    <div>
      <Title title="Create a new invoice" backUrl={`/dashboard/patients/${params.id}?tab=invoice`} />
      <PatientInfo patientId={params.id} />
      <div className="mt-2">
        <InvoiceForm patientId={params.id} />
      </div>
    </div>
  );
}
