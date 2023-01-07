import { Outlet } from "react-router-dom";
import styled from "styled-components";
import noPhoto from "../assets/no_photo.jpg";
import FilterComponent from "../components/filterComponent";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useStores } from "../stores/root.store";
import { useEffect } from "react";
import CostumesDetailsPopup from "../components/Popup/CostumesDetailsPopup";
import { useTranslation } from "react-i18next";

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

  const { t } = useTranslation();

  useEffect(() => {
    productStore.fetchProducts();
  }, [productStore]);

  return (
    <div>
      <Container>
        {/* filterComponent ( ´･･)ﾉ(._.`) */}
        <FilterComponent />
        <ProductSection>
          <div
            style={{
              display: "flex",
              fontSize: "30px",
              margin: "20px",
              fontWeight: "bold",
            }}
          >
            {/* Number of products: {productStore.countVisibleProducts} */}
            {t("numberOfProduct")}: {productStore.countVisibleProducts}
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
                  src={product.images.length === 0 ? noPhoto : product.images[0].code}
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
