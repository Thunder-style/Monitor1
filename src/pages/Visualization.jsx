import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const Visualization = () => {
  // 模拟数据，包含业绩结果
  const data = [
    { x: 10, y: 30, performance: 'a', name: '项目A' },
    { x: 20, y: 45, performance: 'b', name: '项目B' },
    { x: 30, y: 60, performance: 'b+', name: '项目C' },
    { x: 40, y: 20, performance: 'a', name: '项目D' },
    { x: 50, y: 35, performance: 'b', name: '项目E' },
    { x: 60, y: 50, performance: 'b+', name: '项目F' },
    { x: 70, y: 25, performance: 'a', name: '项目G' },
    { x: 80, y: 40, performance: 'b', name: '项目H' },
    { x: 90, y: 55, performance: 'b+', name: '项目I' },
    { x: 25, y: 70, performance: 'a', name: '项目J' },
    { x: 35, y: 15, performance: 'b', name: '项目K' },
    { x: 45, y: 30, performance: 'b+', name: '项目L' },
  ];

  // 根据业绩结果获取颜色
  const getColorByPerformance = (performance) => {
    switch (performance) {
      case 'a': return '#10B981'; // 绿色
      case 'b': return '#EF4444'; // 红色
      case 'b+': return '#F59E0B'; // 黄色
      default: return '#3B82F6'; // 蓝色默认
    }
  };

  // 自定义提示框
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white bg-opacity-90 p-4 border border-gray-200 shadow-lg rounded-md">
          <p className="font-bold">{data.name}</p>
          <p>X值: {data.x}</p>
          <p>Y值: {data.y}</p>
          <p>业绩结果: {data.performance}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-center">数据可视化展示</h1>
        
        <Card className="w-full">
          <CardHeader>
            <CardTitle>业绩数据分布图</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart
                  margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                >
                  <XAxis 
                    type="number" 
                    dataKey="x" 
                    name="X轴" 
                    label={{ value: 'X轴数值', position: 'bottom', offset: 0 }}
                  />
                  <YAxis 
                    type="number" 
                    dataKey="y" 
                    name="Y轴" 
                    label={{ value: 'Y轴数值', angle: -90, position: 'insideLeft' }}
                  />
                  <ZAxis range={[100]} />
                  <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: '3 3' }} />
                  <Scatter name="数据点" data={data}>
                    {data.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={getColorByPerformance(entry.performance)} 
                      />
                    ))}
                  </Scatter>
                </ScatterChart>
              </ResponsiveContainer>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mt-6">
              <div className="flex items-center justify-center">
                <div className="w-4 h-4 bg-green-500 mr-2"></div>
                <span>业绩A (绿色)</span>
              </div>
              <div className="flex items-center justify-center">
                <div className="w-4 h-4 bg-red-500 mr-2"></div>
                <span>业绩B (红色)</span>
              </div>
              <div className="flex items-center justify-center">
                <div className="w-4 h-4 bg-yellow-500 mr-2"></div>
                <span>业绩B+ (黄色)</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Visualization;
