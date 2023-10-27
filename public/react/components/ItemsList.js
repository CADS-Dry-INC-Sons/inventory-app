import React from 'react';
import { Item } from './Item';

export const ItemsList = ({items, fetchItem}) => {
	return <>
		{
			items.map((item, idx) => {
				return <Item item={item} key={idx} fetchItem={fetchItem}/>
			})
		}
	</>
} 
