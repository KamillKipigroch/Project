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

const ConditionsDataGrid = () => {
  //get conditions
  const { conditionStore } = useStores();
  const { t } = useTranslation();

  useEffect(() => {
    conditionStore.fetchConditions();
  }, [conditionStore]);

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90, editable: false },
    { field: "price", headerName: t("multiplier")!, width: 90, editable: true },
    {
      field: "visible",
      headerName: t("visibility")!,
      width: 90,
      editable: true,
    },
    { field: "name", headerName: t("name")!, width: 150, editable: true },
    {
      field: "actions",
      headerName: t("actions")!,
      flex: 1,
      renderCell: (params: GridRenderCellParams) => {
        return (
          <Box>
            {params.row.visible ? (
              <Tooltip title="Hide" arrow={true}>
                <IconButton
                  onClick={() =>
                    conditionStore.disableVisibility(params.row.id)
                  }
                >
                  <CheckIcon sx={{ color: "green" }} />
                </IconButton>
              </Tooltip>
            ) : (
              <Tooltip title="Make visible" arrow={true}>
                <IconButton
                  onClick={() => {
                    let rowData = params.row;
                    rowData.visible = true;
                    conditionStore.updateCondition(rowData);
                  }}
                >
                  <BlockIcon sx={{ color: "red" }} />
                </IconButton>
              </Tooltip>
            )}
            <Tooltip title="Edit" arrow={true}>
              <IconButton
                onClick={() => conditionStore.openPopup(params.row.id)}
              >
                <EditIcon sx={{ color: "#4f70e8" }} />
              </IconButton>
            </Tooltip>
          </Box>
        );
      },
    },
  ];

  let display = [];
  for (let i = 0; i < conditionStore.allConditions.length; i++) {
    display.push({
      id: conditionStore.allConditions[i].id,
      price: conditionStore.allConditions[i].price,
      visible: conditionStore.allConditions[i].visible,
      name: conditionStore.allConditions[i].code,
    });
  }

  // let display = [
  //   {
  //     id: 1,
  //     price: 100,
  //     visible: true,
  //     name: "test1"
  //   },
  //   {
  //     id: 2,
  //     price: 100,
  //     visible: true,
  //     name: "test2"
  //   }
  // ]

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

export default observer(ConditionsDataGrid);
