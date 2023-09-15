import React from 'react'
import { Item } from './Item'

export const Category = ({category, handleCart, cartItems}) => {
  return (
    <div className='item-cat-container' id={`${category.cat_id}-category`}>
      <div className='category-name'>
        <p>{category.category_name}</p>
      </div>
      <div className='items-container'>
        {category?.items && category.items.map((item)=>{
          return(
            <Item item={item} handleCart={handleCart} cartItems={cartItems}/>
          )
        })}
      </div>
    </div>
  )
}
