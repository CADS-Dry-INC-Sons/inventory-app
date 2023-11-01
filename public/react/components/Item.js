import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
export const Item = (props) => {

  return( 

  <Card className="gallery-item" onClick={()=>{
    props.setIsAdding(false)
    props.fetchItem(props.item.id)
  }
  } style={{ width: '18rem' }}>
    <Card.Img src={props.item.image} alt={props.item.name} width="50" height="250"/>
    <Card.Body>
      <Card.Title>{props.item.name}</Card.Title>
      <Card.Text>
      ${Number(props.item.price).toFixed(2)}
      </Card.Text>
    </Card.Body>
  </Card>
  
  )
} 
	