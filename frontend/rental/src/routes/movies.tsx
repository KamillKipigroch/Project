import { getProducts } from "../services/data";
import { Link, Outlet } from "react-router-dom";
import BoxComponent from '../components/productBox';
import styled from "styled-components";
import Maleficent from "../assets/maleficent.webp";
import SpiderMan from "../assets/spiderMan.jpeg";
import FilterComponent from '../components/filterComponent';

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

export default function Movies() {
  return (
    <div>
      <Container>
        <FilterComponent category="movies" quality={["Silver standard", "Gold VIP", "Platinum premium"]} condition={["Super hero", "Hero from big city", "Neighbourhood hero"]} priceMax={0} priceMin={500}/>
        <ProductSection>
          <div style={{color:'#333333', display:'flex', fontSize: '30px', margin: '20px', fontWeight: 'bold'}}>
              Movies
          </div>
          <ProductsContainer>
            <BoxComponent path={SpiderMan} name="Spider Man" price={56.19}></BoxComponent>
            <BoxComponent path={Maleficent} name="Maleficent" price={99.99}></BoxComponent>
          </ProductsContainer>
        </ProductSection>
      </Container>
      <Outlet/>
    </div>
  );
}
