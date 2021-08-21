import React, { useEffect, useState } from 'react';

// importing the styles
import styles from './AvailableMeals.module.css';
import MealItem from './MealItem/MealIteam';
import Card from '../UI/Card';

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);

  /*
    The function you pass to useEffect should not return a promise. 
    Instead, the function you pass to useEffect may return a cleanup function which can be executed.
  */
  useEffect(() => {
    // define async function
    const fetchMeals = async () => {
      const response = await fetch(
        'https://react-http-dba8a-default-rtdb.asia-southeast1.firebasedatabase.app/meals.json'
      );

      const fetchedMeals = [];
      const data = await response.json();
      for (const key in data) {
        fetchedMeals.push({
          id: key,
          name: data[key].name,
          description: data[key].description,
          price: data[key].price,
        });
      }

      setMeals(fetchedMeals);
    };

    // execute async function
    fetchMeals();
  }, []);

  const mealsList = meals.map((meal) => (
    <MealItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={styles.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
