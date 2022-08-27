// import { faker } from '@faker-js/faker';
// import { indexOf } from 'lodash';
import { sample } from 'lodash';

// ----------------------------------------------------------------------

const PRODUCT_NAME = [];
const PRODUCT_COLOR = [];
const PRODUCT_BEDROOMS=['A'];


// ----------------------------------------------------------------------

const products = [...Array(2)].map((_, index) => {
  const setIndex = index + 1;
 
  return {
   
    cover: `/static/mock-images/products/product_${setIndex}.jpg`,
    name: PRODUCT_NAME[index],
    bedRooms: PRODUCT_BEDROOMS[index],
    
    colors:
   
      PRODUCT_COLOR,
    status: sample(['reserved', '', '', '']),
  };
});

export default products;
