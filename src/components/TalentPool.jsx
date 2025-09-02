import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const TalentPool = () => {
  // 模拟人才库维度数据
  const talentDimensions = [
    { id: 1, name: '大数据', count: 42 },
    { id: 2, name: '人工智能', count: 38 },
    { id: 3, name: '云计算', count: 35 },
    { id: 4, name: '网络安全', count: 29 },
    { id: 5, name: '移动开发', count: 33 },
    { id: 6, name: '前端开发', count: 47 },
    { id: 7, name: '后端开发', count: 41 },
    { id: 8, name: '产品设计', count: 26 },
    { id: 9, name: '项目管理', count: 22 },
    { id: 10, name: '数据分析', count: 39 },
  ];

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>人才库</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-4">
          {talentDimensions.map((dimension) => (
            <Badge key={dimension.id} variant="secondary" className="text-lg py-2 px-4">
              {dimension.name} <span className="ml-2 bg-gray-200 text-gray-800 rounded-full px-2 py-1 text-sm">{dimension.count}</span>
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TalentPool;
