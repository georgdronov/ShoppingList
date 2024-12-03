import { Fragment, useState } from "react";
import "./App.css";
import ShoppingList from "./components/ShoppingList";
import { Footer } from "./components/Footer";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <ShoppingList />
      <Footer/>
    </>
  );
}

export default App;
