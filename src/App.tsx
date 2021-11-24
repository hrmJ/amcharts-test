import { Link } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <>
      <nav>
        <Link to="/">Home</Link>
        <Link to="line">Line chart</Link>
      </nav>
      <main className="main"></main>
    </>
  );
}

export default App;
