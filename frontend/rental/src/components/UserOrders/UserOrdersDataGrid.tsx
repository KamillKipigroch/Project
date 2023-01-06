import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useStores } from "../../stores/root.store";
import { IconButton, Tooltip, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

const UserOrdersDataGrid = () => {
  const { orderStore, orderStatusStore } = useStores();

  useEffect(() => {
    orderStore.getUserOrders();
  }, [orderStore, orderStatusStore]);

  const columns: GridColDef[] = [
    {
      field: "lp",
      headerName: "Lp.",
      flex: 1,
    },
    {
      field: "statusCode",
      headerName: "Status",
      width: 120,
      editable: true,
      flex: 1,
    },
    {
      field: "productName",
      headerName: "Product name",
      width: 90,
      editable: true,
      flex: 1,
    },
    {
      field: "userName",
      headerName: "User name",
      width: 90,
      editable: true,
      flex: 1,
    },
    {
      field: "actions",
      headerName: "Actions",
      renderCell: (params: GridRenderCellParams) => {
        return (
          <Box>
            <Tooltip title="Add opinion" arrow={true}>
                <IconButton
                  onClick={() => console.log()}
                >
                  <AddIcon sx={{ color: "green" }} />
                </IconButton>
              </Tooltip>
          </Box>
        )
      }
    }
  ];

  return (
    <Box
      sx={{
        height: 400,
        width: "100%",
        "& .--Completed": {
          bgcolor: "#dcf2bc" + "!important",
          "&:hover": {
            bgcolor: "#D6ECB6" + "!important",
          },
        },
      }}
    >
      <Typography variant="h4" marginBottom="10px">Orders number: {orderStore.ordersCount}</Typography>
      <DataGrid
        getRowClassName={(params: any) => `--${params.row.statusCode}`}
        // rows={orderStore.allOrders}
        rows={orderStore.allOrders.map((order, i) => ({ lp: i + 1, ...order }))}
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

export default observer(UserOrdersDataGrid);
