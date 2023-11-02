import React, { useState, useEffect } from "react";
import { ItemsList } from "./ItemsList";
import { ItemShow } from "./ItemShow";
import { AddForm } from "./AddForm";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
// import and prepend the api url to any fetch calls
import apiURL from "../api";

export const App = () => {
  {
    /* App Component, Is the primary parent component that holds all of our other components*/
  }
  const [items, setItems] = useState([]);
  const [item, setItem] = useState({});
  const [isAdding, setIsAdding] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function fetchItems() {
    try {
      const response = await fetch(`${apiURL}/items`);
      const itemsData = await response.json();
      setItems(itemsData);
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
    <main className="Container">
      <div className="Heading">
        <h1>CADS-DRY INC & Sons Store</h1>
        {message ? (
          <Alert variant="success" onClose={() => setMessage("")} dismissible>
            <Alert.Heading style={{ backgroundColor: "transparent" }}>
              {message}
            </Alert.Heading>
          </Alert>
        ) : (
          ""
        )}
        {error ? (
          <Alert variant="danger" onClose={() => setError("")} dismissible>
            <Alert.Heading style={{ backgroundColor: "transparent" }}>
              {error}
            </Alert.Heading>
          </Alert>
        ) : (
          ""
        )}
      </div>
      {!item.name ? (
        <div className="Center">
          <h2>All things 🔥!</h2>
          <Button onClick={() => setIsAdding(!isAdding)}>Add New Item</Button>
          {isAdding ? (
            <AddForm
              fetchItems={fetchItems}
              setMessage={setMessage}
              setError={setError}
              setIsAdding={setIsAdding}
            />
          ) : (
            ""
          )}

          <ItemsList
            items={items}
            fetchItem={fetchItem}
            setIsAdding={setIsAdding}
            isAdding={isAdding}
            setMessage={setMessage}
            setError={setError}
          />
        </div>
      ) : (
        <div className="Center">
          <ItemShow
            item={item}
            setItem={setItem}
            fetchItem={fetchItem}
            fetchItems={fetchItems}
            setMessage={setMessage}
            setError={setError}
          />
        </div>
      )}
    </main>
  );
};
