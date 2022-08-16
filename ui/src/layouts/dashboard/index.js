import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
// material
import { styled } from '@mui/material/styles';
//
import DashboardNavbar from './DashboardNavbar';
import DashboardSidebar from './DashboardSidebar';
import { CURRENT_USER_QUERY } from '../../graphql';
// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const RootStyle = styled('div')({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden',
});

const MainStyle = styled('div')(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  minHeight: '100%',
  paddingTop: APP_BAR_MOBILE + 24,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up('lg')]: {
    paddingTop: APP_BAR_DESKTOP + 24,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

// ----------------------------------------------------------------------

export default function DashboardLayout() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { loading, error, data } = useQuery(CURRENT_USER_QUERY);
  if (loading) {
    return <div>Loading...</div>;
  }
  if (!loading && (error || !data)) {
    navigate('/login', { replace: true });
    return null;
  }
  return (
    <RootStyle>
      <DashboardNavbar onOpenSidebar={() => setOpen(true)} currentUser={data?.me}/>
      <DashboardSidebar isOpenSidebar={open} onCloseSidebar={() => setOpen(false)} currentUser={data?.me} />
      <MainStyle>
        <Outlet />
      </MainStyle>
    </RootStyle>
  );
}
