import React, { useState,useEffect } from "react";
import './Index.less'

import {  Carousel } from "antd";
import avatar1 from "../../assets/avatar1.png";
import avatar2 from "../../assets/avatar2.png";
import {getWorksList} from '../../api/getData'

function Index() {
  const [avatar, setAvatar] = useState(avatar1);

  const checkAvatar = () => {
    console.log(11)
    setInterval(() => {
      avatar === avatar1 ? setAvatar(avatar2) : setAvatar(avatar1);
    }, 2000);
  };
  useEffect(()=>{
    checkAvatar();
  },[])



  const onChange = (currentSlide: number) => {
    console.log(currentSlide);
  };
  return (
    <div className="index">
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
          <div className="title">
            Hello, 欢迎来到 <span>世界是棵树</span>
          </div>
          <Carousel autoplay effect="fade" autoplaySpeed={2000} dots={false}>
            <div>心之所向，身之所往，价值所在。</div>
            <div>互联网时代，没有自己的网站意味着你在这个世界上不存在。</div>
          </Carousel>
          <div className="socical">
            <div className="socil_name">社交媒体</div>
            <div className="app">222</div>
          </div>
        </div>
      </div>
      <div className="content">
      <Carousel afterChange={onChange} autoplay>
      <div>
        <h3 >1</h3>
      </div>
    </Carousel>
      </div>
    </div>
  );
}

export default Index;
