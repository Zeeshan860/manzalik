
import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { orderBy } from 'lodash'
// material
import { Container, Stack, Typography } from '@mui/material';
// components
import Page from '../components/Page';
import { ProductSort, ProductList,  ProductFilterSidebar } from '../sections/@dashboard/products';
import { HOUSES_QUERY } from '../graphql';
// mock

// ----------------------------------------------------------------------

const sort = (houses, sortBy) => {
  switch (sortBy){
    case 'Newest':
      return houses.sort((d1, d2) => new Date(d1.date).getTime() - new Date(d2.date).getTime())
    case 'Price: High-Low':
      return orderBy(houses, 'rentalPrice', 'desc')
    case 'Price: Low-High':
      return orderBy(houses, 'rentalPrice', 'asc')
    default:
      return houses
  }
}

export default function EcommerceShop() {
  const { data } = useQuery(HOUSES_QUERY, {
  pollInterval: 5000,
  fetchPolicy: 'no-cache',});

  const [openFilter, setOpenFilter] = useState(false);
  const [sortBy, setSortBy] = useState('newest');
  const [houses, setHouses] = useState([]);

  useEffect(() => {
    setHouses(sort(data?.getHouses || [], sortBy))
  }, [data, sortBy])

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  // const houses = data?.getHouses || [];


  return (
    <Page title="Dashboard: Home">
      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Home
        </Typography>

        <Stack direction="row" flexWrap="wrap-reverse" alignItems="center" justifyContent="flex-end" sx={{ mb: 5 }}>
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            <ProductFilterSidebar
              isOpenFilter={openFilter}
              onOpenFilter={handleOpenFilter}
              onCloseFilter={handleCloseFilter}
            />
            <ProductSort value={sortBy} setValue={setSortBy}/>
          </Stack>
        </Stack>

        {houses.length === 0 && <Stack>No data Available</Stack>}

        <ProductList products={houses} />
      </Container>
    </Page>
  );
}
