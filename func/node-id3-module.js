// import all required modules
import ID3Writer from 'node-id3'
import fs from 'fs'
import fetch from 'node-fetch'
import path from 'path'
import { getTrackMetadata } from './spotify-api-module.js'

export async function writeTags(query) {
  /* 
  This function writes ID3 tags to the specified audio file.
  */

  const metadata = await getTrackMetadata(query) // Get metadata for a track using Spotify_API

  const tags = {
    title: metadata.title, // Title of the track
    artist: metadata.artist, // Artist of the track
    album: metadata.album // Album of the track
  }

  if (metadata.coverUrl) {
    try {
      const res = await fetch(metadata.coverUrl)
      const buffer = await res.arrayBuffer()
      tags.APIC = Buffer.from(buffer) // Cover image in Buffer format
    } catch (err) {
      console.warn(err.message)
    }
  } else {
    console.warn('❗️No cover image for track')
  }

  const success = ID3Writer.write(tags, 'track.mp3') // Write ID3 tags to the file 'track.mp3'
  fs.renameSync('track.mp3', path.join(path.dirname('track.mp3'), `${tags.title}.mp3`)) // Rename the file to the track title

  if (!success) {
    throw new Error('❌Error writing ID3 tags')
  } else {
    return 1 // Return 1 if tags were successfully written
  }
}