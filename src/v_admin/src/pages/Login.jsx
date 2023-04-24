import * as React from 'react';
import { useEffect, useState } from 'react';
import { Grid} from '@mui/material';
import { Typography } from "@mui/material";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from "react-router-dom";
import { 
  ConnectButton, 
  ConnectDialog, 
  useConnect 
} from "@connect2ic/react";
import "@fontsource/montserrat"

export default function Login() {
  const navigate = useNavigate();
  const [ loading, setLoading ] = useState(false);

  
  const { principal } = useConnect();

  useEffect(() => {
    if (principal) {
      navigate("/games");
    };
  });

  return (
    <div
    style={{
      position: "absolute",
      top: 0,
      backgroundColor: "rgba(47, 41, 62, 1)",
      width: "100vw",
      height: "100vh",
      marginTop: 0
    }}>
    <div 
      style={{
        position: "relative",
        width: "50vw",
        height: "80vh",
        background: "#13131A",
        backgroundImage: `url(/bg.png)`,
        boxShadow: "21.3867px 24.06px 37.4267px rgba(0, 0, 0, 0.25)",
        borderRadius: "24.6615px",
        marginLeft: "25%",
        marginTop: "6%",
        color: "#fff"
      }}
    >
      {
        loading &&
        <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      }
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} style={{marginTop: "20vh"}}>
          <Grid container spacing={2}>
            <Grid item xs={12} textAlign="center">
              <Typography sx={{ fontFamily: "Montserrat", fontSize: "100px", fontWeight: "700", color: "#fff" }}>vibrant</Typography>
            </Grid>
            <Grid item xs={12} textAlign="center">
              <Typography>
                Admin
              </Typography>
            </Grid>
            <Grid item xs={3} textAlign="center">
            </Grid>
            <Grid item container xs={12} md={6} justifyContent="center">
              <ConnectButton />
              <ConnectDialog dark={true} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      </div>
    </div>
  );
};