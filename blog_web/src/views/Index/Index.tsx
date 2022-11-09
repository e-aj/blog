import React, { useState, useEffect } from "react";
import "./Index.less";
import { Carousel } from "antd";
import avatar1 from "../../assets/avatar1.png";
import avatar2 from "../../assets/avatar2.png";
import { getWorksList } from "../../api/getData";
import {Link} from 'react-router-dom'

function Index() {
  interface workListType {
    id: number;
    name: string;
    link: string;
    cover_img?: string;
    pub_date?: string;
    last_date?: string;
    cate_id?: number;
    author_id?: number;
  }
  const [avatar, setAvatar] = useState(avatar1);
  const [worksList, setWorkList] = useState<workListType[]>([]);

  const checkAvatar = () => {
    console.log(11);
    setInterval(() => {
      avatar === avatar1 ? setAvatar(avatar2) : setAvatar(avatar1);
    }, 2000);
  };

  const getWorks = () => {
    getWorksList().then((res) => {
      if (res.status === 0) {
        setWorkList(res.data);
        localStorage.setItem("worksList", JSON.stringify(res.data));
      }
    });
  };
  useEffect(() => {
    let strogeWorksList = localStorage.getItem("worksList");
    if (strogeWorksList) {
      setWorkList(JSON.parse(strogeWorksList));
    } else {
      getWorks();
    }
    checkAvatar();
  }, []);

  interface appListType {
    src: string;
    link: string;
  }
  const [appList, setAppList] = useState<appListType[]>([
    {
      src: require("../../assets/u147.png"),
      link: "https://github.com/e-aj",
    },
  ]);
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
            <div className="app">
                {appList.map((item,key) => {
                  return (

                    <a key={key} href={item.link}>
                      <div className="circle">
                        <img src={item.src} alt="" />
                      </div>
                    </a>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
      <div className="content">
        <Carousel autoplay>
          {worksList.map((item) => {
            return (
              <div key={item.id}>
                <div className="coverTitle">
                  <div className="name">{item.name}</div>
                  <a href={item.link}>
                    <div className="start">开始阅读</div>
                  </a>
                </div>
                <img src={item.cover_img} alt="" />
              </div>
            );
          })}
        </Carousel>
      </div>
    </div>
  );
}

export default Index;
