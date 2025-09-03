
import TalentFlowQuadrant from '@/components/TalentFlowQuadrant';
import { CardContent, CardHeader, Card, CardTitle } from '@/components/ui/card';
import { SelectItem, Select, SelectContent, SelectValue, SelectTrigger } from '@/components/ui/select';
import ExpertHiringTable from '@/components/ExpertHiringTable';
import React, { useState } from 'react';
import TalentPool from '@/components/TalentPool';
import DashboardLayout from '@/components/ui/dashboard-layout';
import GlowCard from '@/components/ui/glow-card';
import { Users, AlertTriangle, TrendingUp, Database } from 'lucide-react';

const Index = () => {
  return (
    <DashboardLayout title="人才流动与组织活力诊断平台">
      <div className="space-y-6">
        {/* 四象限图 */}
        <GlowCard 
          title="组织活力分析" 
          icon={<TrendingUp className="w-5 h-5" />}
          className="mb-6"
        >
          <TalentFlowQuadrant />
        </GlowCard>

        {/* 三个预警组件布局 */}
        <div className="space-y-6 mb-8">
          {/* 第一行：人才流入预警和流出预警 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 人才流入预警 */}
            <GlowCard 
              title="人才流入预警" 
              icon={<Users className="w-5 h-5" />}
              glowColor="#22c55e"
            >
              <TalentInflowWarningContent />
            </GlowCard>
            {/* 人才流出预警 */}
            <GlowCard 
              title="人才流出预警" 
              icon={<AlertTriangle className="w-5 h-5" />}
              glowColor="#ef4444"
            >
              <TalentOutflowWarningContent />
            </GlowCard>
          </div>
          {/* 第二行：专家流动预警 */}
          <GlowCard 
            title="专家流动预警" 
            icon={<Database className="w-5 h-5" />}
            glowColor="#8b5cf6"
          >
            <ExpertMovementWarningContent />
          </GlowCard>
        </div>

        {/* 单位人员缺口需求分析 */}
        <GlowCard 
          title="单位人员缺口需求分析" 
          icon={<TrendingUp className="w-5 h-5" />}
          glowColor="#f59e0b"
        >
          <DepartmentGapAnalysisContent />
        </GlowCard>
      </div>
    </DashboardLayout>
  );
};

// 人才流入预警组件内容
const TalentInflowWarningContent = () => {
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
        className="p-4 rounded-lg border bg-red-900/20 border-red-400/30 backdrop-blur-sm"
      >
        <div className="mb-2">
          <h3 className="font-medium text-cyan-100">{item.department}</h3>
        </div>
        <div className="text-sm text-cyan-200/80">
          <p>年度流入人数: <span className="data-highlight">{item.inflowCount}人</span></p>
          <p>单位人员规模: <span className="data-highlight">{item.size}人</span></p>
          <p>流入阈值: 不超过<span className="data-highlight">{getInflowThreshold(item.size)}人</span></p>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-medium mb-2 text-cyan-100">单位人员规模：150人以内</h3>
        <div className="space-y-4">
          {displaySmallScaleData.length > 0 ? (
            displaySmallScaleData.map(renderWarningItem)
          ) : (
            <p className="text-cyan-200/60 text-sm">暂无预警信息</p>
          )}
        </div>
      </div>
      
      <div>
        <h3 className="font-medium mb-2 text-cyan-100">单位人员规模：150-300人</h3>
        <div className="space-y-4">
          {displayMediumScaleData.length > 0 ? (
            displayMediumScaleData.map(renderWarningItem)
          ) : (
            <p className="text-cyan-200/60 text-sm">暂无预警信息</p>
          )}
        </div>
      </div>
      
      <div>
        <h3 className="font-medium mb-2 text-cyan-100">单位人员规模：300人以上</h3>
        <div className="space-y-4">
          {displayLargeScaleData.length > 0 ? (
            displayLargeScaleData.map(renderWarningItem)
          ) : (
            <p className="text-cyan-200/60 text-sm">暂无预警信息</p>
          )}
        </div>
      </div>
    </div>
  );
};

// 人才流出预警组件内容
const TalentOutflowWarningContent = () => {
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
        className="p-4 rounded-lg border bg-red-900/20 border-red-400/30 backdrop-blur-sm"
      >
        <div className="mb-2">
          <h3 className="font-medium text-cyan-100">{item.department}</h3>
        </div>
        <div className="text-sm text-cyan-200/80">
          <p>年度流出人数: <span className="data-highlight">{item.outflowCount}人</span></p>
          <p>单位人员规模: <span className="data-highlight">{item.size}人</span></p>
          <p>流出阈值: 不超过<span className="data-highlight">{getOutflowThreshold(item.size)}人</span></p>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-medium mb-2 text-cyan-100">单位人员规模：150人以内</h3>
        <div className="space-y-4">
          {displaySmallScaleData.length > 0 ? (
            displaySmallScaleData.map(renderWarningItem)
          ) : (
            <p className="text-cyan-200/60 text-sm">暂无预警信息</p>
          )}
        </div>
      </div>
      
      <div>
        <h3 className="font-medium mb-2 text-cyan-100">单位人员规模：150-300人</h3>
        <div className="space-y-4">
          {displayMediumScaleData.length > 0 ? (
            displayMediumScaleData.map(renderWarningItem)
          ) : (
            <p className="text-cyan-200/60 text-sm">暂无预警信息</p>
          )}
        </div>
      </div>
      
      <div>
        <h3 className="font-medium mb-2 text-cyan-100">单位人员规模：300人以上</h3>
        <div className="space-y-4">
          {displayLargeScaleData.length > 0 ? (
            displayLargeScaleData.map(renderWarningItem)
          ) : (
            <p className="text-cyan-200/60 text-sm">暂无预警信息</p>
          )}
        </div>
      </div>
    </div>
  );
};

// 专家流动预警组件内容
const ExpertMovementWarningContent = () => {
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
    <div className="overflow-x-auto custom-scrollbar">
      <table className="w-full cyber-table">
        <thead>
          <tr>
            <th className="text-left py-3 px-4">姓名</th>
            <th className="text-left py-3 px-4">现单位</th>
            <th className="text-left py-3 px-4">现部门</th>
            <th className="text-left py-3 px-4">岗位</th>
            <th className="text-left py-3 px-4">拟调单位</th>
            <th className="text-left py-3 px-4">拟调部门</th>
            <th className="text-left py-3 px-4">拟调岗位</th>
            <th className="text-left py-3 px-4">执行时间</th>
          </tr>
        </thead>
        <tbody>
          {expertMovements.map((expert) => (
            <tr key={expert.id}>
              <td className="py-3 px-4">
                <span className="data-highlight">{expert.name}</span>
              </td>
              <td className="py-3 px-4">{expert.currentUnit}</td>
              <td className="py-3 px-4">{expert.currentDepartment}</td>
              <td className="py-3 px-4">{expert.currentPosition}</td>
              <td className="py-3 px-4">{expert.targetUnit}</td>
              <td className="py-3 px-4">{expert.targetDepartment}</td>
              <td className="py-3 px-4">{expert.targetPosition}</td>
              <td className="py-3 px-4">
                <span className="data-highlight">{expert.executionDate}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// 单位人员缺口需求分析组件内容
const DepartmentGapAnalysisContent = () => {
  // 模拟单位人员缺口数据
  const gapData = [
    { id: 1, department: '龙岗局', onDuty: 30, onLoan: 2, vacant: 2, lentOut: 1, priority: '高' },
    { id: 2, department: '技术部', onDuty: 45, onLoan: 1, vacant: 3, lentOut: 2, priority: '高' },
    { id: 3, department: '市场部', onDuty: 25, onLoan: 0, vacant: 1, lentOut: 3, priority: '中' },
    { id: 4, department: '人事部', onDuty: 15, onLoan: 1, vacant: 0, lentOut: 0, priority: '低' },
    { id: 5, department: '财务部', onDuty: 12, onLoan: 0, vacant: 0, lentOut: 1, priority: '低' },
  ];

  // 计算空编率并按空编率排序（从高到低）
  const dataWithVacancyRate = gapData.map(item => {
    const totalPositions = item.onDuty + item.vacant;
    const vacancyRate = totalPositions > 0 ? (item.vacant / totalPositions * 100).toFixed(1) : 0;
    return { ...item, vacancyRate: parseFloat(vacancyRate) };
  });
  
  const sortedData = [...dataWithVacancyRate].sort((a, b) => b.vacancyRate - a.vacancyRate);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case '高': return 'bg-red-900/30 text-red-300 border-red-400/50';
      case '中': return 'bg-yellow-900/30 text-yellow-300 border-yellow-400/50';
      case '低': return 'bg-green-900/30 text-green-300 border-green-400/50';
      default: return 'bg-gray-900/30 text-gray-300 border-gray-400/50';
    }
  };

  return (
    <div className="overflow-x-auto custom-scrollbar">
      <table className="w-full cyber-table">
        <thead>
          <tr>
            <th className="text-left py-3 px-4">单位名称</th>
            <th className="text-center py-3 px-4">在岗人数</th>
            <th className="text-center py-3 px-4">在借人数</th>
            <th className="text-center py-3 px-4">借出人数</th>
            <th className="text-center py-3 px-4">空编人数</th>
            <th className="text-center py-3 px-4">空编率</th>
            <th className="text-center py-3 px-4">缺口优先级</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((item) => (
            <tr key={item.id}>
              <td className="py-3 px-4">
                <span className="data-highlight">{item.department}</span>
              </td>
              <td className="py-3 px-4 text-center">{item.onDuty}</td>
              <td className="py-3 px-4 text-center">{item.onLoan}</td>
              <td className="py-3 px-4 text-center">{item.lentOut}</td>
              <td className="py-3 px-4 text-center">
                <span className="data-highlight">{item.vacant}</span>
              </td>
              <td className="py-3 px-4 text-center">
                <span className="data-highlight">{item.vacancyRate}%</span>
              </td>
              <td className="py-3 px-4">
                <div className="flex justify-center">
                  <span className={`px-3 py-1 rounded-full text-xs border ${getPriorityColor(item.priority)}`}>
                    {item.priority}
                  </span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Index;
