import { Typography } from "@mui/material";
import styled from "styled-components";
import RangeSlider from "../components/rangeSlider";
import Checkbox from '@mui/material/Checkbox';
import MultipleSelectCheckmarks from "../components/multipleSelectCheckmarks";

const FilterContainer = styled.div`
    width: 20%;
    margin: 5px;
`

const Hr = styled.hr`
  height:'2px',
  borderWidth:'0',
  color:'#999999',
  backgroundColor: '#999999'
`

const SectionTitle = styled.div`
  margin: 15px;
`

const Text = styled.div`
  display: "flex",
  alignItems: "center",
  color: "#737373"
`

type FilterDTO = {
  category: string;
  quality: string[];
  condition: string[];
  priceMax: number;
  priceMin: number;
}

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export default function FilterComponent({category, quality, condition, priceMax, priceMin}: FilterDTO) {

    return (
      <FilterContainer>
          <div style={{height: '100%'}}>
            <Typography variant="h5" color='#333333' display='flex' justifyContent='center'>
              Shopping options
            </Typography>
            <Hr />
            <div>
              <MultipleSelectCheckmarks />
            </div>
            <Hr />
            <div>
              <SectionTitle>PRICE</SectionTitle>
              <div style={{display: "flex", justifyContent: "center"}}>
                <RangeSlider/>
              </div>
            </div>
            <Hr />
            <div>
            <SectionTitle>QUALITY</SectionTitle>
              <div style={{display: "flex", flexDirection: "row"}} >
              <Checkbox {...label} defaultChecked
                  sx={{
                    color: "#B73E3E",
                    '&.Mui-checked': {
                      color: "#B73E3E",
                    },
                  }}
                />
                <Text>Silver standard</Text>
              </div>
              <div style={{display: "flex", flexDirection: "row"}} >
              <Checkbox {...label} defaultChecked
                sx={{
                  color: "#B73E3E",
                  '&.Mui-checked': {
                    color: "#B73E3E",
                  },
                }}
              />
                <Text>Gold VIP</Text>
              </div>
              <div style={{display: "flex", flexDirection: "row"}} >
                <Checkbox {...label} defaultChecked
                  sx={{
                    color: "#B73E3E",
                    '&.Mui-checked': {
                      color: "#B73E3E",
                    },
                  }}
                />
                <Text>Platinum premium</Text>
              </div>
            </div>
            <Hr />
            <div>
              <SectionTitle>CONDITION</SectionTitle>
              <div style={{display: "flex", flexDirection: "row"}} >
                <Checkbox {...label} defaultChecked
                  sx={{
                    color: "#B73E3E",
                    '&.Mui-checked': {
                      color: "#B73E3E",
                    },
                  }}
                />
                <Text>Super hero</Text>
              </div>
              <div style={{display: "flex", flexDirection: "row"}} >
                <Checkbox {...label} defaultChecked
                  sx={{
                    color: "#B73E3E",
                    '&.Mui-checked': {
                      color: "#B73E3E",
                    },
                  }}
                />
                <Text>Hero from big city</Text>
              </div>
              <div style={{display: "flex", flexDirection: "row"}} >
                <Checkbox {...label} defaultChecked
                  sx={{
                    color: "#B73E3E",
                    '&.Mui-checked': {
                      color: "#B73E3E",
                    },
                  }}
                />
                <Text>Neighbourhood hero</Text>
              </div>
            </div>
            <Hr />
                                                                                                                                           
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
    );
}
