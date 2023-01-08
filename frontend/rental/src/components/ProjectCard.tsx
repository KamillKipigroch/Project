import { Col } from "react-bootstrap";

type ProductCardObject = {
    title: string;
    description: string;
    imgUrl: string;
}

export const ProjectCard = ({ title, description, imgUrl }:ProductCardObject) => {
  return (
    <Col size={12} sm={6} md={4}>
      <div className="proj-imgbx">
        <img src={imgUrl} width={"100%"} height={300}/>
        <div className="proj-txtx text-white">
          <h4>{title}</h4>
          <span>{description}</span>
        </div>
      </div>
    </Col>
  )
}
