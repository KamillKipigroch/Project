import { getProducts } from "../services/data";
import { Link, Outlet } from "react-router-dom";
import { Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import BoxComponent from '../components/productBox';
import styled from "styled-components";
import Maleficent from "../assets/maleficent.webp";
import RangeSlider from "../components/rangeSlider";

const Container = styled.div`
  display: flex;
  flex-direction: row;
`

const FilterContainer = styled.div`
  width: 20%;
`

const ProductsContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  // justify-content: space-around;
`

const ProductContainer = styled.div`
  width: 300,
  height: 300,
  backgroundColor: 'blue'
  display: 'flex'
  align-items: center
`

const ProductSection = styled.div`
  width: 80%
`

export default function Anime() {
  let movies = getProducts();
  return (
    <>
      <Container>
        <FilterContainer>
          <div style={{height: '100%', borderStyle: 'outset'}}>
            <Typography variant="h5" color='#d92626' display='flex' justifyContent='center'>
              Filters
            </Typography>
            <hr></hr>
            <div>
              <Typography variant="h5" color='#d92626'>
                Price
              </Typography>
              <RangeSlider></RangeSlider>
            </div>
            <hr></hr>
                                                                                                                                           
          </div>

          {/* <div style={{ display: "flex" }}>
            <nav
              style={{
                borderRight: "solid 1px",
                padding: "1rem",
              }}
            >
              {movies.map((movie) => (
                <Link
                  style={{ display: "block", margin: "1rem 0" }}
                  to={`/movie/${movie.id}`}
                  key={movie.id}
                >
                  {movie.name}
                </Link>
              ))}
            </nav>
            <Outlet />
          </div> */}
        </FilterContainer>
        <ProductSection>
          <Typography variant="h3" color='#d92626' display='flex'>
              Movies
          </Typography>
          <ProductsContainer>
          </ProductsContainer>
        </ProductSection>
      </Container>
    </>
  );
}
