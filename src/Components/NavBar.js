  import React, { Component } from 'react'
  import * as Constants from '../Api/Constant'
  import axios from 'axios'
  import mainContext from "../Context/mainContext";
  import logo from '../images/header-logo.png'
  import cart from '../images/cart.png'
  import ItemsMenu from './ItemsMenu';
  import { Link, NavLink } from 'react-router-dom';
  import Prices from './Prices'
  class NavBar extends Component {
    static contextType = mainContext;

    constructor(props) {
      super(props);
      this.state = {
        PriceData: [],

      };
    }

    //Fetching all the prices from the api to put in prices menu
    async componentDidMount() {
      const queryResult = await axios.post(
        Constants.GRAPHQL_API, {
        query: Constants.GET_PRICE
      }
      )
      const result = queryResult.data.data.currencies;
      this.setState({ PriceData: result })
    }

    render() {
      const { setPriceValue, priceValue, setToggleCurr, Img, qty, toggle, toggleDetV2 } = this.context;
      
      return (
        <div className='container'>
          <div className='flex-body'>
            <div className='one_type'>
              <NavLink className='links-style' end to="/" >All</NavLink>
              <NavLink className='links-style' to="/cloth">CLOTHES</NavLink>
              <NavLink className='links-style' to="/tech">TECH</NavLink>
            </div>
          
            <div className='logo'>
            <Link  to="/">
              <img alt="" src={logo} />
              </Link>
            </div>

            <div className='cart_price'>
              <div className='priceee'>
                <p className='Dollar'>{priceValue}</p>
                <img alt="" className='price'onClick={toggle} src={Img}/>
            
            <div className={`sub-menu ${this.context.toggleCurr ? 'activeCurrDet' : 'inactiveCurrDet'}`}>
              <div className='curr-info'>
              {
                this.state.PriceData ? (this.state.PriceData.map((item, index) => {
                  return (
                    <Prices key={index} symbolUnit={item.symbol} symbolName={item.label} setToggleCurr={setToggleCurr} toggleCurr={this.toggleCurr} setPriceValue={setPriceValue} priceValue={priceValue} />
                  )
                })) : <h2>return null</h2>
              }
            </div>
          </div>
          </div>
              <div>
                {
                  qty > 0 ? <div className='CartNumber'>{qty}</div> : null
                }
                <img alt="" className='cart' onClick={toggleDetV2} src={cart} />
              </div>
            </div>
          </div>
          {
            this.context.toggleDet ? <ItemsMenu /> : null
          }
        </div>
      )
    }
  }

  export default NavBar
