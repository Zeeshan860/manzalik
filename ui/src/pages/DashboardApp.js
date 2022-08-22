import { faker } from '@faker-js/faker';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
import { useQuery } from '@apollo/client';
import { CURRENT_USER_QUERY} from '../graphql';

// components
import Page from '../components/Page';
import Iconify from '../components/Iconify';
// sections
import {
  AppTasks,
  AppNewsUpdate,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppWidgetSummary,
  AppCurrentSubject,
  AppConversionRates,
} from '../sections/@dashboard/app';



// ----------------------------------------------------------------------

export default function DashboardApp() {
  const theme = useTheme();
  
  const { loading, error, data } = useQuery(CURRENT_USER_QUERY);
  console.log(data);

  return (
    <Page title="Dashboard">
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back
        </Typography>

        <Grid container spacing={12}>
          <Grid item xs={12} sm={9} md={4}>
            <AppWidgetSummary title="Total Houses" total={714000} icon={'ant-design:android-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <AppWidgetSummary title="Available Houses" total={1352831} color="info" icon={'ant-design:apple-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <AppWidgetSummary title=" Reserved Houses" total={1723315} color="warning" icon={'ant-design:windows-filled'} />
          </Grid>
          <Grid item xs={18} md={6} lg={13}>
            <AppCurrentVisits
              title="Houses"
              chartData={[
                { label: 'Total Houses', value: 4344 },
                { label: 'Available Houses', value: 5435 },
                { label: 'Reserved Houses', value: 1443 },
                
              ]}
              chartColors={[
                theme.palette.primary.main,
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
