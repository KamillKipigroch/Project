import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import styled from "styled-components";
import { observer } from "mobx-react-lite";
import { useStores } from "../../stores/root.store";
import noPhoto from "../../assets/no_photo.jpg";
import { Box, Chip, Divider, Grid, Rating, Typography } from "@mui/material";
import AreYouSurePopup from "../../Common/AreYouSurePopup";
import moment from "moment";
import { Carousel } from "react-responsive-carousel";
import { useTranslation } from "react-i18next";
import { authStore } from "../../stores/auth.store";

const Div = styled.div`
  display: flex;
  justify-content: flex-start;
  border-radius: 15px;
  margin: 10px;
  flex-direction: column;
`;

const Element = styled.div`
  margin: 10px;
`;

const CostumesDetailsPopup = () => {
  const { productStore } = useStores();
  const { t } = useTranslation();

  return (
    <Dialog
      open={productStore.isDetailsPopupOpen}
      onClose={productStore.closeDetailsPopup}
      maxWidth="lg"
    >
      <DialogTitle>{t("productDetails")}</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} minWidth="650px" maxWidth="650px">
          <Grid item xs={6}>
            <Div>
              <Element>
                {productStore.detailedProduct?.images.length !== 0 ? (
                  <Carousel
                    showStatus={false}
                    showThumbs={false}
                    infiniteLoop={true}
                    dynamicHeight={false}
                  >
                    {productStore.detailedProduct?.images.map(
                      (photo, index) => (
                        <Box key={index} textAlign="center">
                          <img
                            alt=""
                            src={photo.code}
                            width="250"
                            sizes="max-"
                            style={{
                              width: "300px",
                              height: "370px",
                              objectFit: "cover",
                            }}
                          />
                        </Box>
                      )
                    )}
                  </Carousel>
                ) : (
                  <img
                    alt=""
                    src={noPhoto}
                    width="250"
                    sizes="max-"
                    style={{
                      width: "300px",
                      height: "370px",
                      objectFit: "cover",
                    }}
                  />
                )}
              </Element>
            </Div>
          </Grid>
          <Grid item xs={6}>
            <Div>
              <Element>
                <Typography variant="h6" textAlign="center">
                  {productStore.detailedProduct?.code}
                </Typography>
                <Typography>
                  <b>{t("hero")}:</b> {productStore.detailedProduct?.hero}
                </Typography>
                <Typography>
                  <b>{t("type")}:</b>{" "}
                  {productStore.detailedProduct?.productType.code}
                </Typography>
                <Typography>
                  <b>{t("category")}:</b>{" "}
                  {productStore.detailedProduct?.subcategory.category.code}
                </Typography>
                <Typography>
                  <b>{t("description")}:</b>{" "}
                  {productStore.detailedProduct?.description}
                </Typography>
                <Typography>
                  <b>{t("size")}:</b>{" "}
                  {productStore.detailedProduct?.size}
                </Typography>
                <Typography>
                  <b>{t("productPrice")}</b>{" "}
                  {productStore.detailedProduct?.price}zł
                </Typography>
                <Typography>
                  <b>{t("subCategory")}:</b>{" "}
                  {productStore.detailedProduct?.subcategory.code}
                </Typography>
                <Typography>
                  <b>{t("subCategoryDescription")}</b>
                  <br /> {productStore.detailedProduct?.subcategory.description}
                </Typography>
              </Element>
            </Div>
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" flexDirection="column">
              <Divider>
                <Chip label={t("opinions")} />
              </Divider>
              {productStore.detailedProduct?.opinions.map((opinion, index) => (
                <Box marginTop="15px" key={index}>
                  <Box padding="10px">
                    <Box display="flex">
                      <Rating
                        name="simple-controlled"
                        readOnly={true}
                        value={opinion.value}
                      />
                      <Typography
                        sx={{ fontStyle: "italic" }}
                        display="inline"
                        marginLeft="5px"
                      >
                        {`${moment(opinion.createDate).format(
                          "DD-MM-YYYY HH:mm"
                        )} - ${opinion.user.firstName} ${
                          opinion.user.lastName
                        } (${opinion.user.email})`}
                      </Typography>
                    </Box>
                    <Box marginTop="10px" marginBottom="10px">
                      <Typography
                        border="solid 1px grey"
                        borderRadius="5px"
                        padding="10px"
                      >
                        {opinion.description}
                      </Typography>
                    </Box>
                    {opinion.opinionImages.length > 0 ? (
                      <Box display="flex" justifyContent="center">
                        <Carousel
                          showStatus={false}
                          showThumbs={false}
                          infiniteLoop={true}
                          width="200px"
                          // dynamicHeight={false}
                        >
                          {opinion.opinionImages.map((photo, index) => (
                            <Box key={index} textAlign="center">
                              <img
                                src={photo.code}
                                alt=""
                                height="225px"
                                style={{ objectFit: "cover" }}
                              />
                            </Box>
                          ))}
                        </Carousel>
                      </Box>
                    ) : null}
                  </Box>
                  {productStore.detailedProduct?.opinions.length !==
                  index + 1 ? (
                    <Divider>
                      <Chip label={t("next")} />
                    </Divider>
                  ) : null}
                </Box>
              ))}
            </Box>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => productStore.closeDetailsPopup()}>
          {t("cancel")}
        </Button>
        {authStore.isAuth ? (
          <Button onClick={() => productStore.openDetailsAreYouSurePopup()}>
            {t("makeOrder")}
          </Button>
        ) : null}
      </DialogActions>
      <AreYouSurePopup
        title={"Do you want to order this item?"}
        isOpen={productStore.isDetailsAreYouSurePopup}
        functionToClose={productStore.closeDetailsAreYouSurePopup}
        functionToExecute={() => productStore.createUserOrder()}
      />
    </Dialog>
  );
};

export default observer(CostumesDetailsPopup);
