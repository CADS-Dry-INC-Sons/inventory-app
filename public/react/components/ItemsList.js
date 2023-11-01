import React from 'react';
import { Item } from './Item';

export const ItemsList = ({items, fetchItem}) => {
	return (<div className='Gallery'>
		{
			items.map((item, idx) => {
				return <Item item={item} key={idx} fetchItem={fetchItem}/>
			})
		}
	</div>)
} 
