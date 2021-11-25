import { Link, Outlet } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <>
      <nav>
        <Link to="/">Home</Link>
        <Link to="line">Line chart</Link>
        <Link to="covtest">Covid cases</Link>
      </nav>
      <main className="main">
        <Outlet></Outlet>
      </main>
    </>
  );
}

export default App;
