import React, { useState, useEffect } from "react";
import { ItemsList } from "./ItemsList";
import { ItemShow } from "./ItemShow";
import { Form } from "./Form";
// import and prepend the api url to any fetch calls
import apiURL from "../api";

export const App = () => {
  const [items, setItems] = useState([]);
  const [item, setItem] = useState({});

  async function fetchItems() {
    try {
      const response = await fetch(`${apiURL}/items`);
      const itemsData = await response.json();
      setItems(itemsData);
      console.log(items, itemsData);
    } catch (err) {
      console.log("Oh no an error! ", err);
    }
  }

  async function fetchItem(id) {
    try {
      const response = await fetch(`${apiURL}/items/${id}`);
      const itemData = await response.json();
      setItem(itemData);
    } catch (err) {
      console.log("Item not found.", err);
    }
  }

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <main>
      <h1>CADS-DRY INC & Sons Store</h1>
      {!item.name ? (
        <>
          <h2>All things 🔥!</h2>
          <Form fetchItems={fetchItems} />
          <ItemsList items={items} fetchItem={fetchItem} />
        </>
      ) : (
        <ItemShow
          item={item}
          setItem={setItem}
          fetchItem={fetchItem}
          fetchItems={fetchItems}
        />
      )}
    </main>
  );
};
