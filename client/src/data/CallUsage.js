import React, { useState } from "react";
import { BASE_URL } from "./../config";
import axios from "axios";
import { toast } from "react-toastify";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
import { Typography, Container } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Paper from "@material-ui/core/Paper";
import { DataGrid } from "@mui/x-data-grid";
import SearchIcon from "@material-ui/icons/Search";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import FilterListIcon from "@material-ui/icons/FilterList";
import TextFieldsIcon from "@material-ui/icons/TextFields";
import ShortTextIcon from "@material-ui/icons/ShortText";

import "@fontsource/roboto";

import { useStyles } from "../Styles";

function createData(name, phone, department, extensionNumber, duration) {
  let id = Math.floor(Math.random() * 100) + 1;
  return { id, name, phone, department, extensionNumber, duration };
}

const headCells = [
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "Name",
  },
  {
    id: "phone",
    numeric: false,
    disablePadding: true,
    label: "Phone",
  },
  {
    id: "department",
    numeric: false,
    disablePadding: false,
    label: "Department",
  },
  {
    id: "extensionNumber",
    numeric: true,
    disablePadding: false,
    label: "Extension Number",
  },
  { id: "duration", numeric: false, disablePadding: false, label: "Duration" },
];

const tableColumns = [
  {
    editable: false,
    field: "id",
    hide: true,
  },
  {
    editable: false,
    field: "name",
    hide: false,
    width: 250,
  },
  {
    editable: false,
    field: "phone",
    hide: false,
    width: 250,
  },
  {
    editable: false,
    field: "department",
    hide: false,
    width: 150,
  },
  {
    editable: false,
    field: "extensionNumber",
    hide: false,
    width: 180,
  },
  { editable: false, field: "duration", hide: false, width: 250 },
];

export default function UserSubscription() {
  const classes = useStyles();

  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("name");
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [filterField, setFilterField] = React.useState("");
  const [filterValue, setFilterValue] = React.useState(null);
  const [total, setTotal] = useState(0);

  const [sortModel, setSortModel] = React.useState([
    { field: "name", sort: "asc" },
  ]);
  const [loading, setLoading] = React.useState(false);

  const [rows, setRows] = React.useState([]);

  const requestSearch = () => {
    if (filterField && filterValue) {
      getUser(1);
    } else {
      getUser();
      toast.error("Please enter data before search");
    }
  };

  const handleSortModelChange = (newModel) => {
    setSortModel(newModel);
    getUser(null, newModel);
    console.log("newModel chng: ", newModel);
  };

  React.useEffect(() => {
    getUser();
  }, []);

  async function getUser(
    newPage = null,
    sortData = null,
    filterfld = null,
    filtervl = null
  ) {
    try {
      let sort = sortData || sortModel;
      let fieldToFilter = filterfld || filterField;
      let fldValue = filtervl || filterValue;

      setLoading(true);
      console.log("newModel: ", sort[0]);
      console.log("filterField", filterField);
      const response = await axios.get(
        `${BASE_URL}/users/call-usage?page=${newPage || page}&&field=${
          sort[0].field
        }&&sort=${
          sort[0].sort == "asc" ? 1 : -1
        }&&filterField=${fieldToFilter}&&filterValue=${fldValue}`
      );

      console.log("response data call: ", response.data);

      if (response.data.data) {
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
        className={classes.marginTypo}
      >
        Users Call Usage Information
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

        <Grid item sm={12} xs={12} md={4}>
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
            rows={[...rows]}
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
