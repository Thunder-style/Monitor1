import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const ExpertHiringTable = () => {
  const navigate = useNavigate();

  // 模拟专家数据
  const experts = [
    { id: 1, name: '张伟', position: '高级工程师', department: '技术部', expertise: '前端开发', experience: '8年' },
    { id: 2, name: '李娜', position: '数据科学家', department: '数据部', expertise: '机器学习', experience: '6年' },
    { id: 3, name: '王强', position: '产品经理', department: '产品部', expertise: '用户体验', experience: '10年' },
    { id: 4, name: '赵敏', position: '架构师', department: '技术部', expertise: '系统架构', experience: '12年' },
    { id: 5, name: '陈军', position: '安全专家', department: '安全部', expertise: '网络安全', experience: '9年' },
  ];

  const handleViewDetails = (expertId) => {
    navigate(`/expert/${expertId}`);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>专家选聘</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>姓名</TableHead>
              <TableHead>职位</TableHead>
              <TableHead>部门</TableHead>
              <TableHead>专业领域</TableHead>
              <TableHead>经验</TableHead>
              <TableHead>操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {experts.map((expert) => (
              <TableRow key={expert.id}>
                <TableCell>{expert.name}</TableCell>
                <TableCell>{expert.position}</TableCell>
                <TableCell>{expert.department}</TableCell>
                <TableCell>{expert.expertise}</TableCell>
                <TableCell>{expert.experience}</TableCell>
                <TableCell>
                  <Button onClick={() => handleViewDetails(expert.id)} variant="outline" size="sm">
                    查看详情
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default ExpertHiringTable;
