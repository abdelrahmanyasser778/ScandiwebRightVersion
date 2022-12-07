import React, { Component } from 'react'
import mainContext from "../Context/mainContext";
class OneItemInMenu extends Component {
  static contextType = mainContext;
  constructor(props) {
    super(props);
    this.state = {
      test: true,
      total: 0
    };
  }
  render() {
    const { myCart, priceValue, qty, selectAttr,changeAttr,increase,decrease,
      selectedCurrency,addition, } = this.context;
    this.context.total = myCart.reduce(addition, 0);
return (
<div >
  <div className='MenuTITlE'><span className='spanTitle'>My Bag</span> {qty} items</div>
    {
      myCart ? (myCart.map((item, indexx) => {
        return (
          <div key={indexx}>
          <div className='details' >
            <div className='details-title-price-size'>
            <div className='details-title'>{item.name}</div>
            <div className='details-price'>{(item.prices[selectedCurrency()].amount * item.qty).toFixed(2)} {priceValue}</div>
              {
            item.attributes.map((attr, indexxx) => {
            return (
            <div key={indexxx}>
              <div className='size'>{attr.name}</div>
                {
                attr.items.map((attrIems, index) => {
                return (
                <div key={index} className='detailseses'>
                  {
                  attrIems.value.includes("#") ?
                    <button
                    onClick={() => this.state.test ? changeAttr(indexx, indexxx, index) : selectAttr(indexxx, index)}
                    className={`oneSizeColor ${attrIems.isSelected ? 'oneActiveColor' : 'none'}`}
                    style={{ backgroundColor: `${attrIems.value}`, width: "30px", height: "20px" }} value={attrIems.value}>
                  </button> :

                      <button
                      onClick={(e) => { this.state.test ? changeAttr(indexx, indexxx, index) : selectAttr(indexxx, index) }}
                      className={`oneSizeColor ${attrIems.isSelected ? 'oneSizeActive' : 'none'}`}
                      value={attrIems.value}
                      style={{ display: "inline" }}>{attrIems.value}
                      </button>
                    }
                </div>
                )})}
          </div>
          )})}
  
  </div>
      <div className='details-Quantity'>
          <div className='Quantity'>
            <button className='minus' onClick={() => decrease(indexx)}>-</button>
                <div className='Number'>{item.qty}</div>
                <button className='plus' onClick={() => increase(indexx)}>+</button>
            </div>
      </div>
      <div className='details-img'>
        <img alt="" width="150px" src={item.gallery[0]} />
      </div>
  </div>
  <hr className='hr'></hr>
</div>
)})) : <h3>Wrong Item</h3>
}

  </div>
)}
}

export default OneItemInMenu
