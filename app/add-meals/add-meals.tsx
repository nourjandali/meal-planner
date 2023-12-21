"use client";

import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { handleSubmitAddMeals } from "@/utils/handleSubmitAddMeals";
import { supabase } from "@/utils/client";
import placeholder from "@/public/placeholder.svg";
import Link from "next/link";

const randomNameId = `name-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

type MealDetailsType = {
  image: string | null;
  mealName: string;
  calories: string;
  carbohydrates: string;
  protein: string;
  fats: string;
};

export default function AddMeals() {
  const [imageSrc, setImageSrc] = useState(placeholder);
  const [mealDetails, setMealDetails] = useState<MealDetailsType>({
    image: null,
    mealName: "",
    calories: "",
    carbohydrates: "",
    protein: "",
    fats: "",
  });

  const handleFileChange = async (event: any) => {
    const file = event.target.files[0];
    const { data, error } = await supabase.storage
      .from("images")
      .upload(`/public/${randomNameId}`, file, {
        cacheControl: "3600",
        upsert: false,
      });
    setMealDetails((prev) => ({
      ...prev,
      image: `${supabaseUrl}/storage/v1/object/public/${
        (data as any).fullPath
      }`,
    }));
  };

  const handleChange = (e: any) => {
    setMealDetails({ ...mealDetails, [e.target.id]: e.target.value });
  };

  const handleSubmit = async () => {
    await handleSubmitAddMeals(mealDetails);
    setMealDetails({
      image: null,
      mealName: "",
      calories: "",
      carbohydrates: "",
      protein: "",
      fats: "",
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Link
        href="/"
        className="absolute left-8 top-8 py-2 px-4 rounded-md no-underline text-foreground bg-btn-background hover:bg-btn-background-hover flex items-center group text-sm"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>{" "}
        Back
      </Link>
      <section className="flex items-center justify-center h-screen p-5 space-y-10 md:flex-row md:space-y-0 gap-10">
        <Card className="w-full max-w-lg order-1">
          <CardHeader className="pb-4">
            <CardTitle className="text-2xl font-semibold">
              Meal Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="mealName">Meal Name</Label>
              <Input
                id="mealName"
                placeholder="Meal Name"
                type="string"
                value={mealDetails.mealName}
                onChange={handleChange}
              />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="calories">Calories</Label>
              <Input
                id="calories"
                placeholder="Calories"
                type="number"
                value={mealDetails.calories}
                onChange={handleChange}
              />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="carbohydrates">Carbohydrates (g)</Label>
              <Input
                id="carbohydrates"
                placeholder="Carbohydrates"
                type="number"
                value={mealDetails.carbohydrates}
                onChange={handleChange}
              />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="protein">Protein (g)</Label>
              <Input
                id="protein"
                placeholder="Protein"
                type="number"
                value={mealDetails.protein}
                onChange={handleChange}
              />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="fats">Fats (g)</Label>
              <Input
                id="fats"
                placeholder="Fats"
                type="number"
                value={mealDetails.fats}
                onChange={handleChange}
              />
            </div>
            <Button className="w-full mt-5">Save Meal Details</Button>
          </CardContent>
        </Card>
        <div className="order-2">
          <label
            className="w-full h-auto rounded-lg cursor-pointer"
            htmlFor="file-upload"
          >
            <img
              alt="Meal Image"
              className="rounded-lg"
              width="600"
              height="600"
              src={mealDetails.image || imageSrc.src}
            />
            <input
              className="hidden"
              id="file-upload"
              type="file"
              onChange={handleFileChange}
            />
          </label>
        </div>
      </section>
    </form>
  );
}
