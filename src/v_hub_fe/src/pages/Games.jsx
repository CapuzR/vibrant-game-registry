import * as React from 'react';
import { useEffect, useState } from 'react';
import { Grid, Button, Typography, CircularProgress, Backdrop, TextField } from '@mui/material';
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import { v_registry }  from '../../../declarations/v_registry';
import { useNavigate } from "react-router-dom";

import SearchIcon from '@mui/icons-material/Search';
import LinkIcon from '@mui/icons-material/Link';

import { styled } from '@mui/material/styles';

export default function Games() {
  const [ loading, setLoading ] = useState(false);
  const [ gameColls, setGameColls ] = useState([]);
  const [ search, setSearch ] = useState("");
  const navigate = useNavigate();

  const StripedDataGrid = styled(DataGrid)(({ theme }) => ({
    color: "#fff",
    [`& .${gridClasses.row}.even`]: {
      color: "#fff",
      width: "100vw",
      '&:hover, &.Mui-hovered': {
        backgroundColor: "#777",
        '@media (hover: none)': {
          backgroundColor: '#666',
        },
      }
    },
    [`& .${gridClasses.row}.odd`]: {
      backgroundColor: "rgba(40, 36, 56, 0.8)",
      color: "#fff",
      width: "100vw",
      '&:hover, &.Mui-hovered': {
        backgroundColor: "#888",
        '@media (hover: none)': {
          backgroundColor: '#999',
        },
      }
    },
  }));

  const getGames = async ()=> {
    try {
      const gamesRes = await v_registry.getAll();
      if (gamesRes) {
        let gamesArr = [];
        gamesRes.map((game)=>{
          gamesArr.push({
            avatar: game[1].thumbnail,
            name: game[1].name,
            studio: game[1].details[3][1].Text,
            id: game[1].principal_id,
            url: game[1].details[4][1].Text,
            socials: { 
              twitter : game[1].details[0][1].Text, 
              dscvr : game[1].details[1][1].Text,
              distrikt : game[1].details[2][1].Text
            },
            status: true,
          });
        });
        setGameColls(gamesArr);
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
    getGames();
  }, []);

const columns = [
    {
      field: "avatar",
      headerName: "Avatar", 
      headerClassName: 'header',
      headerAlign: 'center',
      width: 80,
      renderCell: (params) => {
        return (
            <Button onClick={()=>{ navigate(`/registry/${params.row.id}`) }}><img src={params.row.avatar} style={{width: "100%"}} /></Button>
        );
      }
    },
    { field: 'name', headerName: 'Name', width: 100, headerClassName: 'header', headerAlign: 'center' },
    { field: 'studio', headerName: 'Studio', width: 100, headerClassName: 'header', headerAlign: 'center' },
    { field: 'id', headerName: 'Canister ID', width: 250, headerClassName: 'header', headerAlign: 'center' },
    {
      field: "url",
      headerName: "URL", 
      headerClassName: 'header',
      headerAlign: 'center',
      width: 60,
      renderCell: (params) => {
        return (
          <a href={params.row.url} target="blank">
            <LinkIcon/>
          </a>
        );
      }
    },
    {
      field: "socials",
      headerName: "Socials", 
      headerClassName: 'header',
      headerAlign: 'center',
      width: 80,
      renderCell: (params) => {
        return (
          <>
            <Grid container>
              <Grid item xs={3}>
                <a href={params.row.socials.twitter} target="blank">
                  <img src="/twitter-logo.png" style={{width: "80%"}} />
                </a>
              </Grid>
              <Grid item xs={1}></Grid>
              <Grid item xs={3}>
                <a href={params.row.socials.dscvr} target="blank">
                  <img src="/dscvr-logo.png" style={{width: "80%"}} />
                </a>
              </Grid>
              <Grid item xs={1}></Grid>
              <Grid item xs={3}>
                <a href={params.row.socials.distrikt} target="blank">
                  <img src="/distrikt-logo.png" style={{width: "80%"}} />
                </a>
              </Grid>
            </Grid>
          </>
        );
      }
    },
    {
      field: "status",
      headerName: "Status", 
      headerClassName: 'header',
      headerAlign: 'center',
      width: 57,
      renderCell: (params) => {
        return (
          <>
            <img src={params.row.status ? "/checked.png" : "/cancel.png"} style={{height: "30%"}} />
          </>
        );
      }
    },
  ];
  
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
                    value={"IC Games Registry"} 
                    label="Ic Games Registry" 
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
                    IC Games Registry
                  </Typography>
                </Grid>
                <Grid item xs={3}>
                  <TextField 
                    id="input-with-sx" 
                    value={search} 
                    label="Search" 
                    fullWidth 
                    onChange={(e)=>{
                      setSearch(e.target.value)
                    }} 
                    style={{
                      marginTop: "13%",
                      background: "#2F293E",
                      borderRadius: "15.4134px",

                    }}
                  />
                </Grid>
                <Grid item>
                    <Button 
                        variant="contained"
                        onClick={()=>{
                            getCollectionsByQuery();
                          }
                        }
                        style={{
                          color: "#FFFFFF",
                          marginTop: "70%",
                          backgroundColor: "#2F293E",
                        }}
                    >
                      <SearchIcon/>
                    </Button>
                </Grid>
            </Grid>
            <Grid 
              container 
              spacing={2} 
              style={{
                marginLeft: "20%",
                height: 500, 
                width: '60%', 
                marginTop: "2%",
              }}
            >
              <StripedDataGrid
                  rows={gameColls}
                  columns={columns}
                  pageSize={20}
                  rowsPerPageOptions={[20]}
                  sx ={{
                    border: 0,
                    backgroundColor: 'none',
                    width: "100%",
                    height: "80%",
                    '& .header': {
                      color: '#FFFFFF',
                    },
                  }}
                  getRowClassName={(params) =>
                    params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
                  }
              />
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