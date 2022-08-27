
import { useState } from 'react';
import { useQuery } from '@apollo/client';
// material
import { Container, Stack, Typography } from '@mui/material';
// components
import Page from '../components/Page';
import { ProductSort, ProductList,  ProductFilterSidebar } from '../sections/@dashboard/products';
import { HOUSES_QUERY } from '../graphql';
// mock
import PRODUCTS from '../_mock/products';

// ----------------------------------------------------------------------

export default function EcommerceShop() {
  const [openFilter, setOpenFilter] = useState(false);
  const { loading, error, data } = useQuery(HOUSES_QUERY);

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };
  const houses = data?.getHouses || [];
  console.log(houses);
  


  return (
    <Page title="Dashboard: Home">
      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Home
        </Typography>

        <ProductList products={houses} />
      </Container>
    </Page>
  );
}
