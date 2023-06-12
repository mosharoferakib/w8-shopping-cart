import { v4 as uuidv4 } from "uuid"
import { Item, User } from "./index"

export default class Shop {

    public static myUser: User|undefined
    public static currentCart: Shop

    constructor(
        private _shopName: string,
        private _parent: HTMLElement,
        private _id: string = uuidv4(),
        private _products: Item[] = []
    ){
        this.addDefaultItems()
        this.parent.innerHTML = ""
        this.parent.id = "shopContainer"
        Object.assign(this.parent.style)
        this.parent.append(this.showItems(), this.updateCart())
    }
    public get parent(): HTMLElement {
        return this._parent
    }
    public set parent(value: HTMLElement) {
        this._parent = value
    }
    public get products(): Item[] {
        return this._products
    }
    public set products(value: Item[]) {
        this._products = value
    }
    public get shopName(): string {
        return this._shopName
    }
    public set shopName(value: string) {
        this._shopName = value
    }
    public get id(): string {
        return this._id
    }
    public set id(value: string) {
        this._id = value
    }
    
    /*  @ts-ignore */
    public static loginUser = (e): void => {
        e.preventDefault()
        const userInput = document.getElementById('userInput') as HTMLInputElement
        const ageInput = document.getElementById('ageInput') as HTMLInputElement
        const cartContainer: HTMLElement = document.getElementById('cartContainer')!
        const loginForm: HTMLElement = document.getElementById('loginForm')!
        const loginText: HTMLElement = document.getElementById('loginText')!
        Object.assign(loginForm.style)
        loginText.innerText = `Welcome, ${userInput.value}`
        Shop.myUser = User.loginInUser(userInput.value, ageInput.value)
        Shop.currentCart = new Shop("Regalis", cartContainer)
    }

    public static refreshCart = (): void => {
        document.getElementById('cartDivElement')?.replaceChildren(Shop.currentCart.updateCart())
    }

    public showItems = (): HTMLDivElement => {
        const div: HTMLDivElement = document.createElement('div')
        for (let productItem of this.products) {
            div.append(productItem.itemElement(productItem))
        }
        Object.assign(div.style)
        return div
    }

    /* @ts-ignore */
    public updateCart = (): HTMLDivElement => {
        if (Shop.myUser) {
            const div: HTMLDivElement = document.createElement('div')
            div.id = "cartDivElement"
            if (Shop.myUser.cart.length > 0) {
                div.appendChild(Shop.myUser.cartHTMLElement())
            } else {
                const noItems: HTMLElement = document.createElement('p') 
                noItems.innerText = "Your Cart Is Empty."
                div.appendChild(noItems)
            }

            Object.assign(div.style)
            return div
        }
    }

    private addDefaultItems = (): void => {
        this._products.push(new Item("Apples, 5 lbs", 8.99, "Granny Smith Apples"))
        this._products.push(new Item("Oranges, 3 lbs", 6.99, "Navel Oranges"))
        this._products.push(new Item("Bananas, 3 lbs", 2.99, "Organic Bananas"))
        this._products.push(new Item("Strawberries, 1 lb", 5.99, "Fresh strawberries"))
        this._products.push(new Item("CocaCola, 16oz", 2.79, "Coke"))
        this._products.push(new Item("Milk, 1 Gallon", 5.99, "Whole Milk"))
    }
}