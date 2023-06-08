import logo from "./logo.svg";
import "./App.css";
import Home from "./components/Home";
import Login from "./components/Login";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Signup from "./components/Signup";
import Navbar from "./components/Navbar";

import { stage, Layer, Image } from "react-konva";
import Generator from "./components/Generator";
import MemeGenerator from "./components/MemeGenerator";
import Publish from "./components/Publish";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="home" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="Signup" element={<Signup />} />
          {/* <Route path="generator" element={<Generator />} /> */}
          <Route path="memegenerator" element={<MemeGenerator />} />
          <Route path="publish" element={<Publish />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
