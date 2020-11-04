import Create from 'pages/create';
import Ct from 'pages/create/ct';
import Ce from 'pages/create/ce';
const createRoutes = [
    {
      path:'/createteam',
      component:Ct,
    },
    {
      path:'/createenter',
      component:Ce,
    },
    {
      path: '/',
      component:Create,
      // exact: true,
    },
  ]

export default createRoutes;
