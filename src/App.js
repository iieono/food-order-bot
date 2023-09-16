import { useEffect, useState } from "react";
import "./App.css";
import { Items } from "./pages/Items";
import { Cart } from "./pages/Cart";
import { Category } from "./components/Category";
import itemData from './data'
import { NavHashLink } from 'react-router-hash-link';

const categories = ["111", "2222222222", "333333", "444444444444", "5555"];

function App() {
  console.log(window.Telegram.WebApp);

  const [isCart, setIsCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [items, seItems] = useState(itemData);
  const [catIndex, setCatIndex] = useState(0)
  // const [catIndex, setCatIndex] = useState(0);

  function isInViewport(element) {
    var bounding = element.getBoundingClientRect();
    if (
        bounding.top >= 0 &&
        bounding.left >= 0 &&
        bounding.right <= (window.innerWidth || document.documentElement.clientWidth) &&
        bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight)
    ) {
        const indexx = element.getAttribute('id').split('-')[0] 
        console.log(indexx);
        return indexx;
    }
}
const addScrollListener = ()=>{
  const categories = document.getElementsByClassName('item-cat-container')
    if(categories){
      console.log(categories)
      for(let element of categories){
        window.addEventListener('scroll', function (event) {
          if (isInViewport(element)) {
            const indexx = isInViewport(element)
            handleCategory(indexx)
          }
      }, false);
        document.documentElement.addEventListener('touchmove', function (event) {
          if (isInViewport(element)) {
            const indexx = isInViewport(element)
            handleCategory(indexx)
          }
      }, false);
      }
    }
}
  useEffect(()=>{
    addScrollListener()
  },[])

  const handleScrollListener = ()=>{
    // window.removeEventListener('scroll', any)
  }

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

  const handleCategory = (indexx) => {
    const index = items.findIndex((cat)=>Number(indexx) === cat.cat_id)
    const scrollContainer = document.querySelector('.category-container')
    console.log('hello',index, scrollContainer.scrollLeft)
    scrollContainer.scrollLeft = 100 * index + 1
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
                      className="category-item"
                      onClick={(e) => {}}
                    >
              </button>
              {items &&
                items.map((item) => {
                  return (
                    <NavHashLink
                      data-item={item}
                      // smooth to={`#${item.cat_id}-category`}
                      id={`${item.cat_id}-category-id`}
                      className=" category-item"
                      // onClick={(e) => {handleCategory(item)}}
                    >
                      {items ? item.category_name : ""}
                    </NavHashLink>
                  );
                })}
                <button
                      className=" category-item"
                      onClick={(e) => {}}
                    >
              </button>
            </div>
            {items &&
              items.map((cat) => {
                return (
                  <Category
                    category={cat}
                    handleCart={handleCart}
                    cartItems={cartItems}
                  />
                );
              })}
          </div>
        ) : (
          <Cart
            cartItems={cartItems}
            setIsCart={setIsCart}
            setViewOrder={setViewOrder}
          />
        )}
      </div>
    </div>
  );
}

export default App;
