import Meals from "./meals";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import Error from "../error/page";

export default async function Index() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return <Error />;
  }

  return (
    <div>
      <Meals />
    </div>
  );
}
