import { createTheme } from "@rneui/themed";

const theme = createTheme({
  lightColors: {
    primary: '#FF7D29',
  },
  darkColors: {
    primary: 'blue',
  },
  components: {
    Input:{
      inputStyle: {
        fontFamily: 'FiraCode',
      }
    },
    Text:{
      style:{
        fontFamily: 'FiraCode',
      },
      h3Style: {
        fontSize:20,
        fontFamily: 'FiraCode',
        fontWeight: 'normal',
      }
    },
    Button: {
      titleStyle: {
        fontFamily: 'FiraCode',
      },
      raised: true,
    },
  },
});
export default theme