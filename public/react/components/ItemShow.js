import React, { useState } from "react";
import apiURL from "../api";
import EditForm from "./EditForm";

export const ItemShow = ({ setItem, item, fetchItems, fetchItem }) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="show">
      <div>
        <h2>🔥!</h2>
        <button onClick={() => setItem({})}>Back</button>
      </div>
      <div>
        <img src={item.image} width="100" height="100" />
        <p>{item.name}</p>
        <p>${Number(item.price).toFixed(2)}</p>
        <p>{item.description}</p>
      </div>
      <button
        className="deleteBtn"
        onClick={async () => {
          fetch(`${apiURL}/items/` + item.id, {
            method: "DELETE",
          });
          fetchItems();
          setItem({});
        }}
      >
        Delete
      </button>
      <button className="editBtn" onClick={() => setIsEditing(!isEditing)}>
        {isEditing ? "Cancel" : "Edit Item"}
      </button>

      {isEditing && (
        <EditForm
          item={item}
          setItem={setItem}
          fetchItems={fetchItems}
          fetchItem={fetchItem}
          setIsEditing={setIsEditing}
        />
      )}
    </div>
  );
};
