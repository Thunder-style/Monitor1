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
    <div className="p-6">
      <Button onClick={() => navigate(-1)} variant="outline" className="mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" /> 返回
      </Button>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* 部门基本信息卡片 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Building className="mr-2 h-5 w-5" />
              部门基本信息
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span>部门名称:</span>
              <span className="font-medium">{department.name}</span>
            </div>
            <div className="flex justify-between">
              <span>部门人数:</span>
              <span className="font-medium">{department.headcount}</span>
            </div>
            <div className="flex justify-between">
              <span>人才流动率:</span>
              <span className="font-medium">{department.flowRate}%</span>
            </div>
            <div className="flex justify-between">
              <span>满意度:</span>
              <span className="font-medium">{department.satisfaction}%</span>
            </div>
            <div className="flex justify-between">
              <span>平均年龄:</span>
              <span className="font-medium">{department.averageAge}岁 (排名第{department.averageAgeRank})</span>
            </div>
            <div className="flex justify-between">
              <span>年度晋升比例:</span>
              <span className="font-medium">{department.promotionRate}% (排名第{department.promotionRateRank})</span>
            </div>
            <div className="flex justify-between">
              <span>工作负荷情况:</span>
              <Badge variant={department.workload === '大' || department.workload === '较大' ? 'destructive' : 'default'}>
                {department.workload}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* AI分析建议卡片 */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="mr-2 h-5 w-5" />
              AI分析建议
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-2">
              {aiSuggestions.map((suggestion, index) => (
                <li key={index}>{suggestion}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* 人员流动详情卡片 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="mr-2 h-5 w-5" />
            人员流动 & 借调详情
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="flow" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="flow" className="flex items-center">
                <UserPlus className="mr-2 h-4 w-4" />
                流动人员 ({flowEmployees.length})
              </TabsTrigger>
              <TabsTrigger value="borrow" className="flex items-center">
                <Users2 className="mr-2 h-4 w-4" />
                被借用人员 ({borrowedEmployees.length})
              </TabsTrigger>
            </TabsList>
            <TabsContent value="flow" className="mt-4">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>姓名</TableHead>
                      <TableHead>现状</TableHead>
                      <TableHead>拟调情况</TableHead>
                      <TableHead>调配类型</TableHead>
                      <TableHead>执行时间</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {flowEmployees.map((employee) => (
                      <TableRow key={employee.id}>
                        <TableCell className="font-medium">{employee.name}</TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div>部门: {employee.currentDepartment}</div>
                            <div>路径: {employee.departmentPath}</div>
                            <div>岗位: {employee.position}</div>
                            <div>层级: {employee.level}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div>部门: {employee.targetDepartment}</div>
                            <div>路径: {employee.targetDepartmentPath}</div>
                            <div>岗位: {employee.targetPosition}</div>
                            <div>层级: {employee.targetLevel}</div>
                          </div>
                        </TableCell>
                        <TableCell>{employee.transferType}</TableCell>
                        <TableCell>{employee.executionDate}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            <TabsContent value="borrow" className="mt-4">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>姓名</TableHead>
                      <TableHead>现状</TableHead>
                      <TableHead>拟调情况</TableHead>
                      <TableHead>调配类型</TableHead>
                      <TableHead>执行时间</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {borrowedEmployees.map((employee) => (
                      <TableRow key={employee.id}>
                        <TableCell className="font-medium">{employee.name}</TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div>部门: {employee.currentDepartment}</div>
                            <div>路径: {employee.departmentPath}</div>
                            <div>岗位: {employee.position}</div>
                            <div>层级: {employee.level}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div>部门: {employee.targetDepartment}</div>
                            <div>路径: {employee.targetDepartmentPath}</div>
                            <div>岗位: {employee.targetPosition}</div>
                            <div>层级: {employee.targetLevel}</div>
                          </div>
                        </TableCell>
                        <TableCell>{employee.transferType}</TableCell>
                        <TableCell>{employee.executionDate}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default DepartmentDetail;
