import ID3Writer from 'node-id3'
import fs from 'fs'
import fetch from 'node-fetch'
import path from 'path'
import { getTrackMetadata } from './spotify-api-module.js'

export async function writeTags(query) {
  const metadata = await getTrackMetadata(query)

  const tags = {
    title: metadata.title,
    artist: metadata.artist,
    album: metadata.album
  }

  if (metadata.coverUrl) {
    try {
      const res = await fetch(metadata.coverUrl)
      const buffer = await res.arrayBuffer()
      tags.APIC = Buffer.from(buffer)
    } catch (err) {
      console.warn(err.message)
    }
  } else {
    console.warn('❗️ No cover image for track')
  }

  const success = ID3Writer.write(tags, 'track.mp3')

  const newFileName = `${tags.title}.mp3`
  const newPath = path.join(path.dirname('track.mp3'), newFileName)

  fs.renameSync('track.mp3', newPath)

  if (!success) {
    throw new Error('❌ error writing ID3 tags')
  }
}