import { React } from "react";
import apiURL from "../api";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export const Form = ({ fetchItems }) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      name: e.target.name.value,
      price: e.target.price.value,
      description: e.target.description.value,
      category: e.target.category.value,
      image: e.target.image.value,
    };
    console.log(formData);
    const response = await fetch(`${apiURL}/items`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    console.log(data);
    fetchItems();
    e.target.name.value = "";
    e.target.price.value = null;
    e.target.description.value = "";
    e.target.category.value = "";
    e.target.image.value = "";
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control name="name" type="text" placeholder="Enter name" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPrice">
          <Form.Label>Price</Form.Label>
          <Form.Control name="price" type="number" step=".01" placeholder="Enter price" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Description</Form.Label>
          <Form.Control name="description" type="text" placeholder="Enter description" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicCategory">
          <Form.Label>Category</Form.Label>
          <Form.Control name="category" type="text" placeholder="Enter category" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicImg">
          <Form.Label>Image Url</Form.Label>
          <Form.Control name="image" type="text" placeholder="Enter image url" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
};
