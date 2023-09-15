import React from 'react'

export const Item = ({item}) => {
  return (
    <div className='item-container'>
      <div className='item-image-container'>
        <img src={item.image} alt={item.item_name} className='item-image'/>
      </div>
      <div className='item-info'>
        <p>{item.item_name}</p>
        {/* <p><b>·</b></p> */}
        <p className='price-text'>{item.price.toLocaleString('fr')} so'm</p>
      </div>
      <div className='item-buttons'>
        <button className='add-button'>ADD</button>
      </div>
    </div>
  )
}
