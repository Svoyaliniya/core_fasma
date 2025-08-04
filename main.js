// main.js — Entry point of the project

// Load environment variables from .env file
import 'dotenv/config'

// Import required functions from local modules
import { searchSongs } from './func/genius-api-part.js'
import { searchAlbums, getPlaylistByUrl, getTracksFromAlbum } from './func/spotify-api-module.js'
import { downloadTrack, downloadAlbum } from './func/yt-dlp-part.js'

// Your search query (can be artist, song, album, or playlist URL)
const query = "Enter your search query here"

;(async () => {
    // Uncomment the lines below to test different functionalities:

    // await searchSongs(query)              // Search for songs
    // await searchAlbums(query)             // Search for albums
    // await getTracksFromAlbum(query)       // Get all tracks
    // await getPlaylistByUrl(query, 1)      // Get playlist details from a Spotify URL

    await downloadTrack(query)               // Download a single track

    // await downloadAlbum(query, false)     // Download all tracks from an album
    // await downloadAlbum(query, true)      // Download all tracks from a Spotify playlist
})()
