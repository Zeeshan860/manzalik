import { Outlet,useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
// material
import { styled } from '@mui/material/styles';
// components
import Logo from '../components/Logo';
import { CURRENT_USER_QUERY } from '../graphql';
// ----------------------------------------------------------------------

const HeaderStyle = styled('header')(({ theme }) => ({
  top: 0,
  left: 0,
  lineHeight: 0,
  width: '100%',
  position: 'absolute',
  padding: theme.spacing(3, 3, 0),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(5, 5, 0),
  },
}));

// ----------------------------------------------------------------------

export default function LogoOnlyLayout() {
  const navigate = useNavigate();
  const { loading, error, data } = useQuery(CURRENT_USER_QUERY);
  if (loading) {
    return <div>Loading...</div>;
  }
  if (!loading && (!error || data)) {
    navigate('/dashboard/home', { replace: true });
    return null;
  }
  return (
    <>
      <HeaderStyle>
        <Logo />
      </HeaderStyle>
      <Outlet />
    </>
  );
}
