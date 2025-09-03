import React from 'react';
import './rotating-earth.css';

const RotatingEarth = ({ className = "", size = "normal" }) => {
  return (
    <div className={`rotating-earth ${className} ${size}`}>
      {/* 地球主体 */}
      <div className="earth-container">
        <div className="earth">
          {/* 地球基础纹理 */}
          <div className="earth-base"></div>
          {/* 大陆板块 */}
          <div className="earth-continents"></div>
          {/* 海洋纹理 */}
          <div className="earth-oceans"></div>
          {/* 大气层效果 */}
          <div className="atmosphere"></div>
          {/* 云层效果 */}
          <div className="clouds"></div>
          {/* 极光效果 */}
          <div className="aurora"></div>
          {/* 高光效果 */}
          <div className="earth-highlight"></div>
        </div>
        {/* 轨道环 */}
        <div className="orbit-ring">
          <div className="orbit-dot"></div>
        </div>
        {/* 外层轨道 */}
        <div className="outer-orbit">
          <div className="outer-dot"></div>
        </div>
        {/* 数据流效果 */}
        <div className="data-streams">
          <div className="stream stream-1"></div>
          <div className="stream stream-2"></div>
          <div className="stream stream-3"></div>
        </div>
      </div>
      {/* 全息投影效果 */}
      <div className="hologram-grid"></div>
      {/* 扫描线效果 */}
      <div className="scan-lines"></div>
    </div>
  );
};

export default RotatingEarth;
