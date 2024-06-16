import { createTheme } from "@rneui/themed";

const theme = createTheme({
  lightColors: {
    primary: '#FF7D29',
    background: 'white',
  },
  darkColors: {
    primary: '#FF7D29',
    background:'#222'
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