# in memory database for store products

from models import ProductResponse

products_db = {
    1: ProductResponse(id=1, name="Laptop", price=999.99, category="Electronics"),
    2: ProductResponse(id=2, name="Mouse", price=29.99, category="Electronics"),
    3: ProductResponse(id=3, name="Desk Chair", price=299.99, category="Furniture"),
}
next_id = 4
