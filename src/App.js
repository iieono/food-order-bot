import { useState } from 'react';
import './App.css';
import { Items } from './pages/Items';
import { Cart } from './pages/Cart'

const categories = ['111', '2222222222', '333333', '444444444444', '5555']

function App() {
  console.log(window.Telegram.WebApp)

  const [isCart, setIsCart] = useState(false)

  return (
    <div className="App">
      <div className='container'>
        {
          !isCart ? (
          <div className='container-main'>
            <div className='category-container'>
              <button className='curr-category category-item'>Fast Food</button>
            </div>
            <Items />
          </div>
          ):(
            <Cart />
          )
        }

      
    </div>
    </div>
  );
}

export default App;
