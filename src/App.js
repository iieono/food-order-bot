import { useEffect, useState } from "react";
import "./App.css";
import { Items } from "./pages/Items";
import { Cart } from "./pages/Cart";
import { Category } from "./components/Category";
import itemData from './data'

const categories = ["111", "2222222222", "333333", "444444444444", "5555"];

function App() {
  console.log(window.Telegram.WebApp);

  const [isCart, setIsCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [items, seItems] = useState(itemData);
  const [catIndex, setCatIndex] = useState(0);

  const handleCart = (item, value)=>{
    if(!window.Telegram.WebApp.MainButton.isVisible){
      setViewOrder()
    }
    const foundItem = cartItems.find((food)=> item.item_id === food.item_id)
    let newCart = cartItems.map((food)=>
    food.item_id === item.item_id ?
    {...foundItem, count: value === 'inc' ? foundItem.count + 1 : foundItem.count - 1}
    : food
    )
    newCart = newCart.filter((food)=> food.count > 0)
    if(foundItem){
      setCartItems(
        newCart
      )
    }else{
      setCartItems([...cartItems, {...item, count: 1}])
    }
    console.log(cartItems)
  }

  const handleCategory = (index) => {
    if (index >= 0 && index < items.length) {
      setCatIndex(index);
    }
    // document.getElementById(`${items[index].cat_id}-categrory`).scrollToView()
  };
  const setViewOrder = ()=> {
    if(cartItems.length > 0){
      window.Telegram.WebApp.MainButton.show()
      window.Telegram.WebApp.MainButton.setParams({
        color: '#F94C10',
        text_color : '#FFF'
      })
      window.Telegram.WebApp.MainButton.setText('View Order')
      window.Telegram.WebApp.MainButton.onClick(()=>setIsCart(true))
    }else{
      window.Telegram.WebApp.MainButton.hide()
    }
  }
  useEffect(()=>{
    setViewOrder() 
  },[cartItems])
  return (
    <div className="App">
      <div className="container">
        {!isCart ? (
          <div className="container-main">
            <div className="category-container">
              <button
                className="prev-category category-item"
                onClick={(e) => handleCategory(catIndex - 1)}
              >
                {items ? items[catIndex - 1]?.category_name : ""}
              </button>
              <button className="curr-category category-item"
              onClick={()=>setIsCart(true)}
              >
                {items ? items[catIndex]?.category_name : ""}
              </button>
              <button
                className="next-category category-item"
                onClick={(e) => handleCategory(catIndex + 1)}
              >
                {items ? items[catIndex + 1]?.category_name : ""}
              </button>
            </div>
            {
              items && items.map((cat)=>{
                return(
                  <Category  category={cat} handleCart={handleCart} cartItems={cartItems}/>
                )
              })

            }
          </div>
        ) : (
          <Cart cartItems={cartItems} setIsCart={setIsCart} setViewOrder={setViewOrder} />
        )}
      </div>
    </div>
  );
}

export default App;
