import * as React from 'react';
import { useEffect, useState } from 'react';
import { Grid, Button, Typography, CircularProgress, Backdrop, TextField } from '@mui/material';
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import { v_registry }  from '../../../declarations/v_registry';
import { useNavigate } from "react-router-dom";

import SearchIcon from '@mui/icons-material/Search';
import LinkIcon from '@mui/icons-material/Link';
// import GRIcon from '../../assets/game_registry_icon.png';

import { styled } from '@mui/material/styles';

export default function Games() {
  const [ loading, setLoading ] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        backgroundColor: "rgba(47, 41, 62, 1)",
        width: "100vw",
        height: "100vh",
        marginTop: 0
      }}
    >
      <div 
        style={{
          position: "relative",
          width: "80vw",
          height: "80vh",
          background: "#13131A",
          backgroundImage: `url(/bg.png)`,
          boxShadow: "21.3867px 24.06px 37.4267px rgba(0, 0, 0, 0.25)",
          borderRadius: "24.6615px",
          marginLeft: "10%",
          marginTop: "6%",
        }}
      >
        {
          loading &&
          <Backdrop
          sx={{ color: '#000', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        }
          <Grid 
            item 
            xs={8} 
            style={{
              marginTop: "7vh",
              marginLeft: 0
            }}
          >
          <Grid container direction="column" justifyContent="center" alignItems="center" spacing={5} style={{ width: '100%' }}>
                <Grid item container justifyContent="center" alignItems="center" spacing={2} style={{ width: '100%' }}>
                    <Grid container direction="column" alignItems="center">
                        <Grid>
                            <Typography
                                id="input-with-sx"
                                value={"vibrant"}
                                label="Ic Games Registry"
                                style={{
                                    position: "relative",
                                    height: "30%",
                                    marginTop: "30%",
                                    fontFamily: "Urbanist",
                                    fontStyle: "normal",
                                    fontWeight: "700",
                                    fontSize: "4.5vw",
                                    lineHeight: "0px",
                                    display: "flex",
                                    alignItems: "left",
                                    color: "#FFFFFF",
                                }}
                            >
                                vibrant
                            </Typography>
                        </Grid>
                        <Grid xs={4}>
                            <Typography
                                sx={{
                                    marginTop: "20%",
                                    fontFamily: 'Urbanist',
                                    fontStyle: "normal",
                                    fontWeight: "600",
                                    fontSize: "12px",
                                    lineHeight: "15px",
                                    color: "#FFFFFF"
                                }}                            
                            >
                                The following game registry contains statistics of games running 100% on-chain over the Internet Computer under the ICRC-14 standard.
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item container justifyContent="center" alignItems="center" spacing={2} style={{ width: '100%' }}>
                    <Button onClick={()=>{navigate(`/registry`)}}>
                        <div 
                            style={{
                                position: "relative",
                                width: "30vw",
                                height: "20vh",
                                background: "#13131A",
                                backgroundImage: `url(/bg.png)`,
                                boxShadow: "21.3867px 24.06px 37.4267px rgba(0, 0, 0, 0.25)",
                                borderRadius: "24.6615px",
                                padding: 30
                            }}
                        >
                            <Grid container direction="column" alignItems="center">
                                <Grid item sx={{textAlign:"center"}}>
                                    <img src="/game_registry_icon.png" style={{width: "50%"}} />
                                </Grid>
                                <Grid item>
                                    <Typography
                                        sx={{
                                            fontFamily: 'Urbanist',
                                            fontStyle: "normal",
                                            fontWeight: "600",
                                            fontSize: "24px",
                                            lineHeight: "30px",
                                            color: "#FFFFFF"
                                        }}                            
                                    >
                                        Game Registry
                                    </Typography>
                                </Grid>
                            </Grid>
                        </div>
                    </Button>
                </Grid>
                <Grid item container justifyContent="center" alignItems="center" spacing={2} style={{ width: '100%' }}>
                    <div 
                        style={{
                            position: "relative",
                            width: "30vw",
                            background: "#13131A",
                            backgroundImage: `url(/bg.png)`,
                            boxShadow: "21.3867px 24.06px 37.4267px rgba(0, 0, 0, 0.25)",
                            borderRadius: "24.6615px",
                            padding: 30
                        }}
                    >
                        <Grid container direction="row" alignItems="center">
                            <Grid item xs={6} sx={{textAlign:"center"}}>
                                <a href="https://discord.gg/mVKv73gFWR"><img src="/discordLogo.png" style={{width: "20%"}} /></a>
                            </Grid>
                            <Grid item xs={6} sx={{textAlign:"center"}}>
                                <a href="https://twitter.com/byvibrant_"><img src="/twitter-logo.png" style={{width: "15%"}} /></a>
                            </Grid>
                        </Grid>
                    </div>
                </Grid>
            </Grid>
            <Grid 
              container 
              spacing={2} 
              style={{
                marginLeft: "20%",
                height: 100, 
                width: '60%', 
                marginTop: "2%",
              }}
            >
            
            </Grid>
          </Grid>
        <Grid container justifyContent="space-between" xs={12} style={{marginTop: "50vh", position: "absolute", bottom: 40, marginLeft: 0, color: "#ffffff", width: "100vw"}}>
          <Grid item xs={12} textAlign="right" style={{marginRight: 30}}>
            <Typography>
              <img src="/powered-by-ic.svg"></img>
            </Typography>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};