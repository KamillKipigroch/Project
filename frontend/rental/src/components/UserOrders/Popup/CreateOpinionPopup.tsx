import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useStores } from "../../../stores/root.store";
import { observer } from "mobx-react-lite";
import { Box, Rating, Typography } from "@mui/material";
import React from "react";
import { Form } from "react-bootstrap";
import { Carousel } from "react-responsive-carousel";
import { IAddOpinion } from "../../../models/OpinionModel";
import { useTranslation } from "react-i18next";

const Div = styled.div`
  display: flex;
  justify-content: flex-start;
  border-radius: 15px;
  margin: 10px;
  flex-direction: column;
`;

const Element = styled.div`
  margin: 8px;
`;

const CreateOpinionPopup = () => {
  const { opinionStore } = useStores();
  const { t } = useTranslation();
  const [value, setValue] = React.useState<number | null>(5);

  const { register, handleSubmit } = useForm<IAddOpinion>();

  const onSubmit = async (data: IAddOpinion) => {
    if (value) {
      data.value = value;
    }

    if (opinionStore.editMode) {
      if (opinionStore.editedOpinion) {
        await opinionStore.updateOpinion(data);
      }
    } else {
      await opinionStore.addOpinionByUser(data);
    }

    opinionStore.closePopup();
  };

  return (
    <div>
      <Dialog
        open={opinionStore.isPopupOpen}
        onClose={opinionStore.closePopup}
        maxWidth="lg"
      >
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <DialogTitle>{opinionStore.order?.productName}</DialogTitle>
          <DialogContent>
            <Div style={{ textAlign: "center" }}>
              <Element>
                {opinionStore.product?.images.length !== 0 ? (
                  <Box display="flex" justifyContent="center">
                    <Carousel
                      showStatus={false}
                      showThumbs={false}
                      infiniteLoop={true}
                      width="220px"
                      dynamicHeight={false}
                    >
                      {opinionStore.product?.images.map((photo) => (
                        <Box key={photo.id} textAlign="center">
                          <img
                            src={photo.code}
                            alt=""
                            height="220px"
                            style={{ objectFit: "cover", borderRadius: "20px" }}
                          />
                        </Box>
                      ))}
                    </Carousel>
                  </Box>
                ) : null}
              </Element>
              <Element>
                <Typography variant="h6">{t("rateProduct")}</Typography>
                <Rating
                  name="simple-controlled"
                  value={value}
                  onChange={(event, newValue) => {
                    setValue(newValue);
                  }}
                />
              </Element>
              <Element>
                <TextField
                  required
                  id="outlined-required"
                  label={t("leaveYourOpinionHere")}
                  type="text"
                  multiline
                  fullWidth
                  {...register("description")}
                />
              </Element>
              {opinionStore.editMode ? (
                <>
                  {opinionStore.editedOpinion?.opinionImages.length !== 0 ? (
                    <Box display="flex" justifyContent="center">
                      <Carousel
                        showStatus={false}
                        showThumbs={false}
                        infiniteLoop={true}
                        width="300px"
                        dynamicHeight={false}
                      >
                        {opinionStore.editedOpinion?.opinionImages.map(
                          (photo) => (
                            <Box key={photo.id} textAlign="center">
                              <img
                                src={photo.code}
                                alt=""
                                height="300px"
                                style={{ objectFit: "cover" }}
                              />
                              <Button
                                variant="text"
                                className="legend myLegend"
                                onClick={() =>
                                  opinionStore.deletePhotoFromOpinion(photo.id)
                                }
                              >
                                {t("delete")}
                              </Button>
                            </Box>
                          )
                        )}
                      </Carousel>
                    </Box>
                  ) : null}
                </>
              ) : null}
              <Element>
                <Form.Group controlId="formFileMultiple" className="mb-3">
                  <Form.Label>{t("addSomePhotos")}</Form.Label>
                  <Form.Control type="file" multiple {...register("images")} />
                </Form.Group>
              </Element>
            </Div>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => opinionStore.closePopup()}>
              {t("cancel")}
            </Button>
            <Button type="submit">OK</Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export default observer(CreateOpinionPopup);
