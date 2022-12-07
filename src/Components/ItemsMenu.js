import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import mainContext from "../Context/mainContext";
import OneItemInMenu from './OneItemInMenu'
class ItemsMenu extends Component {
  static contextType = mainContext;
  render() {
    const { myCart, toggleDetFun ,addition,priceValue} = this.context;
    this.context.total = myCart.reduce(addition, 0);
    return (
      <div className='items-menu-wrap'>
        <div className='items-menu'>
          <div className='curr-info-Items'>
            <div> {
              Array.from(Array(myCart)).map(el =>
                <div className='ScrollCart' key={el}>
                  <OneItemInMenu />
                </div>
              )} </div>
              <div className='Total'>
            <div className='TotalDiv'>Total</div>
              <div className='TotalPrice'>{this.context.total.toFixed(2)} {priceValue}</div>
            </div>
            <div className='my-buttons'>
              <Link to="/cart">
                <button className='ViewBag' onClick={toggleDetFun}>VIEW BAG</button>
              </Link>
              <button className='Checkout'>CHECK OUT</button>
            </div>

          </div>
        </div>
      </div>
    )
  }
}

export default ItemsMenu
