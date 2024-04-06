import { Button } from "@/components/ui/button";
import { ChevronLeftIcon } from "lucide-react";
import Link from "next/link";
import { PatientInfo } from "./_components/patientInfo";
import { PatientTab } from "./_components/patientTab";
import { Title } from "@/components/common/title";

export default function Page({
  params,
}: {
  params: {
    id: string;
  };
}) {
  return (
    <div className="">
      <Title title="View patient details" backUrl={`/dashboard/patients/${params.id}`} />

      <PatientInfo patientId={params.id} edit />
      <PatientTab patientId={params.id} />
    </div>
  );
}
