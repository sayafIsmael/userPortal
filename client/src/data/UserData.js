import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import AccountCircle from "@material-ui/icons/AccountCircle";
import CategoryIcon from "@material-ui/icons/Category";

import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import ListSubheader from "@material-ui/core/ListSubheader";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Divider from "@material-ui/core/Divider";
import { toast } from "react-toastify";
import { DataGrid } from "@mui/x-data-grid";

import { BASE_URL } from "./../config";

import { useStyles } from "./../Styles";
import axios from "axios";

const columns = [
  { id: "name", label: "Name", minWidth: 170 },
  { id: "category", label: "Category", minWidth: 100 },
  {
    id: "time",
    label: "Time",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
];

function createData(id, name, category, time) {
  return { id, name, category, time };
}

const userCategories = [
  { name: "user subscription" },
  { name: "cloud phone" },
  { name: "cloud call center" },
  { name: "installation" },
  {
    name: "Date",
    subcategories: ["one time activation", "manday professional services"],
  },
];

const rows = [
  createData(213123, "John", "cloud phone", "07/09/2021"),
  createData(4565464565, "Michael", "installation", "07/09/2021"),
  createData(43634634634, "William", "user subscription", "07/09/2021"),
  createData(556546, "Richard", "cloud phone", "07/09/2021"),
  createData(234234, "Joseph", "one time activation", "07/09/2021"),
  createData(68678, "Thomas", "one year", "07/09/2021"),
  createData(345345345, "Charles", "cloud phone", "07/09/2021"),
  createData(675734534, "Christopher", "cloud phone", "07/09/2021"),
  createData(5463453, "Lorem Ipsum", "cloud phone", "07/09/2021"),
  createData(5465467, "Lorem Ipsum", "cloud phone", "07/09/2021"),
  createData(123453453, "Lorem Ipsum", "cloud phone", "07/09/2021"),
  createData(456546, "Lorem Ipsum", "cloud phone", "07/09/2021"),
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
    width: 500,
  },
  {
    editable: true,
    field: "category",
    hide: false,
    width: 500,
  },
];

export default function UserData() {
  const [errors, setErrors] = useState({});
  const [name, setName] = useState(null);
  const [category, setCategory] = useState(null);
  const [loadingCreate, setLoadingCreate] = React.useState(false);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortModel, setSortModel] = React.useState([
    { field: "name", sort: "asc" },
  ]);
  const [rows, setRows] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const classes = useStyles();

  const handleSortModelChange = (newModel) => {
    setSortModel(newModel);
    console.log(newModel);
  };

  async function getUser(newPage = null) {
    try {
      setLoading(true);
      const response = await axios.get(
        `${BASE_URL}/users?page=${newPage || page}&&field=${
          sortModel[0].field
        }&&sort=${sortModel[0].sort}`
      );
      if (response.data.data) {
        console.log("response user: ", response.data);
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

  function addUser() {
    if (name && category) {
      setLoadingCreate(true);
      axios
        .post(BASE_URL + "/users", { name, category })
        .then((response) => {
          console.log(response.data);
          if (response.data.success) {
            setName("");
            setCategory(null);
            toast.success("User created successfully!");
            getUser();
          }
          setLoadingCreate(false);
        })
        .catch((err) => {
          setLoadingCreate(false);
          console.log("error: ", err);
          if (err.response && err.response.data && err.response.data.error) {
            let error = err.response.data.error;
            if (error.errors) setErrors(error.errors);
            console.log("Personal info store error: ", error);
            if (error && error._message) {
              toast.error(error._message.replace(/([a-z])([A-Z])/g, "$1 $2"));
              // Object.entries(error.errors).forEach(([key, value]) =>
              //   toast.error(value.message)
              // );
            }
          }
          //response.data.error.massage
        });
    } else {
      toast.error("Please enter all field");
    }
  }

  React.useEffect(() => {
    getUser();
  }, []);

  return (
    <div>
      <Grid container spacing={1} alignItems="flex-start">
        <Grid item sm={12} xs={12} md={4}>
          <Grid container spacing={1} alignItems="flex-end">
            <Grid item>
              <AccountCircle />
            </Grid>
            <Grid item sm={4} xs={4} md={4}>
              <TextField
                id="input-with-icon-grid"
                label="Full Name"
                className={classes.userInput}
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid item sm={12} xs={12} md={4}>
          <Grid container spacing={1} alignItems="flex-end">
            <Grid item>
              <CategoryIcon />
            </Grid>
            <Grid item sm={4} xs={4} md={4}>
              <FormControl className={classes.userInput}>
                <InputLabel htmlFor="grouped-native-select">
                  Category
                </InputLabel>
                <Select
                  native
                  defaultValue={""}
                  id="grouped-native-select"
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value={null}></option>
                  {userCategories.map((item, i) => {
                    if (!item.subcategories) {
                      return (
                        <option
                          key={i}
                          value={item.name}
                          selected={item.name == category}
                        >
                          {item.name}
                        </option>
                      );
                    } else {
                      return (
                        <optgroup label={item.name}>
                          {item.subcategories.map((category, index) => (
                            <option key={index} value={category}>
                              {category}
                            </option>
                          ))}
                        </optgroup>
                      );
                    }
                  })}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Grid>

        <Grid item sm={12} xs={12} md={4}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            className={classes.button}
            startIcon={<AddIcon />}
            onClick={() => addUser()}
            disabled={loadingCreate}
          >
            Add User
          </Button>
        </Grid>
      </Grid>
      <Paper className={classes.tableRoot}>
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
          />
        </div>
      </Paper>
    </div>
  );
}
