import React, { useEffect, useState } from "react";
import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";

function AvailableMeals() {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState();

  useEffect(() => {
    const mealsData = async () => {
      setIsLoading(true);
      const response = await fetch(
        "https://food-order-app-c5179-default-rtdb.firebaseio.com/meals.json"
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const responseData = await response.json();

      const loadedMeals = [];

      for (const key in responseData) {
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }
      setMeals(loadedMeals);
      setIsLoading(false);
    };

    mealsData().catch((error) => {
      setIsLoading(false);
      setIsError(error.message);
    });
  }, []);
  if (isLoading) {
    return (
      <section className={classes.MealsLoading}>
        <p>Loading...</p>
      </section>
    );
  }
  if (isError) {
    return (
      <section className={classes.MealsError}>
        <p>{isError}</p>
      </section>
    );
  }

  const mealsList = meals.map((meals) => (
    <MealItem
      id={meals.id}
      key={meals.id}
      name={meals.name}
      description={meals.description}
      price={meals.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
}

export default AvailableMeals;
