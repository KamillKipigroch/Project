import {observer} from "mobx-react-lite";
import {Container, Row, Col, Tab, Nav} from "react-bootstrap";
import {useTranslation} from "react-i18next";
import {useEffect, useState} from "react";
import TrackVisibility from 'react-on-screen';
import headerImg from "../assets/header-img.svg";
import 'animate.css';
import projImg1 from "../assets/project-img1.png";
import projImg2 from "../assets/project-img2.jpg";
import projImg3 from "../assets/project-img3.jpeg";
import projImg5 from "../assets/project-img5.jpg";
import projImg4 from "../assets/project-img4.jpg";
import projImg6 from "../assets/project-img6.jpg";
import {ProjectCard} from "../components/ProjectCard";

const Home = () => {
    const {t} = useTranslation();
    const [loopNum, setLoopNum] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [text, setText] = useState('');
    const [delta, setDelta] = useState(300 - Math.random() * 100);
    const [index, setIndex] = useState(1);
    const toRotate = ["Anime costume", "Movie costume", "Series costume", "Game costume"];
    const period = 2000;
    const projects = [
        {
            title: "Anime Cosplay",
            description: "The outfits are cute and innocent",
            imgUrl: projImg1,
        },
        {
            title: "Film Costume",
            description: "Become your favorite hero",
            imgUrl: projImg2,
        },
        {
            title: "Game Cosplay",
            description: "Don't stop playing even for a moment",
            imgUrl: projImg4,
        },
        {
            title: "Serial Costume",
            description: "Bring your friends into the series",
            imgUrl: projImg3,
        },
        {
            title: "Other Cosplay",
            description: "I want something really interesting",
            imgUrl: projImg5,
        },
        {
            title: "Your own costume",
            description: "I want to be unique",
            imgUrl: projImg6,
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
                                        are looking for today? <span className="txt-rotate text-primary"
                                                                     data-rotate='[ "Anime costume", "Movie costume", "Serial costume", "Game costume" ]'><span
                                            className="wrap">{text}</span></span></h2>
                                    <div style={{marginTop: 50}}>
                                        <p>Welcome to our costume rental service! We offer a wide variety of costumes
                                            for
                                            all occasions. Whether you need a costume for a Halloween party, a themed
                                            event,
                                            or a theater production, we have something for everyone. Our costumes range
                                            from
                                            classic and timeless to modern and trendy, and we have sizes for adults,
                                            children, and even pets. We also offer a selection of accessories to
                                            complete
                                            your look. <br/><br/>
                                            Visit us in store or browse our online catalog to see our full
                                            selection and make your reservation today!</p>
                                    </div>
                                </div>}
                        </TrackVisibility>
                    </Col>
                    <Col xs={12} md={6} xl={5}>
                        <TrackVisibility>
                            {({isVisible}) =>
                                <div className={"animate__animated animate__zoomIn"}>
                                    <div className={"anime-image"}>
                                        <img src={headerImg} height={500} alt="Header Img"/>
                                    </div>
                                </div>}
                        </TrackVisibility>
                    </Col>
                </Row>
            </Container>
            <Container className="project" id="project">
                <Row>
                    <Col size={12} >
                        <TrackVisibility>
                            <Tab.Container id="projects-tabs" defaultActiveKey="first">
                                <Tab.Content id="slideInUp">
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
                        </TrackVisibility>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default observer(Home);
