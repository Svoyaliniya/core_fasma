import 'dotenv/config'
import { authorize, searchAlbums } from './func/spotify-api-module.js'
import { searchTracks } from './func/genius-api-part.js'

var query = "мрачные треды"

;(async () => {
    await authorize()
    searchSong(query)
    await searchAlbums(query)
})()