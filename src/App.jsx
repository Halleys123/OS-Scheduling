import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy } from "react";

const Homepage = lazy(() => import("./pages/Homepage"));
const About = lazy(() => import("./pages/About"));
const Scheduller = lazy(() => import("./pages/Scheduller"));

function App() {
  return (
    <div className="w-screen h-screen overflow-hidden p-8 bg-slate-50">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Scheduller />} />
          <Route path="/algorithms" element={<Scheduller />} />
          <Route path="/home" element={<Homepage />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
