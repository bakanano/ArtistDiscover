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
    }
}));

