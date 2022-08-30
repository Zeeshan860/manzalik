import { useEffect, useState } from 'react';
import { Outlet, useNavigate, useOutletContext, useLocation  } from 'react-router-dom';
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
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [isNonLoginMode, setIsNonLoginMode] = useState(false);
  const { loading, error, data } = useQuery(CURRENT_USER_QUERY);

  useEffect(()=>{
    if (!loading && (error || !data) && location.pathname !== "/dashboard/home") {
      navigate('/login', { replace: true });
      setIsNonLoginMode(true)
    }
  }, [loading, error, data])

  if (loading) {
    return <div>Loading...</div>;
  }
  
  return (
    <RootStyle>
      <DashboardNavbar onOpenSidebar={() => setOpen(true)} currentUser={data?.me}/>
      <DashboardSidebar isOpenSidebar={open} onCloseSidebar={() => setOpen(false)} currentUser={data?.me} />
      <MainStyle>
        <Outlet context={{ user: data?.me }}/>
      </MainStyle>
    </RootStyle>
  );
}

export function useUser() {
  return useOutletContext();
}
