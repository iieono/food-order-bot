import React, { useEffect } from 'react'

export const Cart = ({cartItems, setIsCart}) => {
  
  const orderList = [
    {
      item_name : 'Pizza',
      price : 65000,
      count : 3,
      description: 'Pizza peperonni spicy one' 
    },
    {
      item_name : 'Cola',
      price : 10000,
      count : 1, 
      description: 'Cola cola cola cola cola cola cola caol cola' 
    }
  ]
  useEffect(()=>{
    let total_price = 0
    for(order of orderList){
      full_price += (order.price * order.count)
    }

    window.Telegram.WebApp.MainButton.show()
    window.Telegram.WebApp.MainButton.setText(`Pay ${total_price}`)
    window.Telegram.WebApp.MainButton.onClick(()=>setIsCart(false))
  },[])
  return (
      <div className='cart-orders'>
        <div className='cart-header-container'>
          <p className='cart-header'>YOUR ORDER</p>
          <button className='cart-edit-button' onClick={ ()=> setIsCart(false) }>Edit</button>
        </div>
        <div className='cart-list-container'>
            { orderList && orderList.map((order)=>{
              return(
                <div className='cart-item-container'>
                  <div className='cart-image-container'>
                    <img src='https://cdn.pixabay.com/photo/2016/12/15/20/21/texture-1909992_640.jpg' alt='image' className='cart-item-image'/>
                  </div>
                  <div className='order-item-details'>
                    <div className='order-item-details-header'>
                      <p>{order.item_name} <b className='bold-count'>{order.count}x</b></p>
                      <p>{order.count * order.price} sum</p>
                    </div>
                    <div className='order-item-details-desc'>
                      <p className='comment-text'>{order.description}</p>
                    </div>
                  </div>
                </div>
              )
            }) }
        </div>
        <div className='extra-details'>
          <input type='text' placeholder='Add comment...' className='comment-input'/>
          <p className='info-comment'>Any special requests, details, final wishes etc.</p>
        </div>
      </div>
  )
}
