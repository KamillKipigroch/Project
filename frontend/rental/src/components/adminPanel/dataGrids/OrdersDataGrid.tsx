import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { useStores } from "../../../stores/root.store";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { IconButton, Tooltip, useTheme } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { OrderStatus } from "../../../models/Enums";
import CheckIcon from "@mui/icons-material/Check";
import { tokens } from "../../../theme";
import Constants from "../../../constants/Constants";
import { useTranslation } from "react-i18next";

const OrdersDataGrid = () => {
  const { orderStore, orderStatusStore } = useStores();
  const { t } = useTranslation();

  useEffect(() => {
    orderStore.fetchOrders();
    orderStatusStore.fetchOrderStatuses();
  }, [orderStore, orderStatusStore]);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID" },
    {
      field: "statusCode",
      headerName: t("status")!,
      flex: 1,
    },
    {
      field: "productName",
      headerName: t("productName")!,
      flex: 1,
    },
    {
      field: "userName",
      headerName: t("userName")!,
      flex: 1,
    },
    {
      field: "dateStart",
      headerName: t("dateStart")!,
      flex: 1,
    },
    {
      field: "dateEnd",
      headerName: t("dateEnd")!,
      flex: 1,
    },
    {
      field: "price",
      headerName: t("price")!,
      flex: 1,
    },
    {
      field: "actions",
      headerName: t("actions")!,
      flex: 1,
      renderCell: (params: GridRenderCellParams) => {
        return (
          <Box>
            {params.row.statusCode === OrderStatus.Submitted ? (
              <Tooltip title={t("startRealization")} arrow={true}>
                <IconButton
                  onClick={() => {
                    const order = params.row;
                    order.statusId = orderStatusStore.getProperOrderStatusId(
                      OrderStatus.InRealization
                    );
                    orderStore.updateOrderStatus(order);
                  }}
                >
                  <ArrowForwardIcon sx={{ color: "blue" }} />
                </IconButton>
              </Tooltip>
            ) : null}
            {params.row.statusCode === OrderStatus.InRealization ? (
              <Tooltip title={t("realize")} arrow={true}>
                <IconButton
                  onClick={() => {
                    const order = params.row;
                    order.statusId = orderStatusStore.getProperOrderStatusId(
                      OrderStatus.Completed
                    );
                    orderStore.updateOrderStatus(order);
                  }}
                >
                  <CheckIcon sx={{ color: "green" }} />
                </IconButton>
              </Tooltip>
            ) : null}
          </Box>
        );
      },
    },
  ];

  return (
    <Box
      sx={{
        height: 400,
        width: "100%",
        "& .--Completed": {
          bgcolor: colors.realized[100] + "!important",
          "&:hover": {
            bgcolor: colors.realized[200] + "!important",
          },
        },
      }}
    >
      <DataGrid
        getRowClassName={(params: any) => `--${params.row.statusCode}`}
        rows={orderStore.allOrders}
        loading={orderStore.loading}
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

export default observer(OrdersDataGrid);
