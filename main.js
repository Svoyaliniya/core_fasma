import 'dotenv/config'
import { searchAlbums, getPlaylistByUrl, getTracksFromAlbum } from './func/spotify-api-module.js'
import { searchSongs } from './func/genius-api-part.js'
import { findUrl } from './func/yt-search-module.js'
import { downloadTrack, downloadAlbum } from './func/yt-dlp-part.js'
import { writeTags } from './func/node-id3-module.js'

const query = "темный принц мрачные треды"
//https://open.spotify.com/playlist/5pAgEdDs0Yhg6BGAvNDFxm?si=VqIVO_mrQOi1leXRqUWUTg

;(async () => {
    // await searchSongs(query)
    // await searchAlbums(query)
    // await getPlaylistByUrl(query, 1)

    // await downloadTrack(query)
    await downloadAlbum(query, false) // false - install album, true - install playlist
})()