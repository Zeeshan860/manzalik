import { faker } from '@faker-js/faker';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
import { useQuery } from '@apollo/client';
import { CURRENT_USER_QUERY, AGREGATE_HOUSE_QUERY} from '../graphql';

// components
import Page from '../components/Page';
// sections
import {
  AppCurrentVisits,
  AppWidgetSummary,
} from '../sections/@dashboard/app';



// ----------------------------------------------------------------------

export default function DashboardApp() {
  const theme = useTheme();
  
  const { data } = useQuery(CURRENT_USER_QUERY);
  const { data: agregateData } = useQuery(AGREGATE_HOUSE_QUERY, {
    pollInterval: 5000,
    fetchPolicy: 'no-cache',});
  console.log(data);

  return (
    <Page title="Dashboard">
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back
        </Typography>

        <Grid container spacing={12}>
          <Grid item xs={12} sm={9} md={4}>
            <AppWidgetSummary title="Total Houses" total={agregateData?.getHousesAgregate?.total || 0} icon={'ant-design:home-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <AppWidgetSummary title="Available Houses" total={agregateData?.getHousesAgregate?.nonReserved || 0} color="info" icon={'ant-design:home-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <AppWidgetSummary title=" Reserved Houses" total={agregateData?.getHousesAgregate?.reserved || 0} color="warning" icon={'ant-design:home-filled'} />
          </Grid>
          <Grid item xs={18} md={6} lg={13}>
            <AppCurrentVisits
              title="Houses"
              chartData={[
                { label: 'Available Houses', value: agregateData?.getHousesAgregate?.nonReserved || 0 },
                { label: 'Reserved Houses', value: agregateData?.getHousesAgregate?.reserved || 0 },
                
              ]}
              chartColors={[
                theme.palette.chart.blue[0],
                theme.palette.chart.violet[0],
              ]}
            />
          </Grid>

        </Grid>
      </Container>
    </Page>
  );
}
