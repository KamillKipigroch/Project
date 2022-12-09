import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Maleficent from "../assets/maleficent.webp";
import SpiderMan from "../assets/spiderMan.jpeg";
import FilterComponent from '../components/filterComponent';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
const Container = styled.div`
  display: flex;
  flex-direction: row;
`

const ProductsContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  // justify-content: space-around;
`

const ProductSection = styled.div`
  width: 80%
`

const PriceContainer = styled.div`
  display: flex,
  flex-direction: 'row',
  justifyContent: 'flex-end',
  alignItems: 'flex-end',
`

export default function Movies() {

  //TODO filtrowanie ¯\_(ツ)_/¯

  //get products
  // const { productStore } = useStores();
  // useEffect(() => {
  //   productStore.fetchProducts()
  //     .then(() => console.log(toJS(productStore.allProducts)));
  // }, [productStore]);

  // let display = []
  // for (let i = 0; i < productStore.allProducts.length; i++) {
  //   display.push({
  //     id: productStore.allProducts[i].id,
  //     businessKey: productStore.allProducts[i].businessKey,
  //     visible: productStore.allProducts[i].visible,
  //     name: productStore.allProducts[i].code,
  //     createDate: productStore.allProducts[i].createDate,
  //     description: productStore.allProducts[i].description,
  //     price: productStore.allProducts[i].price.toFixed(2),
  //     hero: productStore.allProducts[i].hero,
  //     productType: productStore.allProducts[i].productType.code,
  //     quality:  productStore.allProducts[i].quality.code,
  //     condition: productStore.allProducts[i].condition.code,
  //     subcategory: productStore.allProducts[i].subcategory.code,
  //     // TODO opinions
  //     opinions: '',
  //     image: '',
  //   });
  // }

  let display = [
    {
      name: "Maleficient",
      price: 231,
      image: Maleficent
    },
    {
      name: "SpoderMan",
      price: 12233,
      image: SpiderMan
    },
    {
      name: "test ildsagi da dsaiua dslidau dasdai  ibiu b",
      price: 123,
      image: Maleficent
    },
  ]

  return (
    <div>
      <Container>
        {/* filterComponent ( ´･･)ﾉ(._.`) */}
        <FilterComponent category="movies" quality={["Silver standard", "Gold VIP", "Platinum premium"]} condition={["Super hero", "Hero from big city", "Neighbourhood hero"]} priceMax={0} priceMin={500} />
        <ProductSection>
          <div style={{ color: '#333333', display: 'flex', fontSize: '30px', margin: '20px', fontWeight: 'bold' }}>
            Movies
          </div>
          <ProductsContainer>

            {/* dynamiczne wyświetlanie produktów */}
            {display.map(product => (
              <Box component="span" sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-start',
                width: 260,
                height: 380,
                backgroundColor: '#DBC8AC',
                overflow: 'hidden',
                '&:hover': {
                  backgroundColor: '#d97d7d',
                  opacity: [0.9, 0.8, 0.7],
                },
                margin: 2,
              }}>
                <img src={product.image} width='250' sizes='max-' style={{ width: "250px", height: "310px", objectFit: "cover" }}></img>
                <Typography style={{textOverflow: "ellipsis"}}>{product.name}</Typography>
                <PriceContainer><Typography>{product.price}zł</Typography></PriceContainer>
              </Box>
            ))}

          </ProductsContainer>
        </ProductSection>
      </Container>
      <Outlet />
    </div>
  );
}
