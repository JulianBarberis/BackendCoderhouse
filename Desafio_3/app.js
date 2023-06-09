const express = require('express')
const path = require("path")

const ProductManager = require('./ProductManager.js')
const manager = new ProductManager("./products.json")

const app = express()
app.use(express.json())
const port = 8080

app.get('/', (req, res) => {
    res.status(200).send('<h1>Tienda Online</h1>')
})

app.get('/products', async (req, res) => {
    const limit = parseInt(req.query.limit)
    const products = manager.getProducts()
    if (isNaN(limit)){
        res.status(200).json(products)
    } else {
        res.status(200).json(products.slice(0, limit))
    }
    
})


app.get('/products/:pid', async (req, res) => {
    const id = parseInt(req.params.pid)
    const product = manager.getProductById(id)
    if (product) {
        res.status(200).json(product)
    }else{
        res.status(404).json({ error: "Producto no encontrado!!" })
    }
})


app.listen(port, () => {
    console.log('Server Up')
}) 