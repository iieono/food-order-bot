import React, { useEffect, useState } from 'react'

export const Item = ({item, handleCart, cartItems}) => {
  const [itemCount,  setItemCount] = useState(0)
  useEffect(()=>{
    checkCount()
  },[])

  const checkCount = ()=>{
    const foundItem = cartItems.find((food)=> item.item_id === food.item_id)
    if(foundItem){
      setItemCount(foundItem.count)
    }
  }

  return (
    <div className="item-container">
      <div className={`item-image-container ${itemCount > 0 && 'count-cart'}`} itemCount={itemCount}>
        <img src={item.image} alt={item.item_name} className="item-image" />
      </div>
      <div className="item-info">
        <p>{item.item_name}</p>
        {/* <p><b>·</b></p> */}
        <p className="price-text">{item.price.toLocaleString("fr")} so'm</p>
      </div>
      <div className="item-buttons">
        {itemCount < 1 ? (
          <button
            className="add-button"
            onClick={() => {
              handleCart(item, "inc");
              setItemCount(state => state + 1)
            }}
          >
            ADD
          </button>
        ) : (
          <div className='two-buttons'>
            <button
              className="count-button left-button"
              onClick={() => {
                handleCart(item, "dec");
                setItemCount(state => state - 1)
              }}
            >
              -
            </button>
            <button
              className="count-button right-button"
              onClick={() => {
                handleCart(item, "inc");
                setItemCount(state => state + 1)
              }}
            >
              +
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
