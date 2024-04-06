import Link from "next/link";
import { Button } from "../ui/button";
import { ChevronLeftIcon, PencilIcon } from "lucide-react";

export function Title({ title, backUrl }: { title: string; backUrl?: string }) {
  return (
    <div className="flex flex-row items-center">
      {backUrl && (
        <div className="-ml-4">
          <Link href={backUrl}>
            <Button variant="ghost" size="sm">
              <ChevronLeftIcon className="size-5" />
            </Button>
          </Link>
        </div>
      )}
      <p className="font-semibold">{title}</p>
    </div>
  );
}
