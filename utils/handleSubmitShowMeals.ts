"use server";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export async function handleSubmitShowMeals() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data: meals, error } = await supabase.from("meals").select();

  if (error) {
    console.error("Error inserting data: ", error);
    return { success: false, error };
  } else {
    console.log("Data inserted successfully: ", meals);
    return { success: true, meals };
  }
}
