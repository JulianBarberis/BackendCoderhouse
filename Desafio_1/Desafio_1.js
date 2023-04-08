class ProductManager {
    #products

    constructor() {
        this.#products = []

    }
    //generacion del ID
    #generateID = () => {
        let id = 0
        if (this.#products.length === 0) id = 1
        else id = this.#products[this.#products.length - 1].id + 1
        return id

    }

    getProducts = () => {
        return this.#products
    }

    getProductsById = (id) =>{
        const arraySearched = this.#products.filter(product => (product.id == id ))
        if (arraySearched.id == id ){
           console.log(arraySearched)
           return(arraySearched)
        }else{
            console.log("Not Found")
        }
        
    }
    
    // validacion de required en todos los argumentos
    validateFields = (title,description,price,thumbnail,code,stock) => {

        if (!title || !description || !price || !thumbnail || !code || !stock) {
            console.error("Incompleted fields")
        }else{
            console.log("All good")
        }
        return 
    }

    addProducts = (title, description, price, thumbnail, code, stock) => {
        this.validateFields(title, description, price, thumbnail, code, stock)

        this.#products.includes(code==code)

        let id = this.#generateID()
        let newProduct = {
            id, title, description, price, thumbnail, code, stock
        }
        this.#products.push(newProduct)

    }

}

const productManager = new ProductManager()
productManager.addProducts("Remera", "Remera negra estampada",5000, "foto_remera", 121546, 42)
productManager.addProducts("Jean", "Jean Ajustado azul claro", 7000, "foto_jean", 452615, 25)
productManager.addProducts("Zapatillas", "Zapatillas negras sport", 15000, "foto_zapas", 452615, 12)

console.log(productManager.getProducts())

console.log(productManager.getProductsById(2))
