import * as React from "react";

import CssBaseline from "@mui/material/CssBaseline";
import useMediaQuery from "@mui/material/useMediaQuery";
import {
  ThemeProvider as MuiThemeProvider,
  createTheme,
  useTheme,
} from "@mui/material/styles";
import { ThemeProvider } from "@emotion/react";

import { AppRouter } from "./AppRouter.jsx";

import { createClient } from "@connect2ic/core"
import { Connect2ICProvider } from "@connect2ic/react"
import { NFID } from "@connect2ic/core/providers/nfid"
import { PlugWallet } from "@connect2ic/core/providers/plug-wallet"
import { StoicWallet } from "@connect2ic/core/providers/stoic-wallet"
import "@connect2ic/core/style.css"
import * as registry from "../../../.dfx/local/canisters/v_registry"


const client = createClient({
  canisters: {
    registry,
  },
  providers: [
    new NFID(
      {
      // boolean
      dev: true,
      // The app name
      appName: "Vibrant Hub Admin",
      // whitelisted canisters
      whitelist: [],
      // The url for the providers frontend
      providerUrl: "https://nfid.one",
      // The host used for canisters
      host: window.location.origin,
      // host: "http://localhost:4943",
    }
    ),
    new StoicWallet({
      // boolean
      dev: true,
      // whitelisted canisters
      whitelist: [],
      // The url for the providers frontend
      providerUrl: "https://www.stoicwallet.com",
      // The host used for canisters
      host: window.location.origin,
      // host: "http://localhost:4943",
    }),
    new PlugWallet({
      // boolean
      dev: true,
      // whitelisted canisters
      whitelist: [],
      // The host used for canisters
      host: window.location.origin,
      // host: "http://localhost:4943",
    })
  ],
})

function Vadmin() {
  const themeQuery = useTheme();
  const mobileBreakpoint = useMediaQuery(themeQuery.breakpoints.up("md"));
  const theme = createTheme({
    palette: {
      primary: {
        main: "#666",
      },
    },
  });

  return (
    <Connect2ICProvider client={client}>
      <MuiThemeProvider theme={theme}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
              <AppRouter isMobile={mobileBreakpoint ? false : true} />
        </ThemeProvider>
      </MuiThemeProvider>
    </Connect2ICProvider>
  );
}

export default Vadmin;