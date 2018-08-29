import { createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import lightBlue from '@material-ui/core/colors/lightBlue';

export default createMuiTheme({
  palette: {
    primary: blue,
    secondary: lightBlue
  },
  typography: {
    title: {
      fontWeight: 500
    }
  }
});