import React, { useEffect, useState } from "react";
import "./Works.less";
import { getWorksList } from "../../api/getData";
import { Spin } from "antd";

function Works() {
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
                <div className="text">
                  <span>{worksList[0].name}</span>
                </div>
                <img src={worksList[0].cover_img} alt="" />
              </div>
              <div className="right">
                <div className="text">
                  <span>{worksList[1].name}</span>
                </div>
                <img src={worksList[1].cover_img} alt="" />
              </div>
            </div>
            <div className="bottom">
              <div className="left">
              <div className="text">
                  <span>{worksList[2].name}</span>
                </div>
                <img src={worksList[2].cover_img} alt=""  />
              </div>
              <div className="center">
              <div className="text">
                  <span>{worksList[3].name}</span>
                </div>
                <img src={worksList[3].cover_img} alt="" />
              </div>
              <div className="right">
              <div className="text">
                  <span>{worksList[4].name}</span>
                </div>
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
