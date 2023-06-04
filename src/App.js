import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Gallery from "./pages/gallery";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          {/* <Route path="/:username" element={<Profile />}></Route> */}
          <Route path="/gallery" element={<Gallery />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
