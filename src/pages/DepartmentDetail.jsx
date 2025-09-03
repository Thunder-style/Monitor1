import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Users, Calendar, TrendingUp, Briefcase, AlertTriangle, Building, UserPlus, Users2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DashboardLayout from '@/components/ui/dashboard-layout';
import GlowCard from '@/components/ui/glow-card';

const DepartmentDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [flowDialogOpen, setFlowDialogOpen] = useState(false);
  const [borrowDialogOpen, setBorrowDialogOpen] = useState(false);

  // 模拟部门数据
  const departmentData = {
    1: { 
      name: '技术部', 
      flowRate: 25, 
      satisfaction: 80, 
      headcount: 120,
      averageAge: 28,
      averageAgeRank: 3,
      promotionRate: 15,
      promotionRateRank: 2,
      workload: '较大'
    },
    2: { 
      name: '市场部', 
      flowRate: 60, 
      satisfaction: 45, 
      headcount: 85,
      averageAge: 32,
      averageAgeRank: 5,
      promotionRate: 8,
      promotionRateRank: 6,
      workload: '大'
    },
    3: { 
      name: '人事部', 
      flowRate: 15, 
      satisfaction: 90, 
      headcount: 30,
      averageAge: 30,
      averageAgeRank: 4,
      promotionRate: 12,
      promotionRateRank: 4,
      workload: '小'
    },
    4: { 
      name: '财务部', 
      flowRate: 10, 
      satisfaction: 70, 
      headcount: 25,
      averageAge: 35,
      averageAgeRank: 6,
      promotionRate: 10,
      promotionRateRank: 5,
      workload: '较小'
    },
    5: { 
      name: '运营部', 
      flowRate: 45, 
      satisfaction: 60, 
      headcount: 65,
      averageAge: 27,
      averageAgeRank: 2,
      promotionRate: 18,
      promotionRateRank: 1,
      workload: '较大'
    },
    6: { 
      name: '设计部', 
      flowRate: 35, 
      satisfaction: 75, 
      headcount: 40,
      averageAge: 26,
      averageAgeRank: 1,
      promotionRate: 14,
      promotionRateRank: 3,
      workload: '中等'
    },
  };

  // 模拟流动人员数据
  const flowEmployees = [
    { 
      id: 1, 
      name: '张三', 
      currentDepartment: '技术部', 
      departmentPath: '技术部 → 市场部', 
      position: '前端工程师', 
      level: 'P6',
      targetDepartment: '市场部',
      targetDepartmentPath: '市场部',
      targetPosition: '产品经理',
      targetLevel: 'M1',
      transferType: '主动调岗',
      executionDate: '2023-06-15'
    },
    { 
      id: 2, 
      name: '李四', 
      currentDepartment: '技术部', 
      departmentPath: '技术部 → 产品部', 
      position: '后端工程师', 
      level: 'P7',
      targetDepartment: '产品部',
      targetDepartmentPath: '产品部',
      targetPosition: '技术经理',
      targetLevel: 'M2',
      transferType: '晋升调岗',
      executionDate: '2023-08-22'
    },
    { 
      id: 3, 
      name: '王五', 
      currentDepartment: '技术部', 
      departmentPath: '技术部 → 技术部', 
      position: '初级工程师', 
      level: 'P5',
      targetDepartment: '技术部',
      targetDepartmentPath: '技术部',
      targetPosition: '中级工程师',
      targetLevel: 'P6',
      transferType: '内部晋升',
      executionDate: '2023-09-10'
    }
  ];

  // 模拟被借用人员数据
  const borrowedEmployees = [
    { 
      id: 4, 
      name: '赵六', 
      currentDepartment: '技术部', 
      departmentPath: '技术部 → 项目A组', 
      position: 'UI设计师', 
      level: 'P6',
      targetDepartment: '项目A组',
      targetDepartmentPath: '项目A组',
      targetPosition: 'UI设计顾问',
      targetLevel: 'C1',
      transferType: '项目借用',
      executionDate: '2023-07-01'
    },
    { 
      id: 5, 
      name: '钱七', 
      currentDepartment: '技术部', 
      departmentPath: '技术部 → 项目B组', 
      position: '测试工程师', 
      level: 'P6',
      targetDepartment: '项目B组',
      targetDepartmentPath: '项目B组',
      targetPosition: '测试顾问',
      targetLevel: 'C1',
      transferType: '项目借用',
      executionDate: '2023-05-15'
    }
  ];

  // AI建议数据
  const aiSuggestions = [
    "该部门人才流动率适中，建议加强员工职业发展规划，提升长期留存率。",
    "满意度较高，可以考虑将该部门作为公司文化建设的标杆进行推广。",
    "建议增加跨部门交流机会，促进知识共享和团队协作。"
  ];

  const department = departmentData[id] || { 
    name: '未知部门', 
    flowRate: 0, 
    satisfaction: 0, 
    headcount: 0,
    averageAge: 0,
    averageAgeRank: 0,
    promotionRate: 0,
    promotionRateRank: 0,
    workload: '未知'
  };

  return (
    <DashboardLayout title={`${department.name} - 部门详情`}>
      <div className="space-y-6">
        <div className="flex items-center mb-6">
          <Button 
            onClick={() => navigate(-1)} 
            variant="outline" 
            className="bg-slate-900/60 border-cyan-400/30 text-cyan-100 hover:bg-cyan-400/10 hover:border-cyan-400/60"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> 返回
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* 部门基本信息卡片 */}
          <GlowCard 
            title="部门基本信息" 
            icon={<Building className="w-5 h-5" />}
            glowColor="#47dae8"
          >
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-cyan-200/80">部门名称:</span>
                <span className="data-highlight">{department.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-cyan-200/80">部门人数:</span>
                <span className="data-highlight">{department.headcount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-cyan-200/80">人才流动率:</span>
                <span className="data-highlight">{department.flowRate}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-cyan-200/80">满意度:</span>
                <span className="data-highlight">{department.satisfaction}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-cyan-200/80">平均年龄:</span>
                <span className="data-highlight">{department.averageAge}岁 (排名第{department.averageAgeRank})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-cyan-200/80">年度晋升比例:</span>
                <span className="data-highlight">{department.promotionRate}% (排名第{department.promotionRateRank})</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-cyan-200/80">工作负荷情况:</span>
                <Badge 
                  className={`${department.workload === '大' || department.workload === '较大' 
                    ? 'bg-red-900/30 text-red-300 border-red-400/50' 
                    : 'bg-green-900/30 text-green-300 border-green-400/50'
                  } border`}
                >
                  {department.workload}
                </Badge>
              </div>
            </div>
          </GlowCard>

          {/* AI分析建议卡片 */}
          <GlowCard 
            title="AI分析建议" 
            icon={<TrendingUp className="w-5 h-5" />}
            glowColor="#8b5cf6"
            className="md:col-span-2"
          >
            <ul className="list-disc pl-5 space-y-2">
              {aiSuggestions.map((suggestion, index) => (
                <li key={index} className="text-cyan-200/80">{suggestion}</li>
              ))}
            </ul>
          </GlowCard>
        </div>

        {/* 人员流动详情卡片 */}
        <GlowCard 
          title="人员流动 & 借调详情" 
          icon={<Users className="w-5 h-5" />}
          glowColor="#22c55e"
        >
          <Tabs defaultValue="flow" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-slate-800/60 border border-cyan-400/30">
              <TabsTrigger 
                value="flow" 
                className="flex items-center data-[state=active]:bg-cyan-400/20 data-[state=active]:text-cyan-300 text-cyan-100/80"
              >
                <UserPlus className="mr-2 h-4 w-4" />
                流动人员 ({flowEmployees.length})
              </TabsTrigger>
              <TabsTrigger 
                value="borrow" 
                className="flex items-center data-[state=active]:bg-cyan-400/20 data-[state=active]:text-cyan-300 text-cyan-100/80"
              >
                <Users2 className="mr-2 h-4 w-4" />
                被借用人员 ({borrowedEmployees.length})
              </TabsTrigger>
            </TabsList>
            <TabsContent value="flow" className="mt-4">
              <div className="overflow-x-auto custom-scrollbar">
                <table className="w-full cyber-table">
                  <thead>
                    <tr>
                      <th className="text-left py-3 px-4">姓名</th>
                      <th className="text-left py-3 px-4">现状</th>
                      <th className="text-left py-3 px-4">拟调情况</th>
                      <th className="text-left py-3 px-4">调配类型</th>
                      <th className="text-left py-3 px-4">执行时间</th>
                    </tr>
                  </thead>
                  <tbody>
                    {flowEmployees.map((employee) => (
                      <tr key={employee.id}>
                        <td className="py-3 px-4">
                          <span className="data-highlight">{employee.name}</span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="text-sm">
                            <div>部门: {employee.currentDepartment}</div>
                            <div>路径: {employee.departmentPath}</div>
                            <div>岗位: {employee.position}</div>
                            <div>层级: {employee.level}</div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="text-sm">
                            <div>部门: {employee.targetDepartment}</div>
                            <div>路径: {employee.targetDepartmentPath}</div>
                            <div>岗位: {employee.targetPosition}</div>
                            <div>层级: {employee.targetLevel}</div>
                          </div>
                        </td>
                        <td className="py-3 px-4">{employee.transferType}</td>
                        <td className="py-3 px-4">
                          <span className="data-highlight">{employee.executionDate}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>
            <TabsContent value="borrow" className="mt-4">
              <div className="overflow-x-auto custom-scrollbar">
                <table className="w-full cyber-table">
                  <thead>
                    <tr>
                      <th className="text-left py-3 px-4">姓名</th>
                      <th className="text-left py-3 px-4">现状</th>
                      <th className="text-left py-3 px-4">拟调情况</th>
                      <th className="text-left py-3 px-4">调配类型</th>
                      <th className="text-left py-3 px-4">执行时间</th>
                    </tr>
                  </thead>
                  <tbody>
                    {borrowedEmployees.map((employee) => (
                      <tr key={employee.id}>
                        <td className="py-3 px-4">
                          <span className="data-highlight">{employee.name}</span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="text-sm">
                            <div>部门: {employee.currentDepartment}</div>
                            <div>路径: {employee.departmentPath}</div>
                            <div>岗位: {employee.position}</div>
                            <div>层级: {employee.level}</div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="text-sm">
                            <div>部门: {employee.targetDepartment}</div>
                            <div>路径: {employee.targetDepartmentPath}</div>
                            <div>岗位: {employee.targetPosition}</div>
                            <div>层级: {employee.targetLevel}</div>
                          </div>
                        </td>
                        <td className="py-3 px-4">{employee.transferType}</td>
                        <td className="py-3 px-4">
                          <span className="data-highlight">{employee.executionDate}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>
          </Tabs>
        </GlowCard>
      </div>
    </DashboardLayout>
  );
};

export default DepartmentDetail;
