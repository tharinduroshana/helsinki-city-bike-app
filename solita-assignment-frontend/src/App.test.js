import { render } from '@testing-library/react';
import {BrowserRouter} from "react-router-dom";
import TripsTable from "./screens/TripsTable";
import StationsTable from "./screens/StationsTable";
import StationDetails from "./screens/StationDetails";
import TripScreen from "./screens/TripScreen";

describe("TripsTable", () => {
  it("renders correctly", async () => {
    render(
        <BrowserRouter>
          <TripsTable />
        </BrowserRouter>
    );
  });
});

describe("StationsTable", () => {
  it("renders correctly", async () => {
    render(
        <BrowserRouter>
          <StationsTable />
        </BrowserRouter>
    );
  });
});

describe("StationDetails", () => {
  it("renders correctly", async () => {
    render(
        <BrowserRouter>
          <StationDetails />
        </BrowserRouter>
    );
  });
});

describe("TripScreen", () => {
  it("renders correctly", async () => {
    render(
        <BrowserRouter>
          <TripScreen />
        </BrowserRouter>
    );
  });
});