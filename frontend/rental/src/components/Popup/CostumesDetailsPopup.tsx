import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import styled from "styled-components";
import { observer } from "mobx-react-lite";
import { useStores } from "../../stores/root.store";
import maleficent from "../../assets/maleficent.webp";
import {
  Box,
  Chip,
  Divider,
  Grid,
  Rating,
  TextField,
  Typography,
  withStyles,
} from "@mui/material";
import AreYouSurePopup from "../../Common/AreYouSurePopup";
import moment from "moment";
import { Carousel } from "react-responsive-carousel";

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

  return (
    <Dialog
      open={productStore.isDetailsPopupOpen}
      onClose={productStore.closeDetailsPopup}
      maxWidth="lg"
    >
      <DialogTitle>Order details page</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} minWidth="650px" maxWidth="650px">
          <Grid item xs={6}>
            <Div>
              <Element>
                <img
                  alt=""
                  src={
                    productStore.detailedProduct?.images.length === 0
                      ? maleficent
                      : productStore.detailedProduct?.images[0].code
                  }
                  width="250"
                  sizes="max-"
                  style={{
                    width: "300px",
                    height: "370px",
                    objectFit: "cover",
                  }}
                ></img>
              </Element>
            </Div>
          </Grid>
          <Grid item xs={6}>
            <Div>
              <Element>
                <Typography>
                  {`${productStore.detailedProduct?.code} - ${productStore.detailedProduct?.hero}`}
                </Typography>
                <Typography>
                  <b>Hero name:</b> {productStore.detailedProduct?.hero}
                </Typography>
                <Typography>
                  <b>Product type:</b>{" "}
                  {productStore.detailedProduct?.productType.code}
                </Typography>
                <Typography>
                  <b>Sub-category:</b>{" "}
                  {productStore.detailedProduct?.subcategory.code}
                </Typography>
                <Typography>
                  <b>Category:</b>{" "}
                  {productStore.detailedProduct?.subcategory.category.code}
                </Typography>
                <Typography>
                  <b>Product Description:</b>{" "}
                  {productStore.detailedProduct?.description}
                </Typography>
                <Typography>
                  <b>Product PRICE:</b> {productStore.detailedProduct?.price}$
                </Typography>
                <Typography>
                  <b>Sub-category Description:</b>{" "}
                  {productStore.detailedProduct?.subcategory.description}
                </Typography>
              </Element>
            </Div>
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" flexDirection="column">
              <Divider>
                <Chip label="Opinions" />
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
                          width="250px"
                          dynamicHeight={false}
                        >
                          {opinion.opinionImages.map((photo, index) => (
                            <Box key={index} textAlign="center">
                              <img src={photo.code} alt="" height="250px" />
                            </Box>
                          ))}
                        </Carousel>
                      </Box>
                    ) : null}
                  </Box>
                  {productStore.detailedProduct?.opinions.length !==
                  index + 1 ? (
                    <Divider>
                      <Chip label="Next" />
                    </Divider>
                  ) : null}
                </Box>
              ))}
            </Box>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => productStore.closeDetailsPopup()}>Cancel</Button>
        <Button onClick={() => productStore.openDetailsAreYouSurePopup()}>
          Order
        </Button>
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
