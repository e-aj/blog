import React, { useState } from "react";
import "./home.less";
import { Link, Outlet } from "react-router-dom";

function Home() {
  return (
    <div className="Home">
      <div className="container">
        <div className="nav">
          <ul>
            <li>
              <Link to="/">首页</Link>
            </li>
            <li>
              <Link to="/works">作品</Link>
            </li>
            <li>
              <Link to="">想说</Link>
            </li>
            <li>
              <Link to="/about">关于</Link>
            </li>
            <li>
              <Link to="">XX</Link>
            </li>
          </ul>
        </div>
        <div className="line"></div>
        <div className="content">
          <Outlet />
        </div>
        <div className="foot">
        <span>333</span>
        <span>23333</span>
      </div>
      </div>
    </div>
  );
}

export default Home;
