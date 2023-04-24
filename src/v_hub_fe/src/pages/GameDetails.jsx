import * as React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Grid, Button, Typography, CircularProgress, Backdrop, Card, CardContent } from '@mui/material';
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import { v_stats }  from '../../../declarations/v_stats';
import { v_registry }  from '../../../declarations/v_registry';
import { Principal } from '@dfinity/principal';

import SearchIcon from '@mui/icons-material/Search';
import LinkIcon from '@mui/icons-material/Link';

import { styled } from '@mui/material/styles';

export default function GameDetails() {
  const [ loading, setLoading ] = useState(false);
  const [ gameColls, setGameColls ] = useState([]);
  const [ activePlayers, setActivePlayers ] = useState("");
  const [ uniquePlayers, setUniquePlayers ] = useState("");
  const [ cyclesBurned, setCyclesBurned ] = useState("");
  const [ peakConcurrentPlayers, setPeakConcurrentPlayers ] = useState("");
  const [ hoursPlayed, setHoursPlayed ] = useState("");
  const [ sessionTimeAverage, setSessionTimeAverage ] = useState("");
  const [ logoUrl, setLogoUrl ] = useState("");
  const { id } = useParams();

  const getGameDetails = async ()=> {
    try {
        
        const gameRes = await v_registry.get(Principal.fromText(id));
        if (gameRes) {
            setLogoUrl(gameRes[0].thumbnail);
        };
        const gamesStatsRes = await v_stats.get_game_stats(Principal.fromText(id));
        if (gamesStatsRes) {
            setActivePlayers(Number(gamesStatsRes[gamesStatsRes.length-1].active_players));
            setUniquePlayers(Number(gamesStatsRes[gamesStatsRes.length-1].unique_players));
            setCyclesBurned(Number(gamesStatsRes[gamesStatsRes.length-1].cycles_burned));
            setPeakConcurrentPlayers(Number(gamesStatsRes[gamesStatsRes.length-1].peak_concurrent_players));
            setHoursPlayed(Number(gamesStatsRes[gamesStatsRes.length-1].hours_played));
            setSessionTimeAverage(Number(gamesStatsRes[gamesStatsRes.length-1].session_time_average));
        } else {
            console.log("Empty");
        };
        setLoading(false);
    } catch (e) {
      console.log(e);
      window.alert("Unexpected error. Please try again and report it.");
    };
  };

  useEffect(() => {
    setLoading(true);
    getGameDetails();
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
        <div
          container 
          spacing={3} 
          justifyContent="center"
          style={{
            position: "absolute",
            width: "100%",
            height: "30%",
            background: "linear-gradient(159.25deg, #3E3E55 3.86%, #221C2F 71.38%)",
            borderRadius: "15.4134px",
          }}
        >
          </div>
          <Grid 
            item 
            xs={8} 
            style={{
              marginTop: "7vh",
              marginLeft: 0
            }}
          >
            <Grid container justifyContent="right" alignItems="" spacing={2} style={{ width: '100%' }}>
                <Grid item xs={3}>
                  <Typography
                    id="input-with-sx" 
                    value={"vibrant"} 
                    label="vibrant" 
                    style={{
                      position: "absolute",
                      width: "100%",
                      height: "7%",
                      left: "60px",
                      top: "75px",
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
            </Grid>
            <Grid item container justifyContent="center" alignItems="center" spacing={2} style={{ width: '100%' }}>
                <div 
                    style={{
                        position: "relative",
                        width: "70vw",
                        background: "linear-gradient(96.14deg, #1F1B2E 10.75%, #2E2B40 87.91%);",
                        boxShadow: "21.3867px 24.06px 37.4267px rgba(0, 0, 0, 0.25)",
                        borderRadius: "24.6615px",
                        padding: 30,
                        marginTop: "133px"
                    }}
                >
                    <Grid container spacing={2}>
                        <Grid item container xs={12}>
                            <Grid item xs={6} style={{textAlign:"left"}}>
                                <img src={logoUrl} style={{width: "13%"}} />
                            </Grid>
                                <Grid item xs={6} style={{textAlign:"right"}}>
                            </Grid>
                        </Grid>
                        <Grid item container alignItems="center" spacing={3}>
                            <Grid item container xs={4}>
                                <Grid item>
                                    <div
                                        style={{
                                            width: "5px",
                                            height: "10vh",
                                            background: "#6AD77B",
                                        }}
                                    ></div>
                                </Grid>
                                <Grid item style={{width: "80%"}}>
                                    <Card sx={{ 
                                        boxSizing: "border-box",
                                        width: "100%",
                                        height: "10vh",
                                        color: "#fff",
                                        background: "linear-gradient(90.01deg, #17353D 8.31%, rgba(23, 43, 61, 0) 84.23%)"
                                    }}>
                                        <CardContent>
                                            <Typography style={{fontSize:12}}>ACTIVE PLAYERS</Typography>
                                            <Typography>{activePlayers}</Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            </Grid>
                            <Grid item container xs={4}>
                                <Grid item>
                                    <div
                                        style={{
                                            width: "5px",
                                            height: "10vh",
                                            background: "#6AD77B",
                                        }}
                                    ></div>
                                </Grid>
                                <Grid item style={{width: "80%"}}>
                                    <Card sx={{ 
                                        boxSizing: "border-box",
                                        width: "100%",
                                        height: "10vh",
                                        color: "#fff",
                                        background: "linear-gradient(90.01deg, #17353D 8.31%, rgba(23, 43, 61, 0) 84.23%)"
                                    }}>
                                        <CardContent>
                                            <Typography style={{fontSize:12}}>UNIQUE PLAYERS</Typography>
                                            <Typography>{uniquePlayers}</Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            </Grid>
                            <Grid item container xs={4}>
                                <Grid item>
                                    <div
                                        style={{
                                            width: "5px",
                                            height: "10vh",
                                            background: "#6AD77B",
                                        }}
                                    ></div>
                                </Grid>
                                <Grid item style={{width: "80%"}}>
                                    <Card sx={{ 
                                        boxSizing: "border-box",
                                        width: "100%",
                                        height: "10vh",
                                        color: "#fff",
                                        background: "linear-gradient(90.01deg, #17353D 8.31%, rgba(23, 43, 61, 0) 84.23%)"
                                    }}>
                                        <CardContent>
                                            <Typography style={{fontSize:12}}>CYCLES BURNED</Typography>
                                            <Typography>{cyclesBurned}</Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            </Grid>
                            <Grid item container xs={4}>
                                <Grid item>
                                    <div
                                        style={{
                                            width: "5px",
                                            height: "10vh",
                                            background: "#6AD77B",
                                        }}
                                    ></div>
                                </Grid>
                                <Grid item style={{width: "80%"}}>
                                    <Card sx={{ 
                                        boxSizing: "border-box",
                                        width: "100%",
                                        height: "10vh",
                                        color: "#fff",
                                        background: "linear-gradient(90.01deg, #17353D 8.31%, rgba(23, 43, 61, 0) 84.23%)"
                                    }}>
                                        <CardContent>
                                            <Typography style={{fontSize:10}}>PEAK CONCURRENT PLAYERS</Typography>
                                            <Typography>{peakConcurrentPlayers}</Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            </Grid>
                            <Grid item container xs={4}>
                                <Grid item>
                                    <div
                                        style={{
                                            width: "5px",
                                            height: "10vh",
                                            background: "#6AD77B",
                                        }}
                                    ></div>
                                </Grid>
                                <Grid item style={{width: "80%"}}>
                                    <Card sx={{ 
                                        boxSizing: "border-box",
                                        width: "100%",
                                        height: "10vh",
                                        color: "#fff",
                                        background: "linear-gradient(90.01deg, #17353D 8.31%, rgba(23, 43, 61, 0) 84.23%)"
                                    }}>
                                        <CardContent>
                                            <Typography style={{fontSize:12}}>HOURS PLAYED</Typography>
                                            <Typography>{hoursPlayed}</Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            </Grid>
                            <Grid item container xs={4}>
                                <Grid item>
                                    <div
                                        style={{
                                            width: "5px",
                                            height: "10vh",
                                            background: "#6AD77B",
                                        }}
                                    ></div>
                                </Grid>
                                <Grid item style={{width: "80%"}}>
                                    <Card sx={{ 
                                        boxSizing: "border-box",
                                        width: "100%",
                                        height: "10vh",
                                        color: "#fff",
                                        background: "linear-gradient(90.01deg, #17353D 8.31%, rgba(23, 43, 61, 0) 84.23%)"
                                    }}>
                                        <CardContent>
                                            <Typography style={{fontSize:12}}>SESSION TIME AVG</Typography>
                                            <Typography>{sessionTimeAverage}</Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
            </Grid>
          </Grid>
        <Grid container justifyContent="space-between" xs={12} style={{marginTop: "50vh", position: "absolute", bottom: 40, marginLeft: 0, color: "#ffffff", width: "100vw"}}>
          <Grid item xs={6} textAlign="center">
            <Typography>
              <img src="/powered-by-ic.svg"></img>
            </Typography>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};