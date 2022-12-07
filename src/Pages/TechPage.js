import React, { Component } from 'react'
import * as Constants from '../Api/Constant'
import axios from 'axios'
import mainContext from "../Context/mainContext";
import trolly from '../images/Untitled-2.jpg'
import { Link } from 'react-router-dom';
import OutOfStock from '../Components/OutOfStock'
class TechPage extends Component {
  static contextType = mainContext;

  constructor(props) {
    super(props);
    this.state = {
      PageName: null,
      productsData: [],
      myItemId: null,
      isShown: false,
    };
  }
  //Fetching Data
  async componentDidMount() {
    const queryResult = await axios.post(
      Constants.GRAPHQL_API, {
      query: Constants.GET_PAGE_NAME_QUERY
    })
    const AllData = await axios.post(
      Constants.GRAPHQL_API, {
      query: Constants.GET_THE_REST
    })
    const all = AllData.data.data.categories[0].products;
    this.setState({ productsData: all })
    const result = queryResult.data.data.categories[2].name;
    this.setState({ PageName: result.toString().charAt(0).toUpperCase() + result.slice(1) })
  }

  render() {
    const { priceValue, addToCart, handleToggleOnMouse, addToProduct, selectedCurrency } = this.context;
    //Changing the state to handle the cart img to be shown on hover
    const ChangeState = (ID) => {
      this.setState({ isShown: false })
      this.setState({ myItemId: ID })
    }
    //Changing the state to handle the cart img to be shown on hover
    const ChangeStateV2 = () => {
      this.setState({ isShown: false })
      this.setState({ myItemId: null })
    }
    return (
      <div onMouseDown={handleToggleOnMouse} className='CartItem'>
        <div className={` ${this.context.toggleDet ? 'overlaySec' : 'none'}`}></div>
        <div className='container'>
          <h2 style={{ paddingTop: "15px" }}>{this.state.PageName}</h2>
        </div>
        <div className='CartLayout container'>
          {
            this.state.PageName === "Tech" ? (
              this.state.productsData ? (this.state.productsData.map((item, index) => {
                item.qty = 1
                item.attributes.forEach((attr) => {
                  attr.items.forEach((at) => {
                    at.isSelected = false
                  })
                  attr.items[0].isSelected = true;
                })

                if (item.category === "tech") {
                  if (item.inStock === true) {
                    return (
                      <div key={item.id} className='cartImg'
                        onMouseEnter={() => ChangeState(item.id)}
                        onMouseLeave={() => ChangeStateV2()}>
                        <div style={{ position: "relative" }}>
                          <Link to="/productD">
                            <img alt="" className='TheOne'
                             width="250px" 
                             src={item.gallery[0]} 
                               onClick={() => {
                              this.context.itemID = item.id
                              addToProduct(item)
                            }} />
                          </Link>
                          {this.state.myItemId === item.id && (
                            <img alt="" className='trolly' 
                            onClick={() => { addToCart(item); this.context.mySelectedProd = item }} 
                            width="35px" 
                            src={trolly} />
                          )}
                        </div>
                        <div className='title-img'>
                          <div className='title'> {item.name}</div>
                        </div>
                        <div className='PriceValue' style={{ fontWeight: "bold" }}>{item.prices[selectedCurrency()].amount} {priceValue} </div>
                      </div>
                    )
                  }
                  else {
                    return (<OutOfStock item={item} key={index} Name={item.name} Img={item.gallery[0]} Price={item.prices[selectedCurrency()].amount} Currency={priceValue} />)
                  }
                } else {
                  return null
                }
              })
              ) : <h2>Wrong Data</h2>
            ) : <h2>Wrong DAta</h2>
          }
        </div>
      </div>
    )
  }
}

export default TechPage
