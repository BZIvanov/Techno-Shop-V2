import { Paper } from '@mui/material';
import Typewriter from 'typewriter-effect';

const Jumbotron = ({ texts }) => (
  <Paper
    sx={{
      color: (theme) => theme.palette.warning.main,
      padding: 3,
      textAlign: 'center',
      fontSize: 48,
    }}
  >
    <Typewriter options={{ strings: texts, autoStart: true, loop: true }} />
  </Paper>
);

export default Jumbotron;
