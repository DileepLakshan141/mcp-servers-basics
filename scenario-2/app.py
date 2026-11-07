from fastapi import FastAPI, HTTPException
from models import ProductResponse, Product
from db import products_db, next_id

app = FastAPI(title="sample-e-commerce-api", version="1.1.0")


@app.get("/products", response_model=list[ProductResponse])
def list_products(
    category: str | None = None,
    max_price: float | None = None,
):
    """list all the products with optional filtering"""
    products = list(products_db.values())

    if category:
        products = [prod for prod in products if prod.category == category]
    if max_price:
        products = [prod for prod in products if prod.price <= max_price]

    return products


@app.get("/products/{product_id}", response_model=ProductResponse)
def get_product(product_id: int):
    """Get a specific product by ID."""
    if product_id not in products_db:
        raise HTTPException(status_code=404, detail="Product not found")
    return products_db[product_id]


@app.post("/products", response_model=ProductResponse)
def create_product(product: Product):
    """Create a new product."""
    global next_id
    product_response = ProductResponse(id=next_id, **product.model_dump())
    products_db[next_id] = product_response
    next_id += 1
    return product_response


@app.put("/products/{product_id}", response_model=ProductResponse)
def update_product(product_id: int, product: Product):
    """Update an existing product."""
    if product_id not in products_db:
        raise HTTPException(status_code=404, detail="Product not found")
    products_db[product_id] = ProductResponse(
        id=product_id,
        **product.model_dump(),
    )
    return products_db[product_id]


@app.delete("/products/{product_id}")
def delete_product(product_id: int):
    """Delete a product."""
    if product_id not in products_db:
        raise HTTPException(status_code=404, detail="Product not found")
    del products_db[product_id]
    return {"message": "Product deleted"}
