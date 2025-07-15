import 'dotenv/config'
import { authorize, searchMatches } from './func/spotify-api-module.js'
import { searchLyrics } from './func/genius-api-part.js'

var query = "больших сук ебатель"

;(async () => {
    await authorize()
//   await searchMatches(query)
    searchLyrics(query)
})()