import 'dotenv/config'
import { authorize, searchMatches } from './func/spotify-api-module.js'

var query = "5opka"

;(async () => {
  await authorize()
  await searchMatches(query)
})()