// App.js

// 导入 Route, Routes 组件
import { Route, Routes, Link } from "react-router-dom";
import Home from "./views/Home/home";
import Index from './views/Index/Index'
import About from "./views/About/About";
import Works from './views/Works/Works'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route path="" element={<Index/>}/>
        <Route path="about" element={<About />} />
        <Route path="works" element={<Works/>}/>
      </Route>
    </Routes>
  );
}
export default App;
