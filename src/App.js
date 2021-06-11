import { useEffect, useState } from 'react';
import './App.css';
import InformationCard from './components/InformationCard';
import { Button } from '@material-ui/core';
import { capitalize } from "./components/Utilities";

function App() {
  const [info, setInfo] = useState();
  const [listFav, setListFav] = useState([]);
  const [addFav, setAddFav] = useState(false);
  const [addNewInfo, setAddNewInfo] = useState(false);
  const [showFav, setShowFav] = useState(false);
  const [loadingButton, setLoadingButton] = useState(false);

  useEffect(() => {
    fetch('https://randomuser.me/api/0.4/?randomapi')
    .then(function(response) {
      return response.json();
    }).then(function(data) {
      if (data.results[0]) {
        setInfo(data.results[0]?.user);
      }
    });
  }, [addNewInfo]);

  useEffect(() => {
    let currentStorage = localStorage.getItem('favorite');
    if (currentStorage) {
      let newStorage = JSON.parse(currentStorage);
      setListFav(newStorage);
    }
  }, [addFav]);
  const saveInfo = () => {
    setLoadingButton(true);
    let currentStorage = localStorage.getItem('favorite');
    if (currentStorage) {
      let newStorage = JSON.parse(currentStorage);
      newStorage = [...newStorage, info]
      localStorage.setItem('favorite', JSON.stringify(newStorage));
    } else {
      localStorage.setItem('favorite', JSON.stringify([info]));
    }
    document.getElementById("card")?.classList.add("rotate-left");
    setAddFav(!addFav);
    setAddNewInfo(!addNewInfo);
    setTimeout(() => {
      document.getElementById("card")?.classList.remove("rotate-left");
      setLoadingButton(false);
    }, 1000)
  }
  const nextInfo = () => {
    setLoadingButton(true);
    document.getElementById("card")?.classList.add("rotate-right");
    setAddNewInfo(!addNewInfo);
    setTimeout(() => {
      document.getElementById("card")?.classList.remove("rotate-right");
      setLoadingButton(false);
    }, 1000)
  }
  const clearStorage = () => {
    localStorage.clear();
    setListFav([]);
  }
  const showFavorite = () => {
    console.log(listFav);
    setShowFav(!showFav);
  }
  return (
    <div id="body">
      {info && <div id="card">
        <InformationCard info={info}/>
      </div>}
      <div id="button-container">
        <Button variant="contained" disabled={loadingButton} onClick={nextInfo}>Swipe Left</Button>
        <Button variant="contained" disabled={loadingButton} onClick={saveInfo}>Swipe Right</Button>
      </div>
      <div id="favorite">
        <div style={{fontSize:18, fontWeight:600, width:100, textAlign:"center"}}>
          Your Favorites
        </div>
        <div className="middle-button">
          <Button style={{marginBottom:10}} variant="contained" onClick={showFavorite}>Show</Button>
          {showFav && <Button variant="contained" onClick={clearStorage}>Clear</Button>}
        </div>
        <div>
          {showFav && listFav.filter((x) => x != null).map((fav, index) => 
            <div className="favorite-bar" key={index}>
              {capitalize(fav.name?.first)} {capitalize(fav.name?.last)} - {fav.gender} - {capitalize(fav.phone)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
