import { ThemeProvider, CSSReset, ColorModeProvider } from "@chakra-ui/react";
import customTheme from "../theme";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={customTheme}>
      <ColorModeProvider
        options={{
          useSystsemColorMode: true,
        }}
      >
        <CSSReset />
        <Component {...pageProps} />
      </ColorModeProvider>
    </ThemeProvider>
  );
}

export default MyApp;
