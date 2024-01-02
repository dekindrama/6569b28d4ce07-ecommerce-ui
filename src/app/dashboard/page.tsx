"use client";
import BaseTemplateDashboard from "@/components/BaseTemplateDashboard";
import useAuth from "@/hooks/useAuth";

export default function DashboardPage() {
  console.log("=============================");
  console.log("hit dashboard page");
  console.log("=============================");

  //* check is auth
  const { session, status } = useAuth({ required: true });

  //* return nothing when unauthenticated
  if (status !== "authenticated") return;

  //* render page
  return (
    <BaseTemplateDashboard>
      <h1 className="font-bold">Dashboard Page</h1>
    </BaseTemplateDashboard>
  );
}
