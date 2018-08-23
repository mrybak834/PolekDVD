import { createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';

export default createMuiTheme({
  palette: {
    primary: blue,
    secondary: blue
  },
  typography: {
    title: {
      fontWeight: 500
    }
  }
});