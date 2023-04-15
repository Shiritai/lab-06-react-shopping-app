import {
    Grid,
    Divider,
} from '@material-ui/core'

import Menu from './src/component/Menu'
import Cart from './src/component/Cart'
import Wallet from './src/component/Wallet'

import Burger from './src/img/Burger.jpg'
import Fries from './src/img/Fries.jpg'
import Nugget from './src/img/Nugget.jpg'
import Cola from './src/img/Cola.jpg'

export class Root extends React.Component {
    constructor(props) {
        super(props);

        this.itemPrice = {
            Burger: 50,
            Fries: 40,
            Nugget: 30,
            Cola: 20, 
        }

        this.state = {
            cartList: [],
            money: 100,
        };
    }

    // TODO-2: add new item to shopping cart
    // Hint: check CartItem for the format of the items in the cart
    handleAddToCart = (itemAmount) => {
        let cartList = this.state.cartList
        for (const it in itemAmount) {
            if (itemAmount[it] > 0) {
                cartList.push({
                    name: it,
                    amount: itemAmount[it]
                })
            }
        }
        console.log(cartList)
        this.setState({cartList: cartList})
    }

    // TODO-5: clear shopping cart
    handleClearCart = () => {
        this.setState({cartList: []})
    }

    // TODO-6: remove specific item in shopping cart
    handleDeleteCartItem = (idx) => {
        this.setState({cartList: this.state.cartList.filter((_, i) => i != idx)})
    }

    // To pay money or charge
    handleAdjustMoney = (val) => {
        return new Promise((res, rej) => {
            if (this.state.money + val >= 0) {
                this.setState(state => {
                    return { money: state.money + val }
                });
                res('Payment Successful!');
            }
            else rej('Insufficient Balance!')
        })
    }

    render() {
        return (
            <Grid container direction="row" justifyContent="space-evenly" style={{ height: '100vh' }}>
                <Grid item xs={8}>
                    {/* TODO: pass functions down to children as props */}
                    <Menu
                        itemPrice={this.itemPrice}
                        handleAddToCart={this.handleAddToCart}
                    />
                </Grid>
                <Divider orientation="vertical"/>
                <Grid item xs={3} container direction="column" justifyContent="flex-start">
                    {/* TODO: pass functions down to children as props */}
                    <Wallet
                        money={this.state.money}
                        handleAdjustMoney={this.handleAdjustMoney}
                    />
                    {/* TODO: pass functions down to children as props */}
                    <Cart
                        itemPrice={this.itemPrice}
                        cartList={this.state.cartList}
                        handleDeleteCartItem={this.handleDeleteCartItem}
                        handleAdjustMoney={this.handleAdjustMoney}
                        handleClearCart={this.handleClearCart}
                    />
                </Grid>
            </Grid>
        );
    }
}

ReactDOM.render(<Root />, document.getElementById('root'));