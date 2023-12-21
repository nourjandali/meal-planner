"use server";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export async function handleSubmitAddMeals(mealDetails: any) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data, error } = await supabase.from("meals").insert([mealDetails]);

  if (error) {
    console.error("Error inserting data: ", error);
    return { success: false, error };
  } else {
    console.log("Data inserted successfully: ", data);
    return { success: true, data };
  }
}
