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

const OrdersDataGrid = () => {
  const { orderStore, orderStatusStore } = useStores();

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
      headerName: "Status",
      flex: 1,
    },
    {
      field: "productName",
      headerName: "Product name",
      flex: 1,
    },
    {
      field: "userName",
      headerName: "User name",
      flex: 1,
    },
    {
      field: "dateStart",
      headerName: "Date start",
      flex: 1,
    },
    {
      field: "dateEnd",
      headerName: "Date end",
      flex: 1,
    },
    {
      field: "price",
      headerName: "Price",
      flex: 1,
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params: GridRenderCellParams) => {
        return (
          <Box>
            {params.row.statusCode === OrderStatus.Submitted ? (
              <Tooltip title="Start realization" arrow={true}>
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
              <Tooltip title="Realize" arrow={true}>
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
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
      />
    </Box>
  );
};

export default observer(OrdersDataGrid);
