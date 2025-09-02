
import TalentFlowQuadrant from '@/components/TalentFlowQuadrant';
import { CardContent, CardHeader, Card, CardTitle } from '@/components/ui/card';
import { SelectItem, Select, SelectContent, SelectValue, SelectTrigger } from '@/components/ui/select';
import ExpertHiringTable from '@/components/ExpertHiringTable';
import React, { useState } from 'react';
import TalentPool from '@/components/TalentPool';
const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-8">
      <div className="container mx-auto px-4">
        {/* 页面标题 */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h1 className="text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
            人才流动与组织活力诊断平台
          </h1>
          <p className="text-gray-500 text-center mt-2">实时监控与分析人才流动态势</p>
        </div>

        {/* 四象限图 */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <TalentFlowQuadrant />
        </div>

        {/* 三个预警组件布局 */}
        <div className="space-y-6 mb-8">
          {/* 第一行：人才流入预警和流出预警 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 人才流入预警 */}
            <div className="bg-white rounded-lg shadow-sm">
              <TalentInflowWarning />
            </div>
            {/* 人才流出预警 */}
            <div className="bg-white rounded-lg shadow-sm">
              <TalentOutflowWarning />
            </div>
          </div>
          {/* 第二行：专家流动预警 */}
          <div className="bg-white rounded-lg shadow-sm">
            <ExpertMovementWarning />
          </div>
        </div>

        {/* 单位人员缺口需求分析 */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <DepartmentGapAnalysis />
        </div>
      </div>
    </div>
  );
};

// 人才流入预警组件
const TalentInflowWarning = () => {
  // 模拟数据
  const inflowData = [
    { id: 1, department: '技术部', inflowCount: 2, size: 120 },
    { id: 2, department: '市场部', inflowCount: 3, size: 85 },
    { id: 3, department: '人事部', inflowCount: 1, size: 30 },
    { id: 4, department: '财务部', inflowCount: 0, size: 25 },
    { id: 5, department: '运营部', inflowCount: 5, size: 65 },
    { id: 6, department: '设计部', inflowCount: 2, size: 40 },
    { id: 7, department: '研发部', inflowCount: 4, size: 200 },
    { id: 8, department: '客服部', inflowCount: 7, size: 180 },
    { id: 9, department: '法务部', inflowCount: 2, size: 350 },
    { id: 10, department: '采购部', inflowCount: 5, size: 420 },
  ];

  const getInflowThreshold = (size) => {
    if (size <= 150) return 1;
    if (size <= 300) return 2;
    return 3;
  };

  // 按规模分组数据
  const smallScaleData = inflowData.filter(item => item.size <= 150);
  const mediumScaleData = inflowData.filter(item => item.size > 150 && item.size <= 300);
  const largeScaleData = inflowData.filter(item => item.size > 300);

  // 过滤超过阈值80%的数据
  const filteredSmallScaleData = smallScaleData.filter(item => item.inflowCount >= getInflowThreshold(item.size) * 0.8);
  const filteredMediumScaleData = mediumScaleData.filter(item => item.inflowCount >= getInflowThreshold(item.size) * 0.8);
  const filteredLargeScaleData = largeScaleData.filter(item => item.inflowCount >= getInflowThreshold(item.size) * 0.8);

  // 只展示预警数据（超过阈值的数据）
  const warningSmallScaleData = filteredSmallScaleData.filter(item => item.inflowCount > getInflowThreshold(item.size));
  const warningMediumScaleData = filteredMediumScaleData.filter(item => item.inflowCount > getInflowThreshold(item.size));
  const warningLargeScaleData = filteredLargeScaleData.filter(item => item.inflowCount > getInflowThreshold(item.size));

  // 每个规模只展示一个预警数据
  const displaySmallScaleData = warningSmallScaleData.length > 0 ? [warningSmallScaleData[0]] : [];
  const displayMediumScaleData = warningMediumScaleData.length > 0 ? [warningMediumScaleData[0]] : [];
  const displayLargeScaleData = warningLargeScaleData.length > 0 ? [warningLargeScaleData[0]] : [];

  const renderWarningItem = (item) => {
    return (
      <div 
        key={item.id} 
        className="p-4 rounded-lg border bg-red-50 border-red-200"
      >
        <div className="mb-2">
          <h3 className="font-medium">{item.department}</h3>
        </div>
        <div className="text-sm text-gray-600">
          <p>年度流入人数: {item.inflowCount}人</p>
          <p>单位人员规模: {item.size}人</p>
          <p>流入阈值: 不超过{getInflowThreshold(item.size)}人</p>
        </div>
      </div>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>人才流入预警</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h3 className="font-medium mb-2">单位人员规模：150人以内</h3>
            <div className="space-y-4">
              {displaySmallScaleData.length > 0 ? (
                displaySmallScaleData.map(renderWarningItem)
              ) : (
                <p className="text-gray-500 text-sm">暂无预警信息</p>
              )}
            </div>
          </div>
          
          <div>
            <h3 className="font-medium mb-2">单位人员规模：150-300人</h3>
            <div className="space-y-4">
              {displayMediumScaleData.length > 0 ? (
                displayMediumScaleData.map(renderWarningItem)
              ) : (
                <p className="text-gray-500 text-sm">暂无预警信息</p>
              )}
            </div>
          </div>
          
          <div>
            <h3 className="font-medium mb-2">单位人员规模：300人以上</h3>
            <div className="space-y-4">
              {displayLargeScaleData.length > 0 ? (
                displayLargeScaleData.map(renderWarningItem)
              ) : (
                <p className="text-gray-500 text-sm">暂无预警信息</p>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// 人才流出预警组件
const TalentOutflowWarning = () => {
  // 模拟数据
  const outflowData = [
    { id: 1, department: '技术部', outflowCount: 4, size: 120 },
    { id: 2, department: '市场部', outflowCount: 9, size: 85 },
    { id: 3, department: '人事部', outflowCount: 3, size: 30 },
    { id: 4, department: '财务部', outflowCount: 1, size: 25 },
    { id: 5, department: '运营部', outflowCount: 7, size: 65 },
    { id: 6, department: '设计部', outflowCount: 2, size: 40 },
    { id: 7, department: '研发部', outflowCount: 3, size: 200 },
    { id: 8, department: '客服部', outflowCount: 10, size: 180 },
    { id: 9, department: '法务部', outflowCount: 18, size: 350 },
    { id: 10, department: '采购部', outflowCount: 20, size: 420 },
  ];

  const getOutflowThreshold = (size) => {
    if (size <= 150) return 5;
    if (size <= 300) return 8;
    return 16;
  };

  // 按规模分组数据
  const smallScaleData = outflowData.filter(item => item.size <= 150);
  const mediumScaleData = outflowData.filter(item => item.size > 150 && item.size <= 300);
  const largeScaleData = outflowData.filter(item => item.size > 300);

  // 过滤超过阈值80%的数据
  const filteredSmallScaleData = smallScaleData.filter(item => item.outflowCount >= getOutflowThreshold(item.size) * 0.8);
  const filteredMediumScaleData = mediumScaleData.filter(item => item.outflowCount >= getOutflowThreshold(item.size) * 0.8);
  const filteredLargeScaleData = largeScaleData.filter(item => item.outflowCount >= getOutflowThreshold(item.size) * 0.8);

  // 只展示预警数据（超过阈值的数据）
  const warningSmallScaleData = filteredSmallScaleData.filter(item => item.outflowCount > getOutflowThreshold(item.size));
  const warningMediumScaleData = filteredMediumScaleData.filter(item => item.outflowCount > getOutflowThreshold(item.size));
  const warningLargeScaleData = filteredLargeScaleData.filter(item => item.outflowCount > getOutflowThreshold(item.size));

  // 每个规模只展示一个预警数据
  const displaySmallScaleData = warningSmallScaleData.length > 0 ? [warningSmallScaleData[0]] : [];
  const displayMediumScaleData = warningMediumScaleData.length > 0 ? [warningMediumScaleData[0]] : [];
  const displayLargeScaleData = warningLargeScaleData.length > 0 ? [warningLargeScaleData[0]] : [];

  const renderWarningItem = (item) => {
    return (
      <div 
        key={item.id} 
        className="p-4 rounded-lg border bg-red-50 border-red-200"
      >
        <div className="mb-2">
          <h3 className="font-medium">{item.department}</h3>
        </div>
        <div className="text-sm text-gray-600">
          <p>年度流出人数: {item.outflowCount}人</p>
          <p>单位人员规模: {item.size}人</p>
          <p>流出阈值: 不超过{getOutflowThreshold(item.size)}人</p>
        </div>
      </div>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>人才流出预警</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h3 className="font-medium mb-2">单位人员规模：150人以内</h3>
            <div className="space-y-4">
              {displaySmallScaleData.length > 0 ? (
                displaySmallScaleData.map(renderWarningItem)
              ) : (
                <p className="text-gray-500 text-sm">暂无预警信息</p>
              )}
            </div>
          </div>
          
          <div>
            <h3 className="font-medium mb-2">单位人员规模：150-300人</h3>
            <div className="space-y-4">
              {displayMediumScaleData.length > 0 ? (
                displayMediumScaleData.map(renderWarningItem)
              ) : (
                <p className="text-gray-500 text-sm">暂无预警信息</p>
              )}
            </div>
          </div>
          
          <div>
            <h3 className="font-medium mb-2">单位人员规模：300人以上</h3>
            <div className="space-y-4">
              {displayLargeScaleData.length > 0 ? (
                displayLargeScaleData.map(renderWarningItem)
              ) : (
                <p className="text-gray-500 text-sm">暂无预警信息</p>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// 专家流动预警组件
const ExpertMovementWarning = () => {
  // 模拟专家流动数据
  const expertMovements = [
    {
      id: 1,
      name: '张伟',
      currentUnit: '变电管理一所',
      currentDepartment: '试验部',
      currentPosition: '变电试验二级专责',
      targetUnit: '办公室',
      targetDepartment: '公共事务科',
      targetPosition: '综合管理',
      executionDate: '2023-12-15'
    },
    {
      id: 2,
      name: '李娜',
      currentUnit: '技术部',
      currentDepartment: '研发科',
      currentPosition: '高级工程师',
      targetUnit: '产品部',
      targetDepartment: '用户体验科',
      targetPosition: '用户体验专家',
      executionDate: '2023-11-28'
    },
    {
      id: 3,
      name: '王强',
      currentUnit: '市场部',
      currentDepartment: '推广科',
      currentPosition: '市场推广专员',
      targetUnit: '运营部',
      targetDepartment: '数据分析科',
      targetPosition: '数据分析师',
      executionDate: '2023-12-05'
    }
  ];

  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <CardTitle>专家流动预警</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 px-3">姓名</th>
                <th className="text-left py-2 px-3">现单位</th>
                <th className="text-left py-2 px-3">现部门</th>
                <th className="text-left py-2 px-3">岗位</th>
                <th className="text-left py-2 px-3">拟调单位</th>
                <th className="text-left py-2 px-3">拟调部门</th>
                <th className="text-left py-2 px-3">拟调岗位</th>
                <th className="text-left py-2 px-3">执行时间</th>
              </tr>
            </thead>
            <tbody>
              {expertMovements.map((expert) => (
                <tr key={expert.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-3">{expert.name}</td>
                  <td className="py-3 px-3 text-gray-900">{expert.currentUnit}</td>
                  <td className="py-3 px-3 text-gray-600">{expert.currentDepartment}</td>
                  <td className="py-3 px-3">{expert.currentPosition}</td>
                  <td className="py-3 px-3 text-gray-900">{expert.targetUnit}</td>
                  <td className="py-3 px-3 text-gray-600">{expert.targetDepartment}</td>
                  <td className="py-3 px-3">{expert.targetPosition}</td>
                  <td className="py-3 px-3">{expert.executionDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

// 单位人员缺口需求分析组件
const DepartmentGapAnalysis = () => {
  // 模拟单位人员缺口数据
  const gapData = [
    { id: 1, department: '龙岗局', onDuty: 30, onLoan: 2, vacant: 2, lentOut: 1, priority: '高' },
    { id: 2, department: '技术部', onDuty: 45, onLoan: 1, vacant: 3, lentOut: 2, priority: '高' },
    { id: 3, department: '市场部', onDuty: 25, onLoan: 0, vacant: 1, lentOut: 3, priority: '中' },
    { id: 4, department: '人事部', onDuty: 15, onLoan: 1, vacant: 0, lentOut: 0, priority: '低' },
    { id: 5, department: '财务部', onDuty: 12, onLoan: 0, vacant: 0, lentOut: 1, priority: '低' },
  ];

  // 按空编数量排序（从高到低）
  const sortedData = [...gapData].sort((a, b) => b.vacant - a.vacant);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case '高': return 'bg-red-100 text-red-800';
      case '中': return 'bg-yellow-100 text-yellow-800';
      case '低': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card>
      <CardHeader className="border-b">
        <CardTitle>单位人员缺口需求分析</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-sm border-b">
                <th className="text-left py-3 px-4 font-medium text-gray-600">单位名称</th>
                <th className="text-center py-3 px-4 font-medium text-gray-600">在岗人数</th>
                <th className="text-center py-3 px-4 font-medium text-gray-600">在借人数</th>
                <th className="text-center py-3 px-4 font-medium text-gray-600">空编人数</th>
                <th className="text-center py-3 px-4 font-medium text-gray-600">借出人数</th>
                <th className="text-center py-3 px-4 font-medium text-gray-600">缺口优先级</th>
              </tr>
            </thead>
            <tbody>
              {sortedData.map((item) => (
                <tr key={item.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">{item.department}</td>
                  <td className="py-3 px-4 text-center">{item.onDuty}</td>
                  <td className="py-3 px-4 text-center">{item.onLoan}</td>
                  <td className="py-3 px-4 text-center font-medium">{item.vacant}</td>
                  <td className="py-3 px-4 text-center">{item.lentOut}</td>
                  <td className="py-3 px-4">
                    <div className="flex justify-center">
                      <span className={`px-3 py-1 rounded-full text-xs ${getPriorityColor(item.priority)}`}>
                        {item.priority}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default Index;
