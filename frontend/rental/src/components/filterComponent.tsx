import { Typography } from "@mui/material";
import styled from "styled-components";
import RangeSlider from "../components/rangeSlider";
import Checkbox from "@mui/material/Checkbox";
import MultipleSelectCheckmarks from "../components/multipleSelectCheckmarks";
import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useStores } from "../stores/root.store";
import { useTranslation } from "react-i18next";

const FilterContainer = styled.div`
  width: 20%;
  margin: 5px;
  position: sticky;
`;

const Hr = styled.hr`
  height:'2px',
  borderWidth:'0',
  color:'#999999',
  backgroundColor: '#999999'
`;

const SectionTitle = styled.div`
  margin: 15px;
`;

const Text = styled.div`
  display: "flex",
  alignItems: "center",
  color: "#737373"
`;

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const FilterComponent = () => {
  const { productStore, qualityStore, conditionStore } = useStores();
  const { t } = useTranslation();

  useEffect(() => {
    qualityStore.fetchQualities();
    conditionStore.fetchConditions();
  }, [qualityStore, conditionStore]);

  return (
    <FilterContainer>
      <div style={{ height: "100%" }}>
        <Typography
          variant="h5"
          display="flex"
          justifyContent="center"
        >
          {t("shoppingOptions")}
        </Typography>
        <Hr />
        <div>
          <MultipleSelectCheckmarks />
        </div>
        <Hr />
        {/* PRICE */}
        <div>
          <SectionTitle>{t("price").toUpperCase()}</SectionTitle>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <RangeSlider />
          </div>
        </div>
        <Hr />
        {/* QUALITY */}
        <div>
          <SectionTitle>{t("quality").toUpperCase()}</SectionTitle>
          {qualityStore.visibleQualities.map((quality) => {
            return (
              <div
                key={quality.id}
                style={{ display: "flex", flexDirection: "row" }}
              >
                <Checkbox
                  onChange={(e) => productStore.handleQualityFilterChange(e)}
                  value={quality.code}
                  {...label}
                  sx={{
                    color: "#B73E3E",
                    "&.Mui-checked": {
                      color: "#B73E3E",
                    },
                  }}
                />
                <Text>{quality.code}</Text>
              </div>
            );
          })}
        </div>
        <Hr />
        {/* CONDITION */}
        <div>
          <SectionTitle>{t("condition").toUpperCase()}</SectionTitle>
          {conditionStore.visibleConditions.map((condition) => {
            return (
              <div
                key={condition.id}
                style={{ display: "flex", flexDirection: "row" }}
              >
                <Checkbox
                  onChange={(e) => productStore.handleConditionFilterChange(e)}
                  value={condition.code}
                  {...label}
                  sx={{
                    color: "#B73E3E",
                    "&.Mui-checked": {
                      color: "#B73E3E",
                    },
                  }}
                />
                <Text>{condition.code}</Text>
              </div>
            );
          })}
        </div>
        <Hr />
      </div>
    </FilterContainer>
  );
};

export default observer(FilterComponent);
