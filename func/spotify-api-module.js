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