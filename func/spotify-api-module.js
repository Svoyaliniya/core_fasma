// import all required modules
import SpotifyWebApi from 'spotify-web-api-node'

async function authorize() {
  /* 
  This function authorizes the Spotify API using client credentials.
  */

  const spotifyApi = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_CLIENT_ID, // Your Spotify client ID
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET // Your Spotify client secret
  })
  const data = await spotifyApi.clientCredentialsGrant()
  spotifyApi.setAccessToken(data.body['access_token'])
  return spotifyApi // Return the authorized Spotify API instance
}

export async function searchAlbums(query) {
  /* 
  This function searches for albums based on a query string using Spotify_API.
  */

  const spotifyApi = await authorize() // Authorize the Spotify API

  const result = await spotifyApi.searchAlbums(query, { limit: 10 }) // "limit: 10" - Limit the number of results to 10

  result.body.albums.items.forEach((album, index) => {
    const albumName = album.name
    const artist = album.artists.map(a => a.name).join(', ')
    console.log(`${index+1}. 💿 ${albumName} — ${artist}`) // What will be displayed
  })
}

export async function getPlaylistByUrl(url) {
  /* 
  This function finds a playlist by URL. 
  */

  const spotifyApi = await authorize() // Authorize the Spotify API

  const regex = /playlist\/([a-zA-Z0-9]+)/
  const match = url.match(regex)
  if (!match) {
    console.log("❌Invalid link")
    return
  }

  const playlistId = match[1]
  const data = await spotifyApi.getPlaylist(playlistId)

  const playlist = data.body // Get the playlist data (playlist name, owner, tracks, etc.)

  console.log(`💽 playlist: ${playlist.name} 👤 author: ${playlist.owner.display_name} 🎵 songs:`) // What will be displayed
  playlist.tracks.items.forEach((item, index) => {  
    const track = item.track
    const artists = track.artists.map(a => a.name).join(', ')
    console.log(`${index+1}. 🎵 ${track.name} — ${artists}`)
  })

  return playlist, 1 // Return the playlist data, 1 - if the playlist is found
}

export async function getTrackMetadata(query) {
  /* 
  This function gets metadata for a track using Spotify_API.
  */

  const spotifyApi = await authorize() // Authorize the Spotify API

  const res = await spotifyApi.searchTracks(query, { limit: 1 })
  if (!res.body.tracks.items.length) return null
  const track = res.body.tracks.items[0]
  
  const metadata = { // Metadata body
    title: track.name,
    artist: track.artists.map(a => a.name).join(', '),
    album: track.album.name,
    coverUrl: track.album.images?.[0]?.url || null,
  }
  
  return metadata // Return the metadata (title, artist, album, coverUrl)
}

export async function getTracksFromAlbum(query) {
  /* 
  This function retrieves tracks from an album using Spotify_API.
  */

  const spotifyApi = await authorize() // Authorize the Spotify API

  const res = await spotifyApi.searchAlbums(query, { limit: 1 })
  if (!res.body.albums.items.length) {
    console.log('❌Album not found')
    return []
  }

  const albumId = res.body.albums.items[0].id
  const album = (await spotify.getAlbum(albumId)).body

  const artist = album.artists.map(a => a.name).join(', ') // Artist name
  const tracks = album.tracks.items // Tracks in the album

  return tracks.map(track => ({title: track.name, artist: artist, album: album.name,})) // Return an array of track objects with title, artist, and album
}

export async function getTracksFromUserAlbum(url) {
  /*
  This function retrieves tracks from a user's album using Spotify_API.

  The getPlaylistByUrl function described above is used.
  */

  const playlist = await getPlaylistByUrl(url, 0) // Get the playlist by URL

  const tracks = playlist.tracks.items 
    
    return tracks.map(item => ({ title: item.track.name, artist: item.track.artists.map(a => a.name).join(', '), album: item.track.album.name })) // Return an array of track objects with title, artist, and album

  
}