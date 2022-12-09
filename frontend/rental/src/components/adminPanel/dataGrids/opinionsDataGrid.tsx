import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { useStores } from "../../../stores/root.store";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { toJS } from "mobx";

const getUniqueNames = (names: string[]) => {
  let uniqueNames = names.filter((element, index) => {
    return names.indexOf(element) === index;
  });
  return uniqueNames;
};

export default function OpinionsDataGrid() {
  //get opinions
  const { opinionStore } = useStores();
  useEffect(() => {
    opinionStore.fetchOpinions();
  }, [opinionStore]);

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90, editable: false },
    {
      field: "productName",
      headerName: "ProductName",
      width: 90,
      editable: true,
    },
    { field: "value", headerName: "Value", width: 90, editable: true },
    {
      field: "description",
      headerName: "Description",
      width: 90,
      editable: true,
    },
    //TODO obrazki
    {
      field: "opinionImages",
      headerName: "OpinionImages",
      width: 90,
      editable: true,
    },
    { field: "productID", headerName: "ProductID", width: 90, editable: true },
    { field: "userEmail", headerName: "UserEmail", width: 150, editable: true },
  ];

  let display = [];
  for (let i = 0; i < opinionStore.allOpinions.length; i++) {
    display.push({
      id: opinionStore.allOpinions[i].id,
      productName: opinionStore.allOpinions[i].productName,
      value: opinionStore.allOpinions[i].value,
      description: opinionStore.allOpinions[i].description,
      opinionImages: "",
      productID: opinionStore.allOpinions[i].productID,
      userEmail: opinionStore.allOpinions[i].userEmail,
    });
  }

  // let display = [
  //   {
  //     id: 1,
  //     productName: "test1",
  //     value: 213,
  //     description: "testowy description",
  //     opinionImages: '',
  //     productID: 12312,
  //     userEmail: "aa@aa.pl"
  //   }
  // ]

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={display}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
      />
    </Box>
  );
}
