import { makeStyles, useTheme } from "@material-ui/core/styles";

const drawerWidth = 240;

export const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  margin: {
    margin: theme.spacing(1),
  },
  userInput: {
    width: 300,
  },
  button: {
    margin: theme.spacing(1),
    width: 300,
  },
  marginTypo:{
    padding: theme.spacing(5),
    paddingTop: theme.spacing(5),
  },
  tableRoot: {
    width: '100%',
    marginTop: 30
  },
  userTableContainer: {
    maxHeight: 380,
  },
  paperBillingTable: {
    width: '100%',
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
    padding: 20
  },
  table: {
    minWidth: 750,
    maxHeight: 380,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));
