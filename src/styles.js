import {makeStyles} from "@material-ui/styles";

export const useStyles = makeStyles((theme) => ({
    root: {
      "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
        borderColor: "#D3D3D3"
      }
    },
    input: {
      "&:hover .MuiOutlinedInput-notchedOutline": {
        borderColor: "#D3D3D3"
      },
      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: "#D3D3D3"
      }
    },
    topThreeSection: {
      textAlign: "center",
      margin: "auto",
      width: "auto",
      padding: 16,
      backgroundColor: "#f2f2f2",
      boxShadow: "0 3px 8px rgba(0, 0, 0, 0.1)",
      marginBottom: 30,
      listStyleType: "none",
      "& li": {
        fontSize: "1.2em",
        padding: 20,
        borderBottom: "1px solid #ddd",
      },
      "& li:last-child": {
        borderBottom: "none",
      },
      "& li a": {
        textDecoration: "none",
        color: "#90caf9",
        "&:hover": {
        color: "#ce93d8",
      },
    },
  }
}));

