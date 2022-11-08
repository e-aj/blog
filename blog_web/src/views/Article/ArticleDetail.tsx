import React from "react";
import { useLocation } from "react-router-dom";
import  './ArticleDetail.less'

function ArticleDetail() {
  const stateParams = useLocation();
  const articleDta = stateParams.state;
  console.log(articleDta);
  return (
    <div className="ArticleDetail">
      <div className="title">
        <span className="bold">文章详情</span>
        <span> / </span>
        <span>Articles Detail</span>
      </div>
      <div className="content">
          <h1>{articleDta.title}</h1>
          <div className="else">
            <span>编辑时间：{articleDta.last_date}</span>
            <span className="author">作者：{articleDta.author_id}</span>
          </div>
          <div  className="main" dangerouslySetInnerHTML={{
              __html: articleDta.content
            }}/>
      </div>
    </div>
  );
}

export default ArticleDetail;
