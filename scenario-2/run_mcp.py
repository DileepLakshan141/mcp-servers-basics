from fastmcp import FastMCP
from fastmcp.client import Client
from app import app
from models import ProductResponse
from db import products_db
import asyncio

mcp = FastMCP.from_fastapi(app=app)


async def demo():
    async with Client(mcp) as client:
        tools = await client.list_tools()
        print(f"Available tools: {[t.name for t in tools]}")

        result = await client.call_tool(
            "create_product_products_post",
            {
                "name": "Wireless Keyboard",
                "price": 79.99,
                "category": "Electronics",
                "description": "Bluetooth mechanical keyboard",
            },
        )
        print(f"Created product: {result.data}")

        result = await client.call_tool(
            "list_products_products_get", {"category": "Electronics", "max_price": 100}
        )
        print(f"Affordable electronics: {result.data}")


@mcp.tool
def get_product(product_id: int) -> ProductResponse:
    """Get a product by ID."""
    return products_db[product_id]


if __name__ == "__main__":
    asyncio.run(demo())
