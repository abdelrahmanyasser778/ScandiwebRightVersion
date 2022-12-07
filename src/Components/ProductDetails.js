import React, { Component } from 'react'
import mainContext from "../Context/mainContext";
import { Interweave } from "interweave";
class ProductDetails extends Component {
  static contextType = mainContext;
  constructor(props) {
    super(props);
    this.state = {
      myImgIndex: 0
    };
  }
  
  componentDidMount() {
    localStorage.setItem("myDetailedProduts", JSON.stringify(this.context.myProduct))
  }
  render() {
    const { myProduct, handleToggleOnMouse, toggleDet, priceValue, selectedCurrency, 
      addToCartProdDet, selectAttrProdDet } = this.context;

    const handleImg = (index) => {
      this.setState({ myImgIndex: index })
    }
    
    return (
      <div onMouseDown={handleToggleOnMouse}>
        <div className={` ${toggleDet ? 'overlaySec' : 'none'}`}></div>
        <div className='PDetails container'>
          <div className='smallImgs' style={{ marginTop: "90px" }}>
            {
              myProduct.gallery.map((item, Imgindex) => {
                return (
                  <div key={Imgindex} ><img alt="" onClick={() => handleImg(Imgindex)} src={item} width="90px" /></div>
                )})
            }
          </div>
          <div>
            <img alt="" src={myProduct.gallery[this.state.myImgIndex]} width="300px" style={{ marginTop: "90px" }} />
          </div>
          <div className='PDtitles'>
            <div className='myProdId' >{myProduct.id}</div>
            <div className='myProdName'>{myProduct.name}</div>
            {
              myProduct.attributes.map((attr, indexxx) => {
                return (
                  <div key={indexxx}>
                    <div className='size' >{attr.name} :</div>
                    {
                      attr.items.map((attrIems, index) => {
                        return (
                          <div key={index} className='detailseses'>
                            {
                              attrIems.value.includes("#") ?
                                <button className={`oneSizeColor ${attrIems.isSelected ? 'oneActiveColor' : 'none'}`}
                                  style={{ backgroundColor: `${attrIems.value}`, width: "30px", height: "20px" }} 
                                  onClick={() => selectAttrProdDet(indexxx, index)} ></button> 
                                  : <button className={`oneSizeColor ${attrIems.isSelected ? 'oneSizeActive' : 'none'}`}
                                    onClick={() => selectAttrProdDet(indexxx, index)}
                                    style={{ display: "inline", width: "60px", height: "40px" }}>{attrIems.value}</button>
                            }
                          </div>
                        )
                      })
                    }
                  </div>
                )
              })}
            <div className='PriceDet'>Price </div>
            <div className='PriceDet' >{myProduct.prices[selectedCurrency()].amount} {priceValue}</div>
            {
              myProduct.inStock === true ? (

                <button className='myProdBtn' onClick={() => { addToCartProdDet(myProduct) }} >ADD TO CART</button>
              ) : <button className='outOfStockBtn'  >OUT OF STOCK</button>
            }
            <Interweave content={myProduct.description} />
          </div>
        </div>
      </div>
    )
  }
}

export default ProductDetails
