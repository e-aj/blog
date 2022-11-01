// App.js

// 导入 Route, Routes 组件
import { Route, Routes } from "react-router-dom";
import Home from "./views/Home/home";
import Index from "./views/Index/Index";
import About from "./views/About/About";
import Works from "./views/Works/Works";
import Article from "./views/Article/Article";
import ArticleDetail from "./views/Article/ArticleDetail";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route path="" element={<Index />} />
        <Route path="about" element={<About />} />
        <Route path="works" element={<Works />} />
        <Route path="article" element={<Article />} />
        <Route path="articleDetail" element={<ArticleDetail />} />
      </Route>
    </Routes>
  );
}
export default App;
