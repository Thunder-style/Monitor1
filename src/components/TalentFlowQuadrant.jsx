import React, { useState } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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

  // 定义象限颜色
  const quadrantColors = [
    '#10B981', // 高满意度低流动率 - 绿色
    '#EF4444', // 低满意度低流动率 - 红色
    '#F59E0B', // 低满意度高流动率 - 橙色
    '#3B82F6'  // 高满意度高流动率 - 蓝色
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
        <div className="bg-white p-4 border border-gray-200 shadow-lg rounded-md">
          <p className="font-bold">{data.name}</p>
          <p>人才流动率: {data.flowRate}%</p>
          <p>满意度: {data.satisfaction}%</p>
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
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>人才流动分析</CardTitle>
<div></div>
      </CardHeader>
      <CardContent>
        <div className="h-96 relative">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart
              margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
            >
              {/* 添加四个象限背景 */}
              <rect x="50%" y="0" width="50%" height="50%" fill="#dbeafe" fillOpacity={0.3} />
              <rect x="0" y="0" width="50%" height="50%" fill="#fef2f2" fillOpacity={0.3} />
              <rect x="0" y="50%" width="50%" height="50%" fill="#fffbeb" fillOpacity={0.3} />
              <rect x="50%" y="50%" width="50%" height="50%" fill="#dcfce7" fillOpacity={0.3} />
              
              <XAxis 
                type="number" 
                dataKey="flowRate" 
                name="流动率" 
                domain={[0, 100]}
                label={{ value: '人才流动率 (%)', position: 'bottom', offset: 0 }}
              />
              <YAxis 
                type="number" 
                dataKey="satisfaction" 
                name="满意度" 
                domain={[0, 100]}
                label={{ value: '满意度 (%)', angle: -90, position: 'insideLeft' }}
              />
              <ZAxis range={[100]} />
              <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: '3 3' }} />
              <Scatter name="部门" data={departmentData} fill="#8884d8" shape={<CustomizedShape />}>
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
            <div className="w-4 h-4 mr-2 bg-emerald-500"></div>
            <span className="">绩效结果A</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 mr-2 bg-amber-500"></div>
            <span className="">绩效结果B+</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 mr-2 bg-red-700"></div>
            <span className="">绩效结果B</span>
          </div>
<div></div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TalentFlowQuadrant;
