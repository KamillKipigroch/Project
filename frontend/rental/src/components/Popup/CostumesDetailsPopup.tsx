import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import styled from "styled-components";
import { observer } from "mobx-react-lite";
import { useStores } from "../../stores/root.store";
import test1 from "../../assets/test1.jpg";
import { Grid, Typography } from "@mui/material";
import AreYouSurePopup from "../../Common/AreYouSurePopup";

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
                  src={test1}
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
              </Element>
            </Div>
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
      />
    </Dialog>
  );
};

export default observer(CostumesDetailsPopup);
