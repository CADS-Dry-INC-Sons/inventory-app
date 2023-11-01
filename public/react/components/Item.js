import React from 'react';

export const Item = (props) => {

  return( 
  <div onClick={()=> props.fetchItem(props.item.id)}>
    <h3>{props.item.name}</h3>
    <h4>${Number(props.item.price).toFixed(2)}</h4>
    <img src={props.item.image} alt={props.item.name} width="100" height="100" />
  </div>
  
  )
} 
	