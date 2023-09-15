import React from 'react'
import { Item } from './Item'

export const Category = ({category}) => {
  return (
    <div className='item-cat-container'>
      <div className='category-name'>
        <p>{category.category_name}</p>
      </div>
      <div className='items-container'>
        {category?.items && category.items.map((item)=>{
          return(
            <Item item={item}/>
          )
        })}
      </div>
    </div>
  )
}
