import React from 'react';
import {observer} from "mobx-react-lite";
import {Col, Container, Row} from "react-bootstrap";
import navIcon1 from "../assets/nav-icon1.svg";
import navIcon2 from "../assets/nav-icon2.svg";
import navIcon3 from "../assets/nav-icon3.svg";
import {useTranslation} from "react-i18next";
function Footer() {
    const { t } = useTranslation();
    return (
        <footer className="footer" style={{ bottom:0 ,background: "#DD5353", width:"100%" }}>
            <Container>
                <Row className="align-items-center text-white">
                    <Col size={12} sm={6}>
                        <h3> {t("bestCostume")} </h3>
                    </Col>
                    <Col size={12} sm={6} className="text-center  text-sm-end">
                        <div className="social-icon">
                            <a href="#"><img src={navIcon1} alt="Icon" /></a>
                            <a href="#"><img src={navIcon2} alt="Icon" /></a>
                            <a href="#"><img src={navIcon3} alt="Icon" /></a>
                        </div>
                        <p>Copyright 2022. {t("allRightsReserved")}</p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
}

export default observer(Footer);
