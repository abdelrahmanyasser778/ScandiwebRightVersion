import React, { Component } from 'react'
import mainContext from "../Context/mainContext";
class Prices extends Component {
    static contextType = mainContext;
    render() {
        const { symbolName, symbolUnit } = this.props
        const { priceValue, handleClicked } = this.context;
        return (
            <div>
                <div className={`sign ${priceValue === symbolUnit ? 'colorPRice' : 'signNormal'}`} id={symbolUnit} onClick={handleClicked} >{symbolUnit}  {symbolName}</div>
            </div>
        )
    }
}

export default Prices
