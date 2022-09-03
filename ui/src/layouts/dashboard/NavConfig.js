// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navConfig = [
  {
    title: 'Home',
    path: '/dashboard/home',
    icon: getIcon('eva:shopping-bag-fill'),
  },
  {
    title: 'Personal Houses',
    path: '/dashboard/personal-houses',
    icon: getIcon('mdi:home-group'),
  },
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: getIcon('eva:pie-chart-2-fill'),
  },
];

export default navConfig;
