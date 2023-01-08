import {observer} from "mobx-react-lite";
import {Container, Row, Col, Tab, Nav} from "react-bootstrap";
import {useTranslation} from "react-i18next";
import {useEffect, useState} from "react";
import TrackVisibility from 'react-on-screen';
import headerImg from "../assets/header-img.svg";
import 'animate.css';
import projImg1 from "../assets/project-img1.png";
import projImg2 from "../assets/project-img2.jpg";
import {ProjectCard} from "../components/ProjectCard";

const Home = () => {
    const {t} = useTranslation();
    const [loopNum, setLoopNum] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [text, setText] = useState('');
    const [delta, setDelta] = useState(300 - Math.random() * 100);
    const [index, setIndex] = useState(1);
    const toRotate = ["Anime", "Movie", "Serial", "Game"];
    const period = 2000;
    const projects = [
        {
            title: "Business Startup",
            description: "Design & Development",
            imgUrl: projImg1,
        },
        {
            title: "Business Startup",
            description: "Design & Development",
            imgUrl: projImg2,
        },
        {
            title: "Business Startup",
            description: "Design & Development",
            imgUrl: projImg2,
        },
        {
            title: "Business Startup",
            description: "Design & Development",
            imgUrl: projImg1,
        },
        {
            title: "Business Startup",
            description: "Design & Development",
            imgUrl: projImg2,
        },
        {
            title: "Business Startup",
            description: "Design & Development",
            imgUrl: projImg2,
        },
    ];
    useEffect(() => {
        let ticker = setInterval(() => {
            tick();
        }, delta);

        return () => {
            clearInterval(ticker)
        };
    }, [text])
    const tick = () => {
        let i = loopNum % toRotate.length;
        let fullText = toRotate[i];
        let updatedText = isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1);

        setText(updatedText);

        if (isDeleting) {
            setDelta(prevDelta => prevDelta / 2);
        }

        if (!isDeleting && updatedText === fullText) {
            setIsDeleting(true);
            setIndex(prevIndex => prevIndex - 1);
            setDelta(period);
        } else if (isDeleting && updatedText === '') {
            setIsDeleting(false);
            setLoopNum(loopNum + 1);
            setIndex(1);
            setDelta(500);
        } else {
            setIndex(prevIndex => prevIndex + 1);
        }
    }
    return (
        <section className="banner" id="home">
            <Container>
                <Row className="aligh-items-center mt-5">
                    <Col xs={12} md={6} xl={7}>

                        <TrackVisibility>
                            {({isVisible}) =>
                                <div className={"animate__animated animate__fadeIn"}>
                                    <h2>Hello and welcome to our online store! <br/>Is there anything in particular you
                                        are looking for today? <span className="txt-rotate"
                                                                     data-rotate='[ "Anime", "Movie", "Serial", "Game" ]'><span
                                            className="wrap">{text}</span></span></h2>
                                    <p>Welcome to our costume rental service! We offer a wide variety of costumes for
                                        all occasions. Whether you need a costume for a Halloween party, a themed event,
                                        or a theater production, we have something for everyone. Our costumes range from
                                        classic and timeless to modern and trendy, and we have sizes for adults,
                                        children, and even pets. We also offer a selection of accessories to complete
                                        your look. Visit us in store or browse our online catalog to see our full
                                        selection and make your reservation today!</p>
                                </div>}
                        </TrackVisibility>
                    </Col>
                    <Col xs={12} md={6} xl={5}>
                        <TrackVisibility>
                            {({isVisible}) =>
                                <div className={"animate__animated animate__zoomIn"}>
                                    <img src={headerImg} height={500} alt="Header Img"/>
                                </div>}
                        </TrackVisibility>
                    </Col>
                </Row>
            </Container>
            <Container className="project" id="project">
                <Row>
                    <Col size={12}>
                        <TrackVisibility>
                            {({isVisible}) =>
                                <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                                    <Tab.Container id="projects-tabs" defaultActiveKey="first">
                                        <Tab.Content id="slideInUp"
                                                     className={isVisible ? "animate__animated animate__slideInUp" : ""}>
                                            <Tab.Pane eventKey="first">
                                                <Row>
                                                    {
                                                        projects.map((project, index) => {
                                                            return (
                                                                <ProjectCard
                                                                    key={index}
                                                                    {...project}
                                                                />
                                                            )
                                                        })
                                                    }
                                                </Row>
                                            </Tab.Pane>
                                        </Tab.Content>
                                    </Tab.Container>
                                </div>}
                        </TrackVisibility>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default observer(Home);
