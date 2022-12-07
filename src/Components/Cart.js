import React, { Component } from 'react'
import mainContext from "../Context/mainContext";
import CartGallery from './CartGallery';
class Cart extends Component {
  static contextType = mainContext;
  constructor(props) {
    super(props);
    this.state = {
      test: true,
      total: 0
    };
  }
  render() {
    const { myCart, priceValue, qty,increase,decrease,selectedCurrency, addition, handleToggleOnMouse,toggleDet,
      changeAttr,selectAttr, } = this.context;
    this.context.total = myCart.reduce(addition, 0);
  return (
    <div onMouseDown={handleToggleOnMouse}>
      <div className={` ${toggleDet ? 'overlaySec' : 'none'}`}></div>
        <div className=' container'>
        <div className="myCartName">Cart</div>  
          {
          myCart.map((item, indexx) => {
          return (
            <div key={indexx}>
              <div className='myCartBorder'>
              <div className='myCartContainer'>
                <div>
                  <div className='id'>{item.id}</div>
                    <div className='name'>{item.name}</div>
                      <div className='amount'>{(item.prices[selectedCurrency()].amount * item.qty).toFixed(2)}{priceValue} </div>
                        <div>
                      {
              item.attributes.map((attr, index) => {
                return (
                <div key={index}>
                <div className='Size'>{attr.name}</div>
                  {
                  attr.items.map((attrIems, inde) => {
                  return (
                    <div key={inde} className='detailseses'>
                      {
                    attrIems.value.includes("#") ?
                    <button className={`oneSizeColor ${attrIems.isSelected ? 'oneActiveColor' : 'none'}`} 
                    style={{ backgroundColor: `${attrIems.value}`, width: "30px", height: "20px" }} 
                    onClick={() => this.state.test ? changeAttr(indexx, index, inde) : selectAttr(index, inde)}></button> :
                    <button onClick={() => this.state.test ? changeAttr(indexx, index, inde) : selectAttr(index, inde)}
                    className={`btnSizeCart ${attrIems.isSelected ? 'oneSizeActive' : 'none'}`}>{attrIems.value}</button>
                      }
                    </div>
                      )
                  })}
            </div>
            )})}
      </div>
</div>
  <div className='imgQtyContainer'>
    <div className='qtyContainer'>
      <button className='QtyBtnCart' onClick={() => increase(indexx)}>+</button>
        <div style={{ marginLeft: "15px" }}>{item.qty}</div>
        <button className='QtyBtnCart' onClick={() => decrease(indexx)}>-</button>
      </div>
    <div>
      <CartGallery item={item} />
    </div>
  </div>
</div>
</div>
</div>
)})}
    <div className='myCartTax'>Tax 21% : 
    <span className='myCartTaxSpan'>{(this.context.total * 0.21).toFixed(2)} {priceValue}</span></div>
        <div className='myCartTax'>Quantity :<span className='myCartTaxSpan'> {qty}</span></div>
            <div className='myCartTax'>Total : <span className='myCartTaxSpan'>{this.context.total.toFixed(2)} {priceValue}</span></div>
          <button className='CartBtn'>Order</button>
    </div>
</div>
)}
}

export default Cart
