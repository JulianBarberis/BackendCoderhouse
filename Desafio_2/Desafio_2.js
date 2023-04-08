import fs from 'fs'

class ProductManager {
    #products
    #path

    constructor(path) {
        this.#path = path;
        this.#products = [];
        this.nextId = 1;
        this.nextCode = "10000";
        this.loadProducts();
    }

    loadProducts() {
        try {
            const data = fs.readFileSync(this.#path, "utf-8");
            this.#products = JSON.parse(data);
            this.nextId = this.#products.reduce((acc, p) => Math.max(acc, p.id), 0) + 1;
            this.nextCode = this.#products.reduce((acc, p) => Math.max(acc, p.code), 0) + 1;
        } catch (error) {
            console.error(`Error al buscar el archivo desde ${this.#path}: ${error}`);
        }
    }

    saveProducts() {
        try {
            const data = JSON.stringify(this.#products, null, 4);
            fs.writeFileSync(this.#path, data);
        } catch (error) {
            console.error(`Error guardando el producto en ${this.#path}: ${error}`);
        }
    }

    addProduct(title, category, description, size, price, thumbnail, stock) {

        const product = {
            id: this.nextId++,
            title,
            category,
            description,
            size,
            price,
            thumbnail,
            code: this.nextCode++,
            stock,
        };
        this.#products.push(product);

        this.saveProducts();
        return product;
    }

    getProducts() {
        return [...this.#products];
    }

    getProductById(id) {
        const indexId = this.#products.find(p => p.id === id);
        indexId ? console.log(indexId) : console.log(`No se encontró el producto con el id: ${id}`)
    }

    updateProduct(id, data) {
        const index = this.#products.findIndex(p => p.id === id);
        if (index !== -1) {
            const product = { ...this.#products[index], ...data, id };
            this.#products.splice(index, 1, product);
            this.saveProducts();
            return product;
        }
        return null;
    }

    deleteProduct(id) {
        const index = this.#products.findIndex(p => p.id === id);
        if (index !== -1) {
            this.#products.splice(index, 1);
            this.saveProducts();
            return true;
        }
        return false;
    }
}

// Ejemplo de uso:
const productManager = new ProductManager("products.json")

//Agregar Productos
productManager.addProduct("Remera Kevingston", "Remera" , "Remera Kevingston negra estampada", "M", 5000, "foto_remera", 42);
productManager.addProduct("Jean Kevingston", "Jean", "Jean Kevingston desgastado", "42", 7000, "foto_jean", 25);
productManager.addProduct("Zapatillas Nike", "Zapatillas", "Zapatillas Nike negras con detalles blancos ", "40", 15000, "foto_zapas", 12);


//Modificar Productos segun su ID
productManager.updateProduct(3, { price: '8000' });
productManager.updateProduct(11, { size: '44' });
productManager.updateProduct(20, { size: '42' });


//Borrar un Producto segun su ID
productManager.deleteProduct(2);
productManager.deleteProduct(4);
productManager.deleteProduct(9);

//Buscar un Producto segun su ID
productManager.getProductById(1);
productManager.getProductById(9);
productManager.getProductById(12);

//Listar todos los productos
console.log(productManager.getProducts());
