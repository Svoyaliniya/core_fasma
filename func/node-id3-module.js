import ID3Writer from 'node-id3'
import { getTrackMetadata } from './spotify-api-module.js'

export function writeTags(mp3Path, metadata) {
  return new Promise((resolve, reject) => {
    const tags = {
      title: metadata.title,
      artist: metadata.artist,
      album: metadata.album,
    }

    const success = ID3Writer.write(tags, mp3Path)
    if (!success) reject("не удалось записать теги")
    else resolve()
  })
}