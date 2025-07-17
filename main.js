import 'dotenv/config'
import { searchAlbums, getPlaylistByUrl } from './func/spotify-api-module.js'
import { searchSongs } from './func/genius-api-part.js'
import { findUrl } from './func/yt-search-module.js'
import { downloadVideo } from './func/yt-dlp-part.js'

var query = "мрачные треды автозаправка"

;(async () => {
    // await searchSongs(query)
    // await searchAlbums(query)
    // await getPlaylistByUrl(query)
    await downloadVideo(query)
})()