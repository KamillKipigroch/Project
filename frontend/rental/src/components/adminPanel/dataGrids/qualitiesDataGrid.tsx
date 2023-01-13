import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { useStores } from "../../../stores/root.store";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { IconButton, Tooltip } from "@mui/material";
import BlockIcon from "@mui/icons-material/Block";
import CheckIcon from "@mui/icons-material/Check";
import EditIcon from "@mui/icons-material/Edit";
import Constants from "../../../constants/Constants";
import { useTranslation } from "react-i18next";

const QualitiesDataGrid = () => {
  //get order status
  const { qualityStore } = useStores();
  const { t } = useTranslation();

  useEffect(() => {
    qualityStore.fetchQualities();
  }, [qualityStore]);

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90, editable: false },
    { field: "code", headerName: t("name")!, width: 90, editable: true },
    { field: "visible", headerName: t("visibility")!, width: 90, editable: true },
    {
      field: "actions",
      headerName: t("actions")!,
      flex: 1,
      renderCell: (params: GridRenderCellParams) => {
        return (
          <Box>
            {params.row.visible ? (
              <Tooltip title={t("hide")} arrow={true}>
                <IconButton
                  onClick={() => qualityStore.disableVisibility(params.row.id)}
                >
                  <CheckIcon sx={{ color: "green" }} />
                </IconButton>
              </Tooltip>
            ) : (
              <Tooltip title={t("makeVisible")} arrow={true}>
                <IconButton
                  onClick={() => {
                    let rowData = params.row;
                    rowData.visible = true;
                    qualityStore.updateQuality(rowData);
                  }}
                >
                  <BlockIcon sx={{ color: "red" }} />
                </IconButton>
              </Tooltip>
            )}
            <Tooltip title={t("edit")} arrow={true}>
              <IconButton onClick={() => qualityStore.openPopup(params.row.id)}>
                <EditIcon sx={{ color: "#4f70e8" }} />
              </IconButton>
            </Tooltip>
          </Box>
        );
      },
    },
  ];

  let display = [];
  for (let i = 0; i < qualityStore.allQualities.length; i++) {
    display.push({
      id: qualityStore.allQualities[i].id,
      code: qualityStore.allQualities[i].code,
      visible: qualityStore.allQualities[i].visible,
    });
  }

  return (
    <Box className="list-Box">
      <DataGrid
        rows={display}
        columns={columns}
        pageSize={Constants.PAGE_SIZE}
        rowsPerPageOptions={[Constants.PAGE_SIZE]}
        checkboxSelection
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
      />
    </Box>
  );
};

export default observer(QualitiesDataGrid);
