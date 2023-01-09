import {Outlet} from "react-router-dom";
import styled from "styled-components";
import noPhoto from "../assets/no_photo.jpg";
import FilterComponent from "../components/filterComponent";
import Box from "@mui/material/Box";
import {Typography} from "@mui/material";
import {observer} from "mobx-react-lite";
import {useStores} from "../stores/root.store";
import {useEffect} from "react";
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
    const {productStore} = useStores();

    useEffect(() => {
        productStore.fetchProducts();
    }, [productStore]);

    return (
        <div>
            <Container>
                {/* filterComponent ( ´･･)ﾉ(._.`) */}
                <div className="float-left filters" >
                    <FilterComponent/>
                </div>
                <ProductSection>
                    <ProductsContainer>
                        {/* dynamiczne wyświetlanie produktóws */}
                        {productStore.visibleProducts2.map((product) => (
                            <Box
                                key={product.id}
                                onClick={() => product.visible ? productStore.openDetailsPopup(product.id): null}
                                component="span"
                                className="parent"
                                sx={{
                                    cursor: "pointer", display: "flex",
                                    flexDirection: "column", alignItems: "center",
                                    justifyContent: "flex-start", width: 260, margin: 2,
                                    height: 380, backgroundColor: "#DBC8AC", overflow: "hidden",
                                    "&:hover": product.visible ? {
                                        backgroundColor: "#d97d7d",
                                        opacity: [0.9, 0.8, 0.7],
                                    } : {
                                        opacity: "0.5",
                                        filter: "grayscale(100%)"
                                    },
                                }}
                            >
                                <div  className={product.visible ? "hidden" : "visible"}><b>This product actual<br/> is not available</b></div>
                                <img
                                    alt={product.code}
                                    src={
                                        product.images.length === 0 ? noPhoto : product.images[0].code
                                    }
                                    width="250" sizes="max-"
                                    style={{
                                        marginTop: 5,
                                        width: "250px",
                                        height: "310px",
                                        objectFit: "cover",
                                    }}/>
                                <Typography style={{textOverflow: "ellipsis"}}>
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
            <Outlet/>
            <CostumesDetailsPopup/>
        </div>
    );
};

export default observer(Costumes);
