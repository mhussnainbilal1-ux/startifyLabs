import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { getSession } from "@/app/lib/auth";

type LeadsLayoutProps = {
  children: ReactNode;
};

export default async function LeadsLayout({
  children,
}: LeadsLayoutProps) {
  const session = await getSession();

  if (!session) {
    redirect("/login?redirect=/leads");
  }

  return <>{children}</>;
}