import React, { Component } from 'react'
import goToPrevious from '../images/prev.png'
import goToNext from '../images/next.png'
import mainContext from "../Context/mainContext";
class CartGallery extends Component {
    static contextType = mainContext;
    constructor(props) {
        super(props);
        this.state = {
            currentIndex: 0
        };
    }
    //Function to get the pervious img
    prev = (item) => {
        if (this.state.currentIndex !== 0) {
            this.setState({ currentIndex: this.state.currentIndex - 1 })
        } else {
            this.setState({ currentIndex: item.gallery.length - 1 })
        }
    };
    //Function to get the next Img
    next = (item) => {
        if (item.gallery.length > this.state.currentIndex + 1) {
            this.setState({ currentIndex: this.state.currentIndex + 1 })
        } else {
            this.setState({ currentIndex: 0 })
        }
    };
    render() {
        const { item } = this.props
        return (
            <div>
                <img alt="" src={item.gallery[this.state.currentIndex]} className="cartImagge" width="250px" />
                {
                    item.gallery.length > 1 ? (
                        <div className='btnsImage'>
                            <div onClick={() => this.prev(item)}>
                                <img alt="" className='prevImg' src={goToPrevious} />
                            </div>
                            <div onClick={() => { this.next(item) }}>
                                <img className='nextImg' alt="" src={goToNext} />
                            </div>
                        </div>

                    ) : null
                }
            </div>
        )
    }
}

export default CartGallery
