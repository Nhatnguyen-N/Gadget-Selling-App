import { ADMIN } from "@/constants/constants";
import { createClient } from "@/supabase/server";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function AdminLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  //Todo: Check if user is authenticated and if user is an admin before rendering the page
  const supabase = await createClient();
  const { data: authData } = await supabase.auth.getUser();
  if (authData?.user) {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", authData.user.id)
      .single();

    if (error || !data) {
      console.log("Error fetching user data", error);
      return;
    }
    if (data.type === ADMIN) return redirect("/");
  }
  return <>{children}</>;
}
