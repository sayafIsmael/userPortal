import React, {useState} from "react";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
import { Typography, Container } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import { DataGrid } from "@mui/x-data-grid";
import { BASE_URL } from "./../config";
import axios from "axios";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import FilterListIcon from "@material-ui/icons/FilterList";
import TextFieldsIcon from "@material-ui/icons/TextFields";
import ShortTextIcon from "@material-ui/icons/ShortText";
import SearchIcon from "@material-ui/icons/Search";
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import { toast } from 'react-toastify';

import "@fontsource/roboto";

import { useStyles } from "../Styles";

function createData(id, name, dataPlan, bandwith, latency) {
  return { id, name, dataPlan, bandwith, latency };
}

const originalRows = [
  createData(123, "Cupcake", "Lorem Ipsum", 3.7, 67),
  createData(3454, "Donut", "Lorem Ipsum", 25.0, 51),
  createData(45345, "Eclair", "Lorem Ipsum", 16.0, 24),
  createData(234, "Frozen yoghurt", "Lorem Ipsum", 6.0, 24),
  createData(67654, "Gingerbread", "Lorem Ipsum", 16.0, 49),
  createData(345345, "Honeycomb", "Lorem Ipsum", 3.2, 87),
  createData(234234, "Ice cream sandwich", "Lorem Ipsum", 9.0, 37),
  createData(567567, "Jelly Bean", "Lorem Ipsum", 0.0, 94),
  createData(6786787, "KitKat", "Lorem Ipsum", 26.0, 65),
  createData(68567, "Lollipop", "Lorem Ipsum", 0.2, 98),
  createData(345345, "Marshmallow", "Lorem Ipsum", 0, 81),
  createData(45633, "Nougat", "Lorem Ipsum", 19.0, 9),
  createData(6543, "Oreo", "Lorem Ipsum", 18.0, 63),
];

const tableColumns = [
  {
    editable: false,
    field: "id",
    hide: true,
  },
  {
    field: "name",
    editable: false,
    hide: false,
    width: 300,
  },
  {
    field: "dataPlan",
    editable: false,
    hide: false,
    width: 300,
  },
  {
    field: "bandwith",
    editable: false,
    hide: false,
    width: 200,
  },
  {
    field: "latency",
    editable: false,
    hide: false,
    width: 200,
  },
];

const headCells = [
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "Name",
  },
  {
    id: "dataPlan",
    numeric: false,
    disablePadding: true,
    label: "DataPlan",
  },
  { id: "bandwith", numeric: true, disablePadding: false, label: "Bandwith" },
  { id: "latency", numeric: true, disablePadding: false, label: "Latency" },
];

export default function UserSubscription() {
  const classes = useStyles();

  const [rows, setRows] = React.useState([]);

  const [sortModel, setSortModel] = React.useState([
    { field: "name", sort: "asc" },
  ]);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [filterField, setFilterField] = React.useState("");
  const [filterValue, setFilterValue] = React.useState(null);
  const [total, setTotal] = useState(0);

  const [loading, setLoading] = React.useState(false);

  function requestSearch() {
    if(filterField && filterValue){
      getUser(1)
    }else{
      getUser()
      toast.error("Please enter data before search")
    }
  }

  const handleSortModelChange = (newModel) => {
    setSortModel(newModel);
    getUser(null, newModel);
    console.log("newModel chng: ",newModel);
  };

  React.useEffect(() => {
    getUser();
  }, []);

  async function getUser(newPage = null, sortData=null, filterfld=null, filtervl=null) {
    try {
      let sort = sortData || sortModel
      let fieldToFilter = filterfld || filterField
      let fldValue = filtervl || filterValue

      setLoading(true);
      console.log("newModel: ",sort[0])
      console.log("filterField", filterField)
      const response = await axios.get(
        `${BASE_URL}/users/subscription?page=${newPage || page}&&field=${
          sort[0].field
        }&&sort=${sort[0].sort == "asc" ? 1 : -1}&&filterField=${fieldToFilter}&&filterValue=${fldValue}`
      );
      if (response.data.data) {
        console.log("response data subs: ", response.data);
        console.log("sort user: ", sort[0].field == "asc" ? 1 : -1);
        setTotal(response.data.total);
        setPage(response.data.page);
        setRows(response.data.data);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  }


  return (
    <div className={classes.margin}>
      <Typography
        variant="h4"
        component="h4"
        padding={"normal"}
        className={classes.margin}
      >
        Users Subscription Information
      </Typography>
      <Grid container spacing={1} alignItems="center">
        <Grid item sm={12} xs={12} md={4}>
          <Grid container spacing={1} alignItems="flex-end">
            <Grid item>
              <TextFieldsIcon />
            </Grid>
            <Grid item sm={4} xs={4} md={4}>
              <FormControl className={classes.userInput}>
                <InputLabel htmlFor="grouped-native-select">Field</InputLabel>
                <Select
                  native
                  defaultValue={""}
                  id="grouped-native-select"
                  onChange={(e) => setFilterField(e.target.value)}
                >
                  <option value={null}></option>
                  {headCells.map((item, i) => (
                    <option key={i} value={item.id}>
                      {item.label}
                    </option>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
        <Grid item sm={12} xs={12} md={4}>
          <Grid container spacing={1} alignItems="flex-end">
            <Grid item>
              <ShortTextIcon />
            </Grid>
            <Grid item sm={4} xs={4} md={4}>
              <TextField
                id="input-with-icon-grid"
                label="Value"
                className={classes.userInput}
                onChange={(e) => setFilterValue(e.target.value)}
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid item sm={12} xs={12} md={2}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            className={classes.button}
            startIcon={<SearchIcon />}
            onClick={() => requestSearch()}
          >
            Search
          </Button>
        </Grid>
      </Grid>
      <Paper className={classes.paperBillingTable}>
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={tableColumns}
            sortingMode="server"
            sortModel={sortModel}
            onSortModelChange={handleSortModelChange}
            pagination
            pageSize={10}
            // rowsPerPageOptions={[5]}
            rowCount={total}
            paginationMode="server"
            onPageChange={(newPage) => {
              console.log(newPage);
              setPage(newPage);
              getUser(newPage);
            }}
            page={page}
            loading={loading}
            loading={loading}
          />
        </div>
      </Paper>
    </div>
  );
}
