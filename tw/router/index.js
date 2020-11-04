import React from 'react';
import asyncComponent from './lazyload';
import Wrap from 'pages/wrap';

// const Portal = asyncComponent(() => import(/* webpackChunkName: "Manage" */'pages/portal'));
// 工作台首页
const Home = asyncComponent(() => import(/* webpackChunkName: "Manage" */'pages/home'));
// 首页编辑
const Manage = asyncComponent(() => import(/* webpackChunkName: "Manage" */'pages/manage'));
// 搜索
const Search = asyncComponent(() => import(/* webpackChunkName: "Search" */'pages/search'));
// 个人主页
const HomePage = asyncComponent(() => import(/* webpackChunkName: "HomePage" */'pages/homepage'));
// 创建团队/企业（有租户，创建新租户）
const Establish = asyncComponent(() => import(/* webpackChunkName: "Establish" */'pages/establish'));
// 创建团队
const CreateTeam = asyncComponent(() => import(/* webpackChunkName: "CreateTeam" */'pages/createteam'));
// 创建企业
const CreateEnter = asyncComponent(() => import(/* webpackChunkName: "CreateEnter" */'pages/createenter'));
// 团队设置
const Teamconfig = asyncComponent(() => import(/* webpackChunkName: "Teamconfig" */'pages/teamconfig'));
// 团队升级为企业
const UpdateEnter = asyncComponent(() => import(/* webpackChunkName: "UpdateEnter" */'pages/updateenter'));
// 邀请成员
const Invitation = asyncComponent(() => import(/* webpackChunkName: "Invitation" */'pages/invitation'));

// 应用市场
// const Market = asyncComponent(() => import(/* webpackChunkName: "Market" */'pages/market'));
// 全部历史
// const History = asyncComponent(() => import(/* webpackChunkName: "History" */'pages/history'));

const routes = [
	{
		path: '/',
		component: Wrap,
		routes: [
			{
				path: '/',
				component: Home,
				exact: true,
			},
			{
				path: '/manage',
				component: Manage,
				exact: true,
			}
		],
	},
];

export const Pages = {
	// Portal: <Portal />,
	Search: <Search />,
	HomePage: <HomePage />,
	Establish: <Establish />,
	CreateTeam: <CreateTeam />,
	CreateEnter: <CreateEnter />,
	Teamconfig: <Teamconfig />,
	UpdateEnter: <UpdateEnter />,
	Invitation: <Invitation />,
	// Market: <Market />,
	// History: <History />,
}
export default routes;
