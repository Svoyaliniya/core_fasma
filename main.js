import 'dotenv/config'
import { searchAlbums, getPlaylistByUrl, getTracksFromAlbum } from './func/spotify-api-module.js'
import { searchSongs } from './func/genius-api-part.js'
import { findUrl } from './func/yt-search-module.js'
import { downloadTrack, downloadAlbum } from './func/yt-dlp-part.js'
import { writeTags } from './func/node-id3-module.js'

var query = "мрачные треды - темный принц"

;(async () => {
    // await searchSongs(query)
    // await searchAlbums(query)
    // await getPlaylistByUrl(query)

    // await downloadTrack(query)
    await downloadAlbum(query)
})()