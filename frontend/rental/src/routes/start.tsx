import styled from "@emotion/styled";
import { Typography } from "@mui/material";
import { useState } from "react";
import Image from "../assets/aditya-chinchure-Or2l7TwGZTY-unsplash.jpg";
import Box from '@mui/material/Box';

// const Backgroud = styled.div `
//     ${props => `background: ${'#2E3B55'};`}
// `;

const Backgroud = styled.div `
    ${props => `background: ${'#141414'};`}
    margin: 0px;
    height: 100%;
`;

const PhotoDiv = styled.div`
    display: inline-block;
    height: 100%;
    width: 10;
`;

// const TextDiv = styled.div`
//     display: inline-block;
//     text-align: right;
//     height: 100;
//     width: 10;
// `;

function GalleryItem(Image: any) {
    return(
        <div className='gallery-item-wrapper'>
            <div className='gallery-item'>
                <div className='gallery-item-image sepia'
                style={{backgroundImage: `url(${Image})`}}>
                </div>
                <div className='gallery-item0image masked'
                style={{backgroundImage: `url(${Image})`}}>

                </div>
            </div>
        </div>
    )
}

export default function Start() {

    const [isHover, setIsHover] = useState(false);

    const handleMouseEnter = () => {
        setIsHover(true);
    }

    const handleMouseLeave = () => {
        setIsHover(false);
    }

    const Picture = styled.div`
        transition: transform 1s, filter 2s ease-in-out;
        filter: ${isHover =>
            isHover ? 'blur(0)' : 'blur(2px)'
        };
        transform: ${isHover =>
            isHover ? 'scale(1)' : 'scale(1.2)'
        }
    `;

    return (
      <Backgroud>


        {/* <Picture
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}>
            <img src={Image} height="750px"></img>
        </Picture> */}
        {/* <div>
            <img src={Image} height="750px"></img>
        </div> */}
        {/* <TextDiv>
            <Typography variant="h6">About us</Typography>
        </TextDiv> */}
      </Backgroud>
    );
  }