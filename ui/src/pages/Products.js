
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
  const { data } = useQuery(HOUSES_QUERY, {
  pollInterval: 5000,
  fetchPolicy: 'no-cache',});

  const houses = data?.getHouses || [];
  console.log(houses);
  


  return (
    <Page title="Dashboard: Home">
      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Home
        </Typography>

        {houses.length === 0 && <Stack>No data Available</Stack>}

        <ProductList products={houses} />
      </Container>
    </Page>
  );
}
