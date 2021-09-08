import React from "react";
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
import SearchIcon from '@material-ui/icons/Search';

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
    editable: true,
    field: "name",
    hide: false,
    width: 250,
  },
  {
    editable: true,
    field: "phone",
    hide: false,
    width: 250,
  },
  {
    editable: true,
    field: "department",
    hide: false,
    width: 150,
  },
  {
    editable: true,
    field: "extensionNumber",
    hide: false,
    width: 180,
  },
  { editable: true, field: "duration", hide: false, width: 250 },
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
  const [sortModel, setSortModel] = React.useState([
    { field: "name", sort: "asc" },
  ]);
  const [loading, setLoading] = React.useState(false);

  const [rows, setRows] = React.useState([
    createData("Cupcake", "Lorem Ipsum", 3.7, 67, "1:20:0"),
    createData("Donut", "Lorem Ipsum", 25.0, 51, "1:20:0"),
    createData("Eclair", "Lorem Ipsum", 16.0, 24, "1:20:0"),
    createData("Frozen yoghurt", "Lorem Ipsum", 6.0, 24, "1:20:0"),
    createData("Gingerbread", "Lorem Ipsum", 16.0, 49, "1:20:0"),
    createData("Honeycomb", "Lorem Ipsum", 3.2, 87, "1:20:0"),
    createData("Ice cream sandwich", "Lorem Ipsum", 9.0, 37, "1:20:0"),
    createData("Jelly Bean", "Lorem Ipsum", 0.0, 94, "1:20:0"),
    createData("KitKat", "Lorem Ipsum", 26.0, 65, "1:20:0"),
    createData("Lollipop", "Lorem Ipsum", 0.2, 98, "1:20:0"),
    createData("Marshmallow", "Lorem Ipsum", 0, 81, "1:20:0"),
    createData("Nougat", "Lorem Ipsum", 19.0, 9, "1:20:0"),
    createData("Oreo", "Lorem Ipsum", 18.0, 63, "1:20:0"),
  ]);

  const requestSearch = () => {};

  const handleSortModelChange = (newModel) => {
    setSortModel(newModel);
    console.log(newModel);
  };

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
            rows={rows}
            columns={tableColumns}
            sortingMode="server"
            sortModel={sortModel}
            onSortModelChange={handleSortModelChange}
            pagination
            pageSize={5}
            // rowsPerPageOptions={[5]}
            rowCount={13}
            paginationMode="server"
            onPageChange={(newPage) => {
              setPage(newPage);
            }}
            page={page}
            loading={loading}
          />
        </div>
      </Paper>
    </div>
  );
}
