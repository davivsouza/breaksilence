import { extendTheme } from "native-base";

export const THEME = extendTheme({
  colors: {
    gray: {
      200: "#BEBEBE",
      300: "#898C94",
    },
    pink: {
      300: "#FF416C",
    },
    purple: {
      300: "#A702E8",
    },
    green: {
      300: '#14D111'
    }
  },
  fonts: {
    heading: "OpenSans_700Bold",
    body: "OpenSans_400Regular",
    semiBold: "OpenSans_600SemiBold",
  },
  fontSizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    "2xl": 25,
    "3xl": 32,
  },
});
