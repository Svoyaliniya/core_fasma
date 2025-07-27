import { exec } from 'child_process'
import { promisify } from 'util'
import { getCurrentOS } from './get-os.js'
import { findUrl } from './yt-search-module.js'
import { writeTags } from './node-id3-module.js'
import { getTracksFromAlbum, getTracksFromUserAlbum } from './spotify-api-module.js'
import ffmpegPath from 'ffmpeg-static'

const execAsync = promisify(exec)

export async function downloadTrack(query) {
  var url = await findUrl(query)
  if (!url) {
    url = `ytsearch:${query}`
  }

  const command = `${getCurrentOS()} -x --audio-format mp3 --ffmpeg-location "${ffmpegPath}" -o "track.%(ext)s" "${url}"`

  try {
    await execAsync(command)
    await writeTags(query)
  } catch (err) {
    console.error(err.message)
  }
}

export async function downloadAlbum(query, type) {
  let tracks = [];
  if (!type) {
    tracks = await getTracksFromAlbum(query)
  } else {
    tracks = await getTracksFromUserAlbum(query)
  }
  
  if (!tracks || !tracks.length) {
    console.log("❌ No tracks found for this album.")
    return
  }

  for (const track of tracks) {
    const trackQuery = `${track.title} - ${track.artist}`
    await downloadTrack(trackQuery)
  }
}