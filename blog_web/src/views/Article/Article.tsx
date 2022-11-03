import React, { useState, useEffect } from "react";
import "./Article.less";
import { getArticleList } from "../../api/getData";
import {  List } from "antd";
import { Link } from "react-router-dom";

function Article() {
  interface articleListType{
    id:number,
    title:string,
    content:string,
    cover_img?:string,
    pub_date?:string,
    last_date?:string,
    cate_id?:number,
    author_id?:number
  }
  const [articleList, setArticleList] = useState<articleListType[]>([]);

  const getArticle = () => {
    let data = {
      currentPage: 1,
      pageSize: 10,
    };
    getArticleList(data).then((res) => {
      setArticleList(res.data);
    });
  };
  useEffect(() => {
    getArticle();
  }, []);

  return (
    <div className="article">
      <div className="title">
        <span className="bold">文章集</span>
        <span> / </span>
        <span>Articles Collection</span>
      </div>
      <div className="content">
        <List
          itemLayout="horizontal"
          dataSource={articleList}
          renderItem={(item) => (
            <List.Item>
              <img src={item.cover_img} alt="" className="left" />
              <div className="center">
                <div className="artTitle">{item.title}</div>
                <div className="lastDate">{item.last_date}</div>
              </div>
              <Link className="right"  to={`/articleDetail/${item.id}`} state={item}>
                查看
              </Link>
            </List.Item>
          )}
        />
      </div>
    </div>
  );
}

export default Article;