import SpotifyWebApi from 'spotify-web-api-node'

export async function authorize() {
  const spotifyApi = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET
  })

  const data = await spotifyApi.clientCredentialsGrant()
  spotifyApi.setAccessToken(data.body['access_token'])
  return spotifyApi
}

export async function searchAlbums(query) {
  const spotifyApi = await authorize()
  const result = await spotifyApi.searchAlbums(query, { limit: 5 })

  result.body.albums.items.forEach((album, index) => {
    const albumName = album.name
    const artist = album.artists.map(a => a.name).join(', ')
    console.log(`${index+1}. 💿 ${albumName} — ${artist}`)
  })
}

export async function getPlaylistByUrl(url) {
  const spotifyApi = await authorize()
  const regex = /playlist\/([a-zA-Z0-9]+)/
  const match = url.match(regex)
  if (!match) {
    console.log("❌ invalid link")
    return
  }
  const playlistId = match[1]

  const data = await spotifyApi.getPlaylist(playlistId)
  const playlist = data.body

  console.log(` 💽 playlist: ${playlist.name} 👤 author: ${playlist.owner.display_name} 🎵 songs:`)
  playlist.tracks.items.forEach((item, index) => {
    const track = item.track
    const artists = track.artists.map(a => a.name).join(', ')
    console.log(`${index+1}. 🎵 ${track.name} — ${artists}`)
  })
}

export async function getTrackMetadata(query) {
  const spotify = await authorize()
  const res = await spotify.searchTracks(query, { limit: 1 })
  if (!res.body.tracks.items.length) return null

  const track = res.body.tracks.items[0]
  return {
    title: track.name,
    artist: track.artists.map(a => a.name).join(', '),
    album: track.album.name,
  }
}