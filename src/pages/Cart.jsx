import React, { useEffect, useState } from 'react'

export const Cart = ({cartItems, setIsCart, setViewOrder}) => {
  const [comment, setComment] = useState('')
  const sendCartItems = ()=>{
    let total_price = 0
    for(const order of cartItems){
      total_price += (order.price * order.count)
    }
    window.Telegram.WebApp.showConfirm(`Are you sure? \nTotal price: ${total_price.toLocaleString('fr')} so'm`, ()=>{
      window.Telegram.WebApp.sendData({
        cart : cartItems,
        comment : comment,
        total_price : total_price,
      })
    })
  }
  useEffect(()=>{
    let total_price = 0
    for(const order of cartItems){
      total_price += (order.price * order.count)
    }

    window.Telegram.WebApp.MainButton.show()
    window.Telegram.WebApp.MainButton.setParams({
      color: '#F94C10',
      text_color : '#FFF'
    })
    window.Telegram.WebApp.MainButton.setText(`Pay ${total_price.toLocaleString('fr')} so'm`)
    window.Telegram.WebApp.MainButton.onClick(sendCartItems)
  },[])
  return (
      <div className='cart-orders'>
        <div className='cart-header-container'>
          <p className='cart-header'>YOUR ORDER</p>
          <button className='cart-edit-button' onClick={ ()=> {
            setIsCart(false) 
            setViewOrder()
            }}>Edit</button>
        </div>
        <div className='cart-list-container'>
            { cartItems && cartItems.map((order)=>{
              return(
                <div className='cart-item-container'>
                  <div className='cart-image-container'>
                    <img src={order.image} alt={order.item_name} className='cart-item-image'/>
                  </div>
                  <div className='order-item-details'>
                    <div className='order-item-details-header'>
                      <p>{order.item_name} <b className='bold-count'>{order.count}x</b></p>
                      <p>{(order.count * order.price).toLocaleString('fr')} so'm</p>
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
          <input type='text' placeholder='Add comment...' className='comment-input' value={comment} onChange={(e)=>setComment(e.target.value)}/>
          <p className='info-comment'>Any special requests, details, final wishes etc.</p>
        </div>
      </div>
  )
}
