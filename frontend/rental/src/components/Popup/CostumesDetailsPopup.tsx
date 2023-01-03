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
} from "@mui/material";
import AreYouSurePopup from "../../Common/AreYouSurePopup";
import { Form } from "react-bootstrap";

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
                  <b>Id:</b> {productStore.detailedProduct?.id}
                </Typography>
                <Typography>
                  <b>Name:</b> {productStore.detailedProduct?.code}
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
                  <b>Sub-category Description:</b>{" "}
                  {productStore.detailedProduct?.subcategory.description}
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
              </Element>
            </Div>
          </Grid>
          <Grid item xs={12}>
            <Divider>
              <Chip label="Opinions" />
            </Divider>
            <Typography variant="h4">Opinions</Typography>
            <Box>
              <Box padding="10px">
                <Box>
                  <Rating name="simple-controlled" readOnly={true} value={4} />
                  <Typography display="inline">Hello world!</Typography>
                </Box>
                <TextField
                  margin="normal"
                  disabled
                  fullWidth
                  value="Super produkt"
                ></TextField>
                <Box textAlign="center">
                  <img
                    src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
                    alt=""
                    width="250px"
                    height="250px"
                  />
                </Box>
              </Box>
              <Divider>
                <Chip label="Next" />
              </Divider>
            </Box>
            <Box>
              <Box padding="10px">
                <Box>
                  <Rating name="simple-controlled" readOnly={true} value={4} />
                  <Typography display="inline">Hello world!</Typography>
                </Box>
                <TextField
                  margin="normal"
                  disabled
                  fullWidth
                  value="Super produkt"
                ></TextField>
                <Box textAlign="center">
                  <img
                    src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
                    alt=""
                    width="250px"
                    height="250px"
                  />
                </Box>
              </Box>
              <Divider>
                <Chip label="Next" />
              </Divider>
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
