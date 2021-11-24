import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "../src/App";
import { LineChart } from "../src/LineChart";

function getAppWithRoutes() {
  return render(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}></Route>
        <Route path="/line" element={<LineChart />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

describe("app navigation", () => {
  it("moves the user to the linecharts page", async () => {
    const { getByRole } = getAppWithRoutes();
    const link = getByRole("link", { name: /Line chart/i });
    fireEvent.click(link);
    const svg = document.querySelector("svg");
    expect(svg).toBeInTheDocument();
  });
});
