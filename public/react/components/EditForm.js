import { React, useState } from "react";
import apiURL from "../api";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export default function EditForm({
  item,
  setItem,
  fetchItem,
  fetchItems,
  setIsEditing,
  setMessage,
  setError,
}) {
  {
    /* Edit Form handle the fetch Update for a single item */
  }
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

    const data = await response.json();
    if (data.error) {
      const errorString =
        "Invalid values for: " +
        data.error.map((err) => `${err.path}`).join(" ");
      setError(errorString);
    } else {
      fetchItem(item.id);
      fetchItems();
      setIsEditing(false);
      setMessage("Item successfully updated.");
    }
  };

  return (
    <>
      <Form className="form" onSubmit={handleSubmit}>
        <Form.Group className="input mb-3" controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={itemName}
            required
            onChange={(e) => setItemName(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="input mb-3" controlId="formBasicPrice">
          <Form.Label>Price</Form.Label>
          <Form.Control
            ttype="number"
            step=".01"
            name="price"
            required
            value={itemPrice}
            onChange={(e) => setItemPrice(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="input mb-3" controlId="formBasicDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            name="description"
            value={itemDescription}
            required
            onChange={(e) => setItemDescription(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="input mb-3" controlId="formBasicCategory">
          <Form.Label>Category</Form.Label>
          <Form.Control
            type="text"
            name="category"
            value={itemCategory}
            required
            onChange={(e) => setItemCategory(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="input mb-3" controlId="formBasicImage">
          <Form.Label>Image</Form.Label>
          <Form.Control
            type="text"
            name="image"
            value={itemImage}
            required
            onChange={(e) => setItemImage(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Update Item
        </Button>
      </Form>
    </>
  );
}
