import { Component } from "react";
import NavBar from "./Components/NavBar";
import AllPage from "./Pages/AllPage";
import mainContext from "./Context/mainContext";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import down from './images/down.png'
import up from './images/up.png'
import Cart from "./Components/Cart";
import ProductDetails from "./Components/ProductDetails";
import ClothPage from "./Pages/ClothPage";
import TechPage from "./Pages/TechPage";

class App extends Component {

  ///States 
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      toggleDet: false,
      toggleCurr: false,
      Img: down,
      PriceNames: ["$", "£", "A$", "¥", "₽"],
      products: null,
      priceValue: localStorage.getItem("myPriceValue") ? JSON.parse(localStorage.getItem("myPriceValue")) : "$",
      itemID: null,
      mySelectedProd: null,
      myCart: JSON.parse(localStorage.getItem("mySelectedItem")) || [],
      qty: JSON.parse(localStorage.getItem("myQty")) || 0,
      total: 0,
      currentIndex: 0,
      myProduct: localStorage.getItem("myDetailedProduts") ? JSON.parse(localStorage.getItem("myDetailedProduts")) : null,
      atributSelected: false,
      succesfullyAdded: false
    };
  }
  ///Function to handle navbar toggle arrow
  handleImg = () => {
    this.setState({ Img: down })
  }
  ///function to handle the menu of currency 
  toggle = () => {
    this.setState({ toggleCurr: !this.state.toggleCurr })
    if (this.state.toggleDet) { this.setState({ toggleDet: false }) }
    if (this.state.toggleCurr) { this.handleImg() } else { this.setState({ Img: up }) }
  }

  ////Function to handle the menu of the small cart
  toggleDetFun = () => {
    this.setState({ toggleDet: !this.state.toggleDet })
  }

////Function to handle the menu of the small cart
  toggleDetV2 = () => {
    this.setState({ toggleDet: !this.state.toggleDet })
    if (this.state.toggleCurr) {
      this.setState({ toggleCurr: !this.state.toggleCurr })
    }
    if(this.state.Img===up){
      this.setState({Img:down})
    }
  }

  ////Function used when click outside the menu
  handleToggleOnMouse = () => {
    if (this.state.toggleDet) {
      this.setState({ toggleDet: false })
    }
    if (this.state.toggleCurr) {
      this.setState({ toggleCurr: false })
      this.setState({ Img: down })
    }
  }

  ///Function that handle the currency selection
  handleClicked = (e) => {
    e.persist();
    this.setState({ priceValue: e.target.id });
    this.setState({ toggleCurr: !this.state.toggleCurr });
    this.setState({ Img: down })
    localStorage.setItem("myPriceValue", JSON.stringify(e.target.id))
  }
  //Function to check if the selected product has the same attributes
  itemSame = (item) => {
    var myItems = [];
    for (let i = 0; i < this.state.myCart.length; i++) {
      if (this.state.myCart[i].id === item.id) {
        myItems.push(i);
      }
    }

    if (myItems.length === 0)
      return this.setState({ myCart: [...this.state.myCart, JSON.parse(JSON.stringify(item))] });
    
    let AttrSame = [];
    let AttrSameIndex;
    for (let index of myItems) {
      if (this.state.myCart[index].attributes.length === 0) {
        const myState = this.state.myCart
        return (myState[index].qty = this.state.myCart[index].qty + 1);
      }

      let flag = this.state.myCart[index].attributes.map((attr, i) =>
        attr.items.map((y, j) => y.isSelected === item.attributes[i].items[j].isSelected));
      for (let iter = 0; iter < flag.length; iter++) {
        if (!flag[iter].includes(false)) {
          AttrSame.push(index);
        } else {
          AttrSame.push("no");
        }
      }

      if (AttrSame.includes("no")) {
        AttrSame = [];
      } else {
        AttrSameIndex = AttrSame[0];
        AttrSame = [];
      }
    }

    if (AttrSameIndex >= 0) {
      const mySecondState = this.state.myCart
      mySecondState[AttrSameIndex].qty = this.state.myCart[AttrSameIndex].qty + 1;
    } else {
      this.setState({ myCart: [...this.state.myCart, JSON.parse(JSON.stringify(item))] });
    }
  }
  
  ///Function to add a product to Cart
  addToCart = (item) => {
    let rest = { ...item };
    this.itemSame(rest);
    let calcQty = this.state.myCart.map((x) => x.qty);
    let totalqty = calcQty.reduce(function (a, b) {
      return a + b;
    }, 0);
    this.setState({ qty: totalqty })
  }


  ///Function that add a product to cart used in product Details Page
  addToCartProdDet = (item) => {
    const finded = item.attributes.map((x) =>
      x.items.find((x) => x.isSelected === true)
    );
    const notSelectedAtr = finded.includes(undefined);

    if (notSelectedAtr) {
      this.setState({ succesfullyAdded: false })
      this.setState({ atributSelected: true })
      return;
    } else {
      this.setState({ succesfullyAdded: true })
      this.setState({ atributSelected: false })
      let rest = { ...item };
      this.itemSame(rest);
    }
    let calcQty = this.state.myCart.map((x) => x.qty);
    let totalqty = calcQty.reduce(function (a, b) {
      return a + b;
    }, 0);

    this.setState({ qty: totalqty })
  }


  //Function that handle the local storage and total Qty
  componentDidUpdate = (prevProps, prevState) => {
    if (prevState.myCart !== this.state.myCart) {
      let calcQty = this.state.myCart.map((x) => x.qty);
      let totalqty = calcQty.reduce((a, b) => {
        return a + b;
      }, 0);
      this.setState({ qty: totalqty })
    }
    if (JSON.stringify(prevState.myCart) === JSON.stringify(this.state.myCart)) {
      localStorage.setItem("mySelectedItem",JSON.stringify(this.state.myCart));
    }

    let calcQty = this.state.myCart.map((x) => x.qty);
    let totalqty = calcQty.reduce((a, b) => {
      return a + b;
    }, 0);

    localStorage.setItem("myQty",JSON.stringify(totalqty));
  }

  //Function to select The attributes
  selectAttr = (indexxx, index) => {
    let selectNew = { ...this.mySelectedProd };
    selectNew.attributes[indexxx].items.map((x) => (x.isSelected = false));
    selectNew.attributes[indexxx].items[index].isSelected = true;
    this.setState({ mySelectedProd: selectNew })
  }

  //Function to select attributes used in product details page

  selectAttrProdDet = (indexxx, index) => {
    let selectNew = { ...this.state.myProduct };
    selectNew.attributes[indexxx].items.map((x) => (x.isSelected = false));
    selectNew.attributes[indexxx].items[index].isSelected = true;
    this.setState({ mySelectedProd: selectNew })
  }

  ///Function to change attr 
  changeAttr = (indexx, indexxx, index) => {
    let newCartItem = { ...this.state.myCart[indexx] };
    newCartItem.attributes[indexxx].items.map((x) => (x.isSelected = false));
    newCartItem.attributes[indexxx].items[ index].isSelected = true;
    let rest = [...this.state.myCart];
    rest[indexx] = newCartItem;
    this.setState({ myCart: rest })
  }
  //Function that used to get the index of selected Currency
  selectedCurrency = () => {
    for (let i = 0; i < this.state.PriceNames.length; i++) {
      if (this.state.priceValue === this.state.PriceNames[i])
        return i;

    }
  }

  //Function to increase the qty of product
  increase = (i) => {
    const indexNew = [...this.state.myCart];
    indexNew[i].qty = indexNew[i].qty + 1;
    this.setState({ myCart: indexNew })
  }
//Function to decrease the qty of product
  decrease = (i) => {
    const indexNew = [...this.state.myCart];
    indexNew[i].qty = indexNew[i].qty - 1;
    if (indexNew[i].qty === 0) {
      indexNew.splice(i, 1);
      this.setState({ myCart: indexNew })
    }
    this.setState({ myCart: indexNew })
  }


  ///Getting the total price 
  addition = (acc, currentvalue) => {
    return acc + currentvalue.prices[this.selectedCurrency()].amount * currentvalue.qty;
  };
  getTotal = () => {
    this.setState({ total: this.state.myCart.reduce(this.addition, 0) });
  }

  //Adding a product to product details Page
  addToProduct = (item) => {
    this.setState({ myProduct: item })
  }


  //Local storage of the selected currency
  componentDidMount() {
    localStorage.setItem("myPriceValue", JSON.stringify(this.state.priceValue))
  }

  render() {

    return (
      <div className="App">
        <mainContext.Provider value={{
          toggleDet: this.state.toggleDet,
          toggleCurr: this.state.toggleCurr,
          Img: this.state.Img,
          mySelectedProd: this.state.mySelectedProd,
          itemID: this.state.itemID,
          products: this.state.products,
          priceValue: this.state.priceValue,
          myCart: this.state.myCart,
          qty: this.state.qty,
          toggle: this.toggle,
          toggleDetFun: this.toggleDetFun,
          handleClicked: this.handleClicked,
          addToCart: this.addToCart,
          itemSame: this.itemSame,
          selectAttr: this.selectAttr,
          changeAttr: this.changeAttr,
          increase: this.increase,
          decrease: this.decrease,
          addition: this.addition,
          total: this.state.total,
          getTotal: this.getTotal,
          toggleDetV2: this.toggleDetV2,
          handleToggleOnMouse: this.handleToggleOnMouse,
          selectedCurrency: this.selectedCurrency,
          addToProduct: this.addToProduct,
          myProduct: this.state.myProduct,
          addToCartProdDet: this.addToCartProdDet,
          selectAttrProdDet: this.selectAttrProdDet
        }} >
          <BrowserRouter>
            <NavBar />
            <Routes>

              <Route exact={true} index element={<AllPage />} />
              <Route path="/cart" element={<Cart />}></Route>
              <Route path="/productD" element={<ProductDetails />} />
              <Route path="/tech" element={<TechPage />} />
              <Route path="/cloth" element={<ClothPage />} />
            </Routes>

          </BrowserRouter>
        </mainContext.Provider>
      </div>
    )
  }


}

export default App;
