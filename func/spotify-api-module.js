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

export async function searchMatches(query) {
  const spotifyApi = await authorize()
  const result = await spotifyApi.searchTracks(query, { limit: 15 })
  console.log(`🔍 results for "${query}":`)
  result.body.tracks.items.forEach(track => {
    const artists = track.artists.map(a => a.name).join(', ')
    console.log(`🎵 ${track.name} — ${artists}`)
  })
}