import './App.css';
import React from 'react';

import { SearchBar } from '../SearchBar/SearchBar';
import { SearchResults } from '../SearchResults/SearchResults';
import { Playlist } from '../Playlist/Playlist';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
    this.state = {
      searchResults: [{name: 'Money', artist: 'Pink Floyd', album: 'The Wall', id: 1, uri: 'test/my/uri/1'},
                      {name: 'Karma Police', artist: 'Radiohead', album: 'OK Computer', id: 2, uri: 'test/my/uri/2'},
                      {name: 'Hotel California', artist: 'The Eagles', album: 'Hotel California', id: 3, uri: 'test/my/uri/3'}],
      playlistTracks: [],
      playlistName: '',
    }
  }

  addTrack(track) {
    let inPlaylist = false;
    let tracks = this.state.playlistTracks;
    for(let i=0; i<tracks.length; i++) {
      if(tracks[i].id === track.id) {
        inPlaylist = true;
      }
    }
    if(!inPlaylist) {
      tracks.push(track);
      this.setState({
        playlistTracks: tracks
      })
    }
  }

  removeTrack(track) {
    let inPlaylist = false;
    let tracks = this.state.playlistTracks;
    for(let i=0; i<tracks.length; i++) {
      if(tracks[i].id === track.id) {
        inPlaylist = true;
      }
    }
    if(inPlaylist) {
      let trackToRemove = tracks.indexOf(track);
      tracks.splice(trackToRemove, 1);
      this.setState({
        playlistTracks: tracks
      })
    }
  }

  updatePlaylistName(name) {
    this.setState({
      playlistName: name
    })
  }

  savePlaylist() {
    let trackURIs = [];
    let tracks = this.state.playlistTracks;
    for(let i=0; i<tracks.length; i++) {
      trackURIs.push(tracks[i].uri);
    }
    alert(trackURIs);
    /***TODO*** SAVE tracks TO SPOTIFY ACCT */
  }

  search(searchTerm) {
    console.log(searchTerm)
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
        <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
            <Playlist onRemove={this.removeTrack} playlistTracks={this.state.playlistTracks} onNameChange={this.updatePlaylistName} onSave={this.savePlaylist} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
