import { React } from "react";
import apiURL from "../api";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export const AddForm = ({ fetchItems, setMessage, setIsAdding, setError }) => {
  {
    /* Add Form adds new items to our API and fetches the up to date item/s*/
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      name: e.target.name.value,
      price: e.target.price.value,
      description: e.target.description.value,
      category: e.target.category.value,
      image: e.target.image.value,
    };
    
    const response = await fetch(`${apiURL}/items`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (data.error) {
      const errorString =
        "Invalid values for: " +
        data.error.map((err) => `${err.path}`).join(" ");
      setError(errorString);
    } else {
      fetchItems();
      setIsAdding(false);
      setMessage("Successfully Added a New Item!");
      e.target.name.value = "";
      e.target.price.value = null;
      e.target.description.value = "";
      e.target.category.value = "";
      e.target.image.value = "";
    }
  };

  return (
    <>
      <Form className="form" onSubmit={handleSubmit}>
        <Form.Group className="input mb-3" controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            required
            name="name"
            type="text"
            placeholder="Enter name"
          />
        </Form.Group>

        <Form.Group className="input mb-3" controlId="formBasicPrice">
          <Form.Label>Price</Form.Label>
          <Form.Control
            name="price"
            type="number"
            step=".01"
            placeholder="Enter price"
            required
          />
        </Form.Group>

        <Form.Group className="input mb-3" controlId="formBasicName">
          <Form.Label>Description</Form.Label>
          <Form.Control
            name="description"
            type="text"
            placeholder="Enter description"
            required
          />
        </Form.Group>

        <Form.Group className="input mb-3" controlId="formBasicCategory">
          <Form.Label>Category</Form.Label>
          <Form.Control
            name="category"
            type="text"
            placeholder="Enter category"
            required
          />
        </Form.Group>

        <Form.Group className="input mb-3" controlId="formBasicImg">
          <Form.Label>Image Url</Form.Label>
          <Form.Control
            name="image"
            type="text"
            placeholder="Enter image url"
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
};
