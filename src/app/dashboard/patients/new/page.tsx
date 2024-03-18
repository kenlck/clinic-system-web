import AutoForm, { AutoFormSubmit } from "@/components/ui/auto-form";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { PatientForm } from "../form";

export default function Page() {
  return (
    <div className="px-4 py-4">
      <p className="font-semibold">Enter patient details</p>
      <div className=" my-6 max-w-lg">
        <PatientForm />
      </div>
    </div>
  );
}
