import { render } from "@testing-library/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "../src/App";

describe("The app as a whole", () => {
  it("renders ok", () => {
    render(
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}></Route>
        </Routes>
      </BrowserRouter>
    );
  });
});
