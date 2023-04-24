import * as React from 'react';
import { useEffect, useState } from 'react';
import { 
  Grid, 
  Button, 
  Typography, 
  Backdrop, 
  CircularProgress, 
  TextField,
  Paper, 
  Checkbox, 
  FormControl,
  InputLabel, Select,
  MenuItem
} from '@mui/material';
import { useNavigate, useParams } from "react-router-dom";
import { Principal } from '@dfinity/principal';
import { useCanister } from "@connect2ic/react"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';

export default function CollectionForm() {
  const navigate = useNavigate();
  const [ canisterId, setCanisterId ] = useState('');
  const [ name, setName ] = useState('');
  const [ description, setDescription ] = useState('');
  const [ distrikt, setDistrikt ] = useState('');
  const [ dscvr, setDscvr ] = useState('');
  const [ twitter, setTwitter ] = useState('');
  const [ studio, setStudio ] = useState('');
  const [ url, setUrl ] = useState('');
  const [ connected, setConnected ] = useState(false);
  const [ loading, setLoading ] = useState(false);
  const [status, setStatus] = useState("Active");
  const { id } = useParams();
  const [ avatarUrl, setAvatarUrl ] = useState('');
  const [registry] = useCanister("registry");

  useEffect(() => {
    if(id){
        getGame(id); 
    };
  }, []);
  
  const getGame = async (id)=> {
    try {
      const gameRes = await registry.get(Principal.fromText(id));

      if (gameRes) {
        let gameData = {
            avatar: gameRes[0].thumbnail,
            name: gameRes[0].name,
            description: gameRes[0].description,
            studio: gameRes[0].details[3][1].Text,
            id: gameRes[0].principal_id,
            url: gameRes[0].details[4][1].Text,
            socials: { 
              twitter : gameRes[0].details[0][1].Text, 
              dscvr : gameRes[0].details[1][1].Text,
              distrikt : gameRes[0].details[2][1].Text
            },
            status: gameRes[0].details.length >= 6 ? gameRes[0].details[5][1].Text : "Active",
          };
          
          setAvatarUrl(gameData.avatar);
          setCanisterId(gameData.id.toText());
          setDescription(gameData.description);
          setDistrikt(gameData.socials.distrikt);
          setDscvr(gameData.socials.dscvr);
          setName(gameData.name);
          setStatus(gameData.status);
          setStudio(gameData.studio);
          setTwitter(gameData.socials.twitter);
          setUrl(gameData.url);
      } else {
        window.alert("No Game found, please try again.");
        navigate("/games");
      };
        setLoading(false);
    } catch (e) {
      console.log(e);
      window.alert("Unexpected error. Please try again and report it.");
    };
  };

  
  const statusHandleChange = (event) => {
    setStatus(event.target.value);
  };

  const addNewGame = async ()=> {
    setLoading(true);
    const game = {
        thumbnail: avatarUrl,
        name: name,
        description: description,
        principal_id: Principal.fromText(canisterId),
        frontend: [],
        details: [
            ["Twitter", { Text: twitter }],
            ["DSCVR", { Text: dscvr }],
            ["Distrikt", { Text: distrikt }],
            ["Studio", { Text: studio }],
            ["Url", { Text: url }],
            ["Status", { Text: status }],
        ]
    };

    try {
      console.log("registry", registry);
      const addNewGameRes = await registry.add(game);
      
      console.log("addNewGameRes", addNewGameRes);

      if ("ok" in addNewGameRes) {
        setLoading(false);
        navigate('/games');
      } else {
        setLoading(false);
        window.alert("Fail. Try again and report it.");
      };
    } catch (e) {
      setLoading(false);
      window.alert("Unexpected error. Please try again and report it.");
      console.log(e);
    };
  };

  const updateGame = async ()=> {
    setLoading(true);
    
    const game = {
        thumbnail: avatarUrl,
        name: name,
        description: description,
        principal_id: Principal.fromText(canisterId),
        frontend: [],
        details: [
            ["Twitter", { Text: twitter }],
            ["DSCVR", { Text: dscvr }],
            ["Distrikt", { Text: distrikt }],
            ["Studio", { Text: studio }],
            ["Url", { Text: url }],
            ["Status", { Text: status }],
        ]
    };

    try {
        const updateGameRes = await registry.update(game);
        console.log("updateGameRes", updateGameRes);
      
        if ("ok" in updateGameRes) {
            setLoading(false);
            navigate('/games');
        } else {
            setLoading(false);
            window.alert("Fail. Please try again and report it.");
        };
        } catch (e) {
        setLoading(false);
        console.log(e);
        window.alert("Unexpected error. Please try again and report it.");
        };
  };

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
      
      <IconButton style={{marginLeft:10, marginTop: 10}} onClick={()=>{navigate(-1)}} aria-label="delete">
          <ArrowBackIcon />
      </IconButton>
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
              sx={{ color: '#000', zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={open}
            >
              <CircularProgress color="inherit" />
            </Backdrop>
        }
        <Grid container spacing={2} justifyContent="center">
          <Grid item container xs={8} style={{marginTop: "7vh"}}>
                  <Grid item container xs={12} spacing={3} style={{ padding: 30}}>
                      <Grid item xs={6}>
                          <TextField id="input-with-sx" label="Avatar URL" variant="outlined" sx={{ fieldset: { borderColor: "#fff" } }}  InputLabelProps={{ style: { color: "#fff" } }} inputProps={{ style: { color: "#fff" } }} value={avatarUrl} fullWidth onChange={(e)=>{setAvatarUrl(e.target.value)}} />
                      </Grid>
                      <Grid item xs={6}>
                          <TextField id="input-with-sx" label="Name" variant="outlined" sx={{ fieldset: { borderColor: "#fff" } }}  InputLabelProps={{ style: { color: "#fff" } }} inputProps={{ style: { color: "#fff" } }} value={name} fullWidth onChange={(e)=>{setName(e.target.value)}} />
                      </Grid>
                      <Grid item xs={6}>
                          <TextField id="input-with-sx" label="Description" variant="outlined" sx={{ fieldset: { borderColor: "#fff" } }}  InputLabelProps={{ style: { color: "#fff" } }} inputProps={{ style: { color: "#fff" } }} value={description} fullWidth onChange={(e)=>{setDescription(e.target.value)}} />
                      </Grid>
                      <Grid item xs={6}>
                          <TextField id="input-with-sx" label="Studio" variant="outlined" sx={{ fieldset: { borderColor: "#fff" } }}  InputLabelProps={{ style: { color: "#fff" } }} inputProps={{ style: { color: "#fff" } }} value={studio} fullWidth onChange={(e)=>{setStudio(e.target.value)}} />
                      </Grid>
                      <Grid item xs={6}>
                          <TextField id="input-with-sx" label="Canister Id" variant="outlined" sx={{ fieldset: { borderColor: "#fff" } }}  InputLabelProps={{ style: { color: "#fff" } }} inputProps={{ style: { color: "#fff" } }} value={canisterId} fullWidth onChange={(e)=>{setCanisterId(e.target.value)}} />
                      </Grid>
                      <Grid item xs={6}>
                          <TextField id="input-with-sx" label="DSCVR" variant="outlined" sx={{ fieldset: { borderColor: "#fff" } }}  InputLabelProps={{ style: { color: "#fff" } }} inputProps={{ style: { color: "#fff" } }} value={dscvr} fullWidth onChange={(e)=>{setDscvr(e.target.value)}} />
                      </Grid>
                      <Grid item xs={6}>
                          <TextField id="input-with-sx" label="Distrikt" variant="outlined" sx={{ fieldset: { borderColor: "#fff" } }}  InputLabelProps={{ style: { color: "#fff" } }} inputProps={{ style: { color: "#fff" } }} value={distrikt} fullWidth onChange={(e)=>{setDistrikt(e.target.value)}} />
                      </Grid>
                      <Grid item xs={6}>
                          <TextField id="input-with-sx" label="Twitter" variant="outlined" sx={{ fieldset: { borderColor: "#fff" } }}  InputLabelProps={{ style: { color: "#fff" } }} inputProps={{ style: { color: "#fff" } }} value={twitter} fullWidth onChange={(e)=>{setTwitter(e.target.value)}} />
                      </Grid>
                      <Grid item xs={6}>
                          <TextField id="input-with-sx" label="Url" variant="outlined" sx={{ fieldset: { borderColor: "#fff" } }}  InputLabelProps={{ style: { color: "#fff" } }} inputProps={{ style: { color: "#fff" } }} value={url} fullWidth onChange={(e)=>{setUrl(e.target.value)}} />
                      </Grid>
                      <Grid item xs={6}>
                          <FormControl fullWidth>
                          <InputLabel 
                            id="demo-simple-select-label"
                          >Status</InputLabel>
                          <Select
                              sx={{ color: "#fff", fieldset: { borderColor: "#fff", color: "#fff" } }}  
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              value={status}
                              label="Status"
                              onChange={statusHandleChange}
                          >
                              <MenuItem default value={""}></MenuItem>
                              <MenuItem value={"Active"}>Active</MenuItem>
                              <MenuItem value={'Inactive'}>Inactive</MenuItem>
                          </Select>
                          </FormControl>
                      </Grid>
                  </Grid>
                <Grid item style={{ position: "absolute", bottom: 110, right: 120 }}>
                    <Button
                        variant="contained"
                        onClick={()=>{
                          !id ?
                          addNewGame() :
                          updateGame()
                        }
                    }>
                        {!id ? "Add" : "Update"}
                    </Button>
                </Grid>
          </Grid>
          <Grid item xs={12} style={{ position: "absolute", bottom: 10}}>
            <Grid item xs={12} textAlign="center">
              <Typography>
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};