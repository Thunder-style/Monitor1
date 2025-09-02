import React from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ExpertDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // 模拟专家数据
  const expertData = {
    1: { 
      name: '张伟', 
      position: '高级工程师', 
      department: '技术部', 
      expertise: '前端开发', 
      experience: '8年',
      email: 'zhangwei@example.com',
      phone: '138-0000-0001',
      projects: [
        { name: '电商平台重构', role: '前端负责人', duration: '2023.01-2023.08' },
        { name: '移动端应用开发', role: '技术专家', duration: '2022.03-2022.12' }
      ]
    },
    2: { 
      name: '李娜', 
      position: '数据科学家', 
      department: '数据部', 
      expertise: '机器学习', 
      experience: '6年',
      email: 'lina@example.com',
      phone: '138-0000-0002',
      projects: [
        { name: '用户行为分析系统', role: '算法负责人', duration: '2023.03-2023.10' },
        { name: '推荐系统优化', role: '数据科学家', duration: '2022.06-2023.02' }
      ]
    },
    3: { 
      name: '王强', 
      position: '产品经理', 
      department: '产品部', 
      expertise: '用户体验', 
      experience: '10年',
      email: 'wangqiang@example.com',
      phone: '138-0000-0003',
      projects: [
        { name: '智能客服系统', role: '产品总监', duration: '2023.02-2023.11' },
        { name: '企业管理系统', role: '产品经理', duration: '2022.01-2023.01' }
      ]
    },
    4: { 
      name: '赵敏', 
      position: '架构师', 
      department: '技术部', 
      expertise: '系统架构', 
      experience: '12年',
      email: 'zhaomin@example.com',
      phone: '138-0000-0004',
      projects: [
        { name: '微服务架构改造', role: '首席架构师', duration: '2023.04-2023.12' },
        { name: '云平台建设', role: '技术架构师', duration: '2022.05-2023.03' }
      ]
    },
    5: { 
      name: '陈军', 
      position: '安全专家', 
      department: '安全部', 
      expertise: '网络安全', 
      experience: '9年',
      email: 'chenjun@example.com',
      phone: '138-0000-0005',
      projects: [
        { name: '企业安全防护体系', role: '安全负责人', duration: '2023.05-2023.12' },
        { name: '数据加密系统', role: '安全专家', duration: '2022.08-2023.04' }
      ]
    },
  };

  const expert = expertData[id] || { 
    name: '未知专家', 
    position: '', 
    department: '', 
    expertise: '', 
    experience: '',
    email: '',
    phone: '',
    projects: []
  };

  return (
    <div className="p-6">
      <Button onClick={() => navigate(-1)} variant="outline" className="mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" /> 返回
      </Button>
      
      <Card className="mb-6">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl">{expert.name}</CardTitle>
              <p className="text-gray-500">{expert.position} | {expert.department}</p>
            </div>
            <Badge variant="default">{expert.expertise}</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium mb-2">基本信息</h3>
              <p>工作经验: {expert.experience}</p>
              <p>邮箱: {expert.email}</p>
              <p>电话: {expert.phone}</p>
            </div>
            <div>
              <h3 className="font-medium mb-2">专业技能</h3>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">JavaScript</Badge>
                <Badge variant="secondary">React</Badge>
                <Badge variant="secondary">Node.js</Badge>
                <Badge variant="secondary">系统设计</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>参与项目</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {expert.projects.map((project, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <h3 className="font-medium">{project.name}</h3>
                <div className="flex justify-between mt-2">
                  <p className="text-sm text-gray-500">角色: {project.role}</p>
                  <p className="text-sm text-gray-500">{project.duration}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExpertDetail;
