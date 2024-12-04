import React, { Component } from "react";

class ShoppingList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: JSON.parse(localStorage.getItem("shoppingList")) || [],
      currentItem: "",
      itemsToRemove: [],
    };
  }

  componentDidUpdate() {
    localStorage.setItem("shoppingList", JSON.stringify(this.state.items));
  }

  handleInputChange = (event) => {
    this.setState({ currentItem: event.target.value });
  };

  handleAddItem = (event) => {
    event.preventDefault();
    const { items, currentItem } = this.state;

    if (currentItem.trim() === "") return;

    this.setState({
      items: [...items, { name: currentItem, bought: false }],
      currentItem: "",
    });
  };

  handleDeleteItem = (index) => {
    const { itemsToRemove } = this.state;

    this.setState(
      { itemsToRemove: [...itemsToRemove, index] },
      () => {
        setTimeout(() => {
          const { items, itemsToRemove } = this.state;
          const updatedItems = items.filter((_, i) => i !== index);
          const updatedItemsToRemove = itemsToRemove.filter((i) => i !== index);
          this.setState({ items: updatedItems, itemsToRemove: updatedItemsToRemove });
        }, 1000);
      }
    );
  };

  handleToggleBought = (index) => {
    const { items } = this.state;
    const updatedItems = items.map((item, i) =>
      i === index ? { ...item, bought: !item.bought } : item
    );
    this.setState({ items: updatedItems });
  };

  render() {
    const { items, currentItem, itemsToRemove } = this.state;

    return (
      <div className="d-flex flex-column">
        <div className="container pt-4 flex-grow-1">
          <h1 className="text-center" style={{ fontSize: "2rem" }}>Shopping List</h1>
          <p className="text-center" style={{ fontSize: "1.2rem" }}>
            Add, remove, and manage your shopping list
          </p>

          <form className="d-flex flex-column align-items-center mt-4" onSubmit={this.handleAddItem}>
            <input
              type="text"
              className="form-control mb-3"
              style={{ maxWidth: "500px", width: "100%", fontSize: "1.2rem" }}
              placeholder="Enter a product"
              value={currentItem}
              onChange={this.handleInputChange}
            />
            <button
              type="submit"
              className="btn btn-success w-100"
              style={{ maxWidth: "500px", fontSize: "1.2rem" }}
            >
              Add
            </button>
          </form>

          <div className="mt-4">
            <ul
              className="list-group"
              style={{
                maxWidth: "500px",
                margin: "0 auto",
                padding: "0",
                listStyleType: "none",
              }}
            >
              {items.map((item, index) => (
                <li
                  key={index}
                  className={`list-group-item d-flex justify-content-between align-items-center 
                  ${item.bought ? "text-decoration-line-through" : ""} 
                  ${itemsToRemove.includes(index) ? "fade-out" : "fade-in"}`}
                  style={{
                    fontSize: "1.2rem",
                    padding: "15px",
                    marginBottom: "5px",
                    width: "100%",
                    boxSizing: "border-box",
                    transition: "opacity 1s ease-out",
                  }}
                >
                  {item.name}
                  <div>
                    <button
                      className={`btn btn-sm ${item.bought ? "btn-secondary" : "btn-success"} me-2`}
                      onClick={() => this.handleToggleBought(index)}
                      style={{ fontSize: "1rem" }}
                    >
                      {item.bought ? "Unmark" : "Bought"}
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => this.handleDeleteItem(index)}
                      style={{ fontSize: "1rem" }}
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default ShoppingList;

