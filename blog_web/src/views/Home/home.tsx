import React, { useEffect, useState } from "react";
import "./home.less";
import { Link, Outlet,useLocation} from "react-router-dom";
function Home() {
  const location = useLocation()
  if(location.pathname.includes('articleDetai')){
    location.pathname = '/article'
  }
  const   [nacList,setNavList] = useState([
    {
      name:"首页",
      path:"/",
      key:'index'
    },{
      name:'作品',
      path:'/works',
      key:'works'
    },
    {
      name:'文章',
      path:'/article',
      key:'article'
    },
    {
      name:'关于',
      path:'/about',
      key:'about'
    },
    {
      name:'XX',
      path:'/',
      key:'/'
    }
  ])
  return (

    <div className="Home">
      <div className="container">
          <ul className="nav">
            {
              nacList.map(item=>{return (<li key={item.key} ><Link to={item.path} className={location.pathname === item.path ?  'active_nav':''} >{item.name}</Link></li>)})
            }
          </ul>
        <div className="line"></div>
        <div className="center">
          <Outlet />
        </div>
        <div className="line"></div>
        <div className="foot">
        <span>333</span>
        <span>23333</span>
      </div>
      </div>
    </div>
  );
}

export default Home;
