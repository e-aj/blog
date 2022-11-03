import React, { useEffect, useState } from "react";
import "./Works.less";
import { getWorksList } from "../../api/getData";
import {  Spin } from "antd";

function Works() {
  interface workListType {
    id: number;
    name: string;
    content: string;
    cover_img?: string;
    pub_date?: string;
    last_date?: string;
    cate_id?: number;
    author_id?: number;
  }
  const [worksList, setWorksList] = useState<workListType[]>([]);
  const [loadingShow, setLoadingShow] = useState<boolean>(true);
  const getWorks = () => {
    let data = {
      currentPage: 1,
      pageSize: 10,
    };
    getWorksList(data).then((res: any) => {
      if (res.status === 0) {
        setWorksList(res.data);
        setLoadingShow(false);
      }
    });
  };
  useEffect(() => {
    getWorks();
  }, []);

  return (
    <div className="works">
      <div className="title">
        <span className="bold">作品集</span>
        <span> / </span>
        <span>Works Collection</span>
      </div>
      <div className="content">
        {loadingShow ? (
          <Spin></Spin>
        ) : (
          <div className="worksList">
            <div className="top">
              <div className="left">
                <img src={worksList[0].cover_img} alt="" />
              </div>
              <div className="right">
                <img src={worksList[1].cover_img} alt="" />
              </div>
            </div>
            <div className="bottom">
              <div className="left">
                <img src={worksList[2].cover_img}  alt="" />
              </div>
              <div className="center">
                <img src={worksList[3].cover_img} alt="" />
              </div>
              <div className="right">
                <img src={worksList[4].cover_img} alt="" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Works;
