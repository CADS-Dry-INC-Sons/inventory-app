import React from 'react';
import { Item } from './Item';

export const ItemsList = ({items, fetchItem, setIsAdding, isAdding, setMessage}) => {
	return (<div className='Gallery'>
		{
			items.map((item, idx) => {
				return <Item item={item} key={idx} fetchItem={fetchItem} setIsAdding={setIsAdding} isAdding={isAdding} setMessage={setMessage}/>
			})
		}
	</div>)
} 
