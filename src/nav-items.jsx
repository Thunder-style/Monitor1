import { HomeIcon, Users, BarChart3 } from "lucide-react";
import Index from "./pages/Index.jsx";
import DepartmentDetail from "./pages/DepartmentDetail.jsx";
import Visualization from "./pages/Visualization.jsx";

/**
* Central place for defining the navigation items. Used for navigation components and routing.
*/
export const navItems = [
{
    title: "实时监控",
    to: "/",
    icon: <HomeIcon className="h-4 w-4" />,
    page: <Index />,
},
{
    title: "部门详情",
    to: "/department/:id",
    icon: <Users className="h-4 w-4" />,
    page: <DepartmentDetail />,
    hideFromNav: true, // 这个路由不在导航栏中显示
},
{
    title: "数据可视化",
    to: "/visualization",
    icon: <BarChart3 className="h-4 w-4" />,
    page: <Visualization />,
    hideFromNav: true, // 这个路由不在导航栏中显示
},
];
