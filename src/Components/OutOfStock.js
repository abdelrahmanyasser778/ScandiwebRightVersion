import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import mainContext from "../Context/mainContext";
class OutOfStock extends Component {
  static contextType = mainContext;
  render() {
    const { Name, Img, Price, Currency, item } = this.props
    const { addToProduct } = this.context;

    return (
      <div className='cartOverlay' >
        <Link to="/productD">
          <img alt="" className='TheOne' width="250px" src={Img} style={{ opacity: 0.25 }}
            onClick={() => { addToProduct(item);this.context.itemID = item.id}}/>
        </Link>
        <Link to="/productD">
          <p className='p-overlay' onClick={() => { addToProduct(item); this.context.itemID = item.id}}>OUT OF STOCK</p>
        </Link>
        <div className='title-img'>
          <div className='overlay-title'> {Name}</div>
        </div>
        <div className='overlay-Price'>{Price}{Currency}</div>
      </div>
    )

  }
}

export default OutOfStock
