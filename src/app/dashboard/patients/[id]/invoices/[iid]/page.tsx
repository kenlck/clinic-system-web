import { Title } from "@/components/common/title";
import { prisma } from "@/lib/db.server";
import { InvoiceForm } from "../new/invoiceForm";
import { PatientInfo } from "../../_components/patientInfo";

export default async function Page({
  params,
}: {
  params: {
    id: string;
    iid: string;
  };
}) {
  const invoice = await prisma.invoice.findUnique({
    where: { id: Number(params.iid) },
    include: {
      items: true,
    },
  });

  if (!invoice) {
    return null;
  }

  return (
    <div>
      <Title title={`Edit invoice ${invoice.invoiceId}`} backUrl={`/dashboard/patients/${params.id}?tab=invoice`} />
      <PatientInfo patientId={params.id} />
      <InvoiceForm invoice={invoice} patientId={params.id} />
    </div>
  );
}
