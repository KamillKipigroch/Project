import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { useStores } from "../../../stores/root.store";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { IconButton, Tooltip, useTheme } from "@mui/material";
import { tokens } from "../../../theme";
import Constants from "../../../constants/Constants";
import { useTranslation } from "react-i18next";
import BlockIcon from "@mui/icons-material/Block";
import CheckIcon from "@mui/icons-material/Check";

const UsersDataGrid = () => {
  const { userStore } = useStores();
  const { t } = useTranslation();

  useEffect(() => {
    userStore.fetchUsers();
  }, [userStore]);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns: GridColDef[] = [
    {
      field: "lp",
      headerName: "Lp.",
      flex: 1,
    },
    {
      field: "firstName",
      headerName: t("firstName")!,
      flex: 1,
    },
    {
      field: "lastName",
      headerName: t("lastName")!,
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "userRole",
      headerName: t("userRole")!,
      flex: 1,
    },
    {
      field: "actions",
      headerName: t("actions")!,
      flex: 1,
      renderCell: (params: GridRenderCellParams) => {
        return (
          <Box>
            {params.row.locked ? (
              <Tooltip title={t("unlock")} arrow={true}>
                <IconButton
                  onClick={() => {
                    userStore.unlockUser(params.row);
                  }}
                >
                  <BlockIcon sx={{ color: "red" }} />
                </IconButton>
              </Tooltip>
            ) : (
              <Tooltip title={t("lock")} arrow={true}>
                <IconButton onClick={() => userStore.lockUser(params.row)}>
                  <CheckIcon sx={{ color: "green" }} />
                </IconButton>
              </Tooltip>
            )}
          </Box>
        );
      },
    },
  ];

  return (
    <Box className="list-Box">
      <DataGrid
        getRowId={(row) => row.email}
        rows={userStore.users.map((user, i) => ({ lp: i + 1, ...user }))}
        loading={userStore.loading}
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

export default observer(UsersDataGrid);
