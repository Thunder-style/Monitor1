import React, { useState } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useNavigate } from 'react-router-dom';

const TalentFlowQuadrant = ({ selectedYear, onYearChange }) => {
  const navigate = useNavigate();
  
  // 模拟多年份部门数据
  const departmentDataByYear = {
    '2021': [
      { id: 1, name: '技术部', flowRate: 30, satisfaction: 75 },
      { id: 2, name: '市场部', flowRate: 55, satisfaction: 50 },
      { id: 3, name: '人事部', flowRate: 20, satisfaction: 85 },
      { id: 4, name: '财务部', flowRate: 15, satisfaction: 72 },
      { id: 5, name: '运营部', flowRate: 40, satisfaction: 65 },
      { id: 6, name: '设计部', flowRate: 35, satisfaction: 70 },
    ],
    '2022': [
      { id: 1, name: '技术部', flowRate: 28, satisfaction: 78 },
      { id: 2, name: '市场部', flowRate: 58, satisfaction: 48 },
      { id: 3, name: '人事部', flowRate: 18, satisfaction: 88 },
      { id: 4, name: '财务部', flowRate: 12, satisfaction: 75 },
      { id: 5, name: '运营部', flowRate: 42, satisfaction: 62 },
      { id: 6, name: '设计部', flowRate: 33, satisfaction: 73 },
    ],
    '2023': [
      { id: 1, name: '技术部', flowRate: 25, satisfaction: 80 },
      { id: 2, name: '市场部', flowRate: 60, satisfaction: 45 },
      { id: 3, name: '人事部', flowRate: 15, satisfaction: 90 },
      { id: 4, name: '财务部', flowRate: 10, satisfaction: 70 },
      { id: 5, name: '运营部', flowRate: 45, satisfaction: 60 },
      { id: 6, name: '设计部', flowRate: 35, satisfaction: 75 },
    ],
    '2024': [
      { id: 1, name: '技术部', flowRate: 22, satisfaction: 82 },
      { id: 2, name: '市场部', flowRate: 62, satisfaction: 42 },
      { id: 3, name: '人事部', flowRate: 13, satisfaction: 92 },
      { id: 4, name: '财务部', flowRate: 8, satisfaction: 73 },
      { id: 5, name: '运营部', flowRate: 48, satisfaction: 58 },
      { id: 6, name: '设计部', flowRate: 37, satisfaction: 77 },
    ]
  };

  const departmentData = departmentDataByYear[selectedYear] || departmentDataByYear['2023'];

  const handleClick = (departmentId) => {
    navigate(`/department/${departmentId}`);
  };

  // 定义象限颜色 - 使用科技感配色
  const quadrantColors = [
    '#47dae8', // 高满意度低流动率 - 青色
    '#ef4444', // 低满意度低流动率 - 红色
    '#f59e0b', // 低满意度高流动率 - 橙色
    '#8b5cf6'  // 高满意度高流动率 - 紫色
  ];

  // 根据数据点位置确定象限颜色
  const getQuadrantColor = (data) => {
    if (data.satisfaction >= 50 && data.flowRate < 50) return quadrantColors[0];
    if (data.satisfaction < 50 && data.flowRate < 50) return quadrantColors[1];
    if (data.satisfaction < 50 && data.flowRate >= 50) return quadrantColors[2];
    return quadrantColors[3];
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-slate-900/90 border border-cyan-400/30 backdrop-blur-sm p-4 shadow-lg rounded-md">
          <p className="font-bold text-cyan-100">{data.name}</p>
          <p className="text-cyan-200/80">人才流动率: <span className="data-highlight">{data.flowRate}%</span></p>
          <p className="text-cyan-200/80">满意度: <span className="data-highlight">{data.satisfaction}%</span></p>
        </div>
      );
    }
    return null;
  };

  // 自定义图表形状以显示四个象限
  const CustomizedShape = (props) => {
    const { cx, cy, payload } = props;
    return (
      <circle 
        cx={cx} 
        cy={cy} 
        r={8} 
        fill={getQuadrantColor(payload)} 
        onClick={() => handleClick(payload.id)}
        style={{ cursor: 'pointer' }}
      />
    );
  };

  return (
    <div className="w-full">
      <div className="h-96 relative">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart
            margin={{ top: 20, right: 20, bottom: 40, left: 40 }}
          >
            {/* 添加四个象限背景 - 使用暗色科技风格 */}
            <rect x="50%" y="0" width="50%" height="50%" fill="rgba(139, 92, 246, 0.1)" fillOpacity={0.3} />
            <rect x="0" y="0" width="50%" height="50%" fill="rgba(239, 68, 68, 0.1)" fillOpacity={0.3} />
            <rect x="0" y="50%" width="50%" height="50%" fill="rgba(245, 158, 11, 0.1)" fillOpacity={0.3} />
            <rect x="50%" y="50%" width="50%" height="50%" fill="rgba(71, 218, 232, 0.1)" fillOpacity={0.3} />
            
            <XAxis 
              type="number" 
              dataKey="flowRate" 
              name="流动率" 
              domain={[0, 100]}
              label={{ value: '人才流动率 (%)', position: 'bottom', offset: -5, fill: '#bcdcff' }}
              tick={{ fill: '#c0c9d2', fontSize: 12 }}
              axisLine={{ stroke: '#47dae8', strokeWidth: 1 }}
              tickLine={{ stroke: '#47dae8' }}
            />
            <YAxis 
              type="number" 
              dataKey="satisfaction" 
              name="满意度" 
              domain={[0, 100]}
              label={{ value: '满意度 (%)', angle: -90, position: 'insideLeft', fill: '#bcdcff' }}
              tick={{ fill: '#c0c9d2', fontSize: 12 }}
              axisLine={{ stroke: '#47dae8', strokeWidth: 1 }}
              tickLine={{ stroke: '#47dae8' }}
            />
            <ZAxis range={[100]} />
            <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: '3 3', stroke: '#47dae8' }} />
            <Scatter name="部门" data={departmentData} fill="#47dae8" shape={<CustomizedShape />}>
              {departmentData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={getQuadrantColor(entry)} 
                  onClick={() => handleClick(entry.id)}
                  style={{ cursor: 'pointer' }}
                />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
        <div className="flex items-center">
          <div className="w-4 h-4 mr-2 bg-green-500 rounded-sm glow-effect"></div>
          <span className="text-cyan-200/80 text-sm">绩效结果A</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 mr-2 bg-orange-500 rounded-sm glow-effect"></div>
          <span className="text-cyan-200/80 text-sm">绩效结果B+</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 mr-2 bg-red-400 rounded-sm glow-effect"></div>
          <span className="text-cyan-200/80 text-sm">绩效结果B</span>
        </div>
      </div>
    </div>
  );
};

export default TalentFlowQuadrant;
