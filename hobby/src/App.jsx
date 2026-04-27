import { BrowserRouter, Routes, Route } from "react-router-dom"

import Home from "./Home"
import Create from "./Create"
import Post from "./Post"
import Edit from "./Edit"
import "./App.css"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/post/:id" element={<Post />} />
        <Route path="/edit/:id" element={<Edit />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App