import React from "react";
import { useLocation } from "react-router-dom";

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
      </div>
    </div>
  );
}

export default ArticleDetail;
