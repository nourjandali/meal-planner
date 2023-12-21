"use client";
import { CardTitle, CardContent, Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { handleSubmitShowMeals } from "@/utils/handleSubmitShowMeals";
import { useEffect, useState } from "react";
import Link from "next/link";

type Meal = {
  id: number;
  image: string;
  mealName: string;
  calories: number;
  carbohydrates: number;
  protein: number;
  fats: number;
};

export default function Page() {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await handleSubmitShowMeals();
      if (response.success) {
        setMeals(Array.isArray(response.meals) ? response.meals : []);
      } else {
        setError(response.error ? response.error.message : "Unknown error");
      }
    };
    fetchMeals();
  }, []);

  return (
    <main className="p-4 md:p-6 lg:p-8 bg-gray-50 w-screen h-screen">
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
      <div className="grid gap-4 md:gap-6 lg:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-14">
        {meals.map((meal: any) => (
          <Card
            key={meal.id}
            className="flex flex-col bg-white shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out transform hover:scale-105"
          >
            <CardContent className="relative p-0">
              <img
                alt="Meal Image"
                className="w-full h-full object-cover"
                src={meal.image}
              />
              <div className="absolute bottom-0 left-0 w-full bg-black/60 p-2">
                <CardTitle className="text-white">{meal.mealName}</CardTitle>
              </div>
            </CardContent>
            <div className="flex flex-col gap-2 p-4">
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-600">Calories</span>
                <Badge
                  className="text-sm px-2 py-1 rounded-full"
                  variant="outline"
                >
                  {meal.calories} kcal
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-600">Carbohydrates</span>
                <Badge
                  className="text-sm px-2 py-1 rounded-full"
                  variant="outline"
                >
                  {meal.carbohydrates}g
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-600">Protein</span>
                <Badge
                  className="text-sm px-2 py-1 rounded-full"
                  variant="outline"
                >
                  {meal.protein}g
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-600">Fats</span>
                <Badge
                  className="text-sm px-2 py-1 rounded-full"
                  variant="outline"
                >
                  {meal.fats}g
                </Badge>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </main>
  );
}
