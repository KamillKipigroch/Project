import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Maleficent from "../assets/maleficent.webp";
import SpiderMan from "../assets/spiderMan.jpeg";
import test1 from "../assets/test1.jpg";
import test2 from "../assets/test2.png";
import FilterComponent from "../components/filterComponent";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useStores } from "../stores/root.store";
import { useEffect } from "react";
import CostumesDetailsPopup from "../components/Popup/CostumesDetailsPopup";

const Container = styled.div`
  display: flex;
  flex-direction: row;
`;

const ProductsContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  // justify-content: space-around;
`;

const ProductSection = styled.div`
  width: 80%;
`;

const PriceContainer = styled.div`
  display: flex,
  flex-direction: 'row',
  justifyContent: 'flex-end',
  alignItems: 'flex-end',
`;

const Costumes = () => {
  const { productStore } = useStores();

  useEffect(() => {
    productStore.fetchProducts();
  }, [productStore]);

  const tempImages = [test1, test2, Maleficent, SpiderMan];

  const getRandomElement = () => {
    return tempImages[Math.floor(Math.random() * tempImages.length)];
  };

  return (
    <div>
      <Container>
        {/* filterComponent ( ´･･)ﾉ(._.`) */}
        <FilterComponent />
        <ProductSection>
          <div
            style={{
              color: "#333333",
              display: "flex",
              fontSize: "30px",
              margin: "20px",
              fontWeight: "bold",
            }}
          >
            Number of products: {productStore.countVisibleProducts}
          </div>
          <ProductsContainer>
            {/* dynamiczne wyświetlanie produktów */}
            {productStore.visibleProducts2.map((product) => (
              <Box
                key={product.id}
                onClick={() => productStore.openDetailsPopup(product.id)}
                component="span"
                sx={{
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  width: 260,
                  height: 380,
                  backgroundColor: "#DBC8AC",
                  overflow: "hidden",
                  "&:hover": {
                    backgroundColor: "#d97d7d",
                    opacity: [0.9, 0.8, 0.7],
                  },
                  margin: 2,
                }}
              >
                <img
                  alt={product.code}
                  src={getRandomElement()}
                  width="250"
                  sizes="max-"
                  style={{
                    width: "250px",
                    height: "310px",
                    objectFit: "cover",
                  }}
                ></img>
                <Typography style={{ textOverflow: "ellipsis" }}>
                  {product.code}
                </Typography>
                <PriceContainer>
                  <>
                    <Typography>{product.price}zł</Typography>
                  </>
                </PriceContainer>
              </Box>
            ))}
          </ProductsContainer>
        </ProductSection>
      </Container>
      <Outlet />
      <CostumesDetailsPopup />
    </div>
  );
};

export default observer(Costumes);
