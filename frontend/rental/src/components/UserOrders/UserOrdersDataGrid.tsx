import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useStores } from "../../stores/root.store";
import { IconButton, Tooltip, Typography, useTheme } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CreateOpinionPopup from "./Popup/CreateOpinionPopup";
import { tokens } from "../../theme";
import Constants from "../../constants/Constants";
import { useTranslation } from "react-i18next";

const UserOrdersDataGrid = () => {
  const { orderStore, orderStatusStore, opinionStore, productStore } =
    useStores();
  const { t } = useTranslation();

  useEffect(() => {
    orderStore.getUserOrders();
    productStore.fetchProducts();
  }, [orderStore, orderStatusStore, productStore]);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns: GridColDef[] = [
    {
      field: "lp",
      headerName: "Lp.",
      flex: 1,
    },
    {
      field: "statusCode",
      headerName: "Status",
      flex: 1,
    },
    {
      field: "productName",
      headerName: t("productName")!,
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
      renderCell: (params: GridRenderCellParams) => {
        return (
          <Box>
            <Tooltip title={t("addOpinion")} arrow={true}>
              <IconButton onClick={() => opinionStore.openPopup(params.row)}>
                <AddIcon sx={{ color: "green" }} />
              </IconButton>
            </Tooltip>
          </Box>
        );
      },
    },
  ];

  return (
    <Box
      className="list-Box"
      sx={{
        "& .--Completed": {
          bgcolor: colors.realized[100] + "!important",
          "&:hover": {
            bgcolor: colors.realized[200] + "!important",
          },
        },
      }}
    >
      <Typography variant="h4" marginBottom="10px">
        {t("ordersNumber")}: {orderStore.ordersCount}
      </Typography>
      <DataGrid
        getRowClassName={(params: any) => `--${params.row.statusCode}`}
        // rows={orderStore.allOrders}
        rows={orderStore.allOrders.map((order, i) => ({ lp: i + 1, ...order }))}
        loading={orderStore.loading}
        columns={columns}
        pageSize={Constants.PAGE_SIZE}
        rowsPerPageOptions={[Constants.PAGE_SIZE]}
        checkboxSelection
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
      />

      <CreateOpinionPopup />
    </Box>
  );
};

export default observer(UserOrdersDataGrid);
