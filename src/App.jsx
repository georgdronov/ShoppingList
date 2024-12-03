import { Fragment, useState } from "react";
import "./App.css";
import ShoppingList from "./components/ShoppingList";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <ShoppingList />
    </>
  );
}

export default App;
