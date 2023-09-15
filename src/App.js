import { useState } from 'react';
import './App.css';
import { Items } from './pages/Items';
import { Cart } from './pages/Cart'

const categories = ['111', '2222222222', '333333', '444444444444', '5555']

function App() {
  console.log(window.Telegram.WebApp)
  // window.Telegram.WebApp.MainButton.show()
  // window.Telegram.WebApp.MainButton.setText('View Order')
  // window.Telegram.WebApp.MainButton.onClick(()=>setIsCart(state => !state))

  const [isCart, setIsCart] = useState(false)
  const [cartItems, setCartItems] = useState([])
  const [categories, setCategories] = useState(['hello', 'holo hola hola', 'bonkerrs', 'cha cha cha, cha cha'])
  const [catIndex, setCatIndex] = useState(1)

  const handleCatgory = (index)=>{
    if(index >=0 && index < categories.length){
      setCatIndex(index)
    }
  }

  return (
    <div className="App">
      <div className='container'>
        {
          !isCart ? (
          <div className='container-main'>
            <div className='category-container'>
                <button className='prev-category category-item' onClick={()=>handleCatgory(catIndex-1)}>{categories[catIndex-1]}</button>
                <button className='curr-category category-item'>{categories[catIndex]}</button>
                <button className='next-category category-item' onClick={()=>handleCatgory(catIndex+1)}>{categories[catIndex+1]}</button>
            </div>
            <Items />
          </div>

          ):(
            <Cart cartItems={cartItems} />
          )
        }

      
    </div>
    </div>
  );
}

export default App;
