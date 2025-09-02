import { HomeIcon, Users, BarChart3 } from "lucide-react";
import Index from "./pages/Index.jsx";
import DepartmentDetail from "./pages/DepartmentDetail.jsx";
import Visualization from "./pages/Visualization.jsx";

/**
* Central place for defining the navigation items. Used for navigation components and routing.
*/
export const navItems = [
{
    title: "Home",
    to: "/",
    icon: <HomeIcon className="h-4 w-4" />,
    page: <Index />,
},
{
    title: "部门详情",
    to: "/department/:id",
    icon: <Users className="h-4 w-4" />,
    page: <DepartmentDetail />,
},
{
    title: "数据可视化",
    to: "/visualization",
    icon: <BarChart3 className="h-4 w-4" />,
    page: <Visualization />,
},
];
