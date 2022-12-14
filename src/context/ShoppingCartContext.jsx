import { createContext, useContext, useState} from "react"
import { ShoppingCart } from "../components/ShoppingCart"

const ShoppingCartContext = createContext({})

export function useShoppingCart() {
    return useContext(ShoppingCartContext)
}

export function ShoppingCartProvider({children}){
    const [isOpen, setIsOpen] = useState(false)
    const [cartItems, setCartItems] = useState([])

    const cartQuantity = cartItems.reduce(
        (quantity, item) => item.quantity + quantity, 0)

    const openCart = () => setIsOpen(true)
    const closeCart = () => setIsOpen(false)

    function getItemQuantity(id) {
        return cartItems.find(item => item.id === id)?.quantity || 0
    }
    function increaseCartQuantity(id){
        const copyCartItems = [...cartItems]

        const item = copyCartItems.find((product) => product.id === id)

        if(!item){
            copyCartItems.push({id: id, quantity: 1})
        }else {
            item.quantity = item.quantity + 1
        }

        setCartItems(copyCartItems)
    }
    function decreaseCartQuantity(id){
        const copyCartItems = [...cartItems]

        const item = copyCartItems.find((product) => product.id === id)

        if(item.quantity >= 1){
            item.quantity = item.quantity - 1
            setCartItems(copyCartItems)
        }else {
            const arrayFiltered = copyCartItems.filter(product => product.id !== id)
        }
        setCartItems(arrayFiltered)
    }
    function removeFromCart(id){
        setCartItems(currItems => {
            return currItems.filter(item => item.id !== id)
        })
    }

    return (
        <ShoppingCartContext.Provider 
        value={{ getItemQuantity, 
                 increaseCartQuantity, 
                 decreaseCartQuantity, 
                 removeFromCart,
                 openCart,
                 closeCart,
                 cartItems,
                 cartQuantity }}>
            {children}
            <ShoppingCart isOpen={isOpen} />
        </ShoppingCartContext.Provider>
    )
}