import 'dotenv/config'
import { searchAlbums, getPlaylistByUrl } from './func/spotify-api-module.js'
import { searchSongs } from './func/genius-api-part.js'
import { findUrl } from './func/yt-search-module.js'
import { downloadVideo } from './func/yt-dlp-part.js'

var query = "мрачные треды"
var query0 = "42"
var query1 = "5opka"

;(async () => {
    // await searchSongs(query)
    // await searchAlbums(query)
    // await getPlaylistByUrl(query)
    // await findUrl(query0, query1)
    await downloadVideo(query0, query1)
})()