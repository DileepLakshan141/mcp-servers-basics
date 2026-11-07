"""
This file is contains a basic tool called calculator which exposed inside a MCP server
"""

from fastmcp import FastMCP

mcp = FastMCP(name="calculator")


@mcp.tool(name="add", description="Adds two numbers together")
def add(a: float, b: float) -> float:
    """
    Adds two numbers together.

    Args:
        a (float): The first number.
        b (float): The second number.

    Returns:
        float: The sum of the two numbers.
    """
    return a + b


@mcp.tool(name="subtract", description="Subtracts the second number from the first")
def subtract(a: float, b: float) -> float:
    """
    Subtracts the second number from the first.

    Args:
        a (float): The first number.
        b (float): The second number.

    Returns:
        float: The difference of the two numbers.
    """
    return a - b


@mcp.tool(name="multiply", description="Multiplies two numbers together")
def multiply(a: float, b: float) -> float:
    """
    Multiplies two numbers together.

    Args:
        a (float): The first number.
        b (float): The second number.

    Returns:
        float: The product of the two numbers.
    """
    return a * b


@mcp.tool(name="divide", description="Divides the first number by the second")
def divide(a: float, b: float) -> float:
    """
    Divides the first number by the second.

    Args:
        a (float): The first number.
        b (float): The second number.

    Returns:
        float: The quotient of the two numbers.

    Raises:
        ValueError: If the second number is zero.
    """
    if b == 0:
        raise ValueError("Cannot divide by zero.")
    return a / b


if __name__ == "__main__":
    mcp.run()
