import { React, useState } from "react";
import apiURL from "../api";

export default function EditForm({
  item,
  setItem,
  fetchItem,
  fetchItems,
  setIsEditing,
}) {
  const [itemName, setItemName] = useState(item.name);
  const [itemPrice, setItemPrice] = useState(item.price);
  const [itemCategory, setItemCategory] = useState(item.category);
  const [itemDescription, setItemDescription] = useState(item.description);
  const [itemImage, setItemImage] = useState(item.image);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const editedData = {
      name: itemName,
      price: itemPrice,
      description: itemDescription,
      category: itemCategory,
      image: itemImage,
    };

    const response = await fetch(`${apiURL}/items/${item.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedData),
    });

    fetchItem(item.id);
    fetchItems();
    setIsEditing(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          style={{ overflowWrap: "anywhere" }}
        />
        <br />
        <input
          type="number"
          step=".01"
          name="price"
          value={itemPrice}
          onChange={(e) => setItemPrice(e.target.value)}
          style={{ overflowWrap: "break-word" }}
        />
        <br />
        <input
          type="text"
          name="description"
          value={itemDescription}
          onChange={(e) => setItemDescription(e.target.value)}
          style={{ overflowWrap: "break-word" }}
        />
        <br />
        <input
          type="text"
          name="category"
          value={itemCategory}
          onChange={(e) => setItemCategory(e.target.value)}
          style={{ overflowWrap: "break-word" }}
        />
        <br />
        <input
          type="text"
          name="image"
          value={itemImage}
          onChange={(e) => setItemImage(e.target.value)}
          style={{ overflowWrap: "break-word" }}
        />
        <br />
        <button type="submit">Submit new item</button>
      </form>
    </>
  );
}
