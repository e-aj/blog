import React, { useState } from "react";
import { Button, Carousel } from "antd";
import "./home.less";
import avatar1 from "../../assets/avatar1.png";
import avatar2 from "../../assets/avatar2.png";

function Home() {
  const [avatar, setAvatar] = useState(avatar1);

  const checkAvatar = () => {
    setInterval(() => {
      avatar === avatar1 ? setAvatar(avatar2) : setAvatar(avatar1);
    }, 2000);
  };
  checkAvatar();
  return (
    <div className="Home">
      <div className="container">
        <div className="nav">
          <ul>
            <li>首页</li>
            <li>作品</li>
            <li>想说</li>
            <li>关于</li>
            <li>下载模板</li>
          </ul>
        </div>
        <div className="line"></div>
        <div className="content">
          <div className="top">
            <div className="avatar">
              <Carousel autoplay effect="fade" autoplaySpeed={2000} dots={false}>
                <div>
                 <img src={avatar1} alt="" />
                </div>
                <div>
                  <img src={avatar2} alt="" />
                </div>
              </Carousel>
            </div>
            <div className="right">
              <div className="title">Hello, 欢迎来到 <span>世界是棵树</span></div>
              <Carousel autoplay effect="fade" autoplaySpeed={2000} dots={false}>
                <div>
                心之所向，身之所往，价值所在。
                </div>
                <div>
                互联网时代，没有自己的网站意味着你在这个世界上不存在。
                </div>
              </Carousel>
              <div className="socical">
                <div className="socil_name">
                社交媒体
                </div>
                <div className="app">222</div>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
