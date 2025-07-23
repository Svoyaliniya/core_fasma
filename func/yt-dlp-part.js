import { exec } from 'child_process'
import { promisify } from 'util'
import { getCurrentOS } from './get-os.js'
import { findUrl } from './yt-search-module.js'
import { writeTags } from './node-id3-module.js'
import ffmpegPath from 'ffmpeg-static'

const execAsync = promisify(exec)

export async function downloadVideo(query) {
  const url = await findUrl(query)
  const command = `${getCurrentOS()} -x --audio-format mp3 --ffmpeg-location "${ffmpegPath}" -o "track.%(ext)s" "${url}"`

  try {
    await execAsync(command)
    await writeTags(query)
  } catch (err) {
    console.error(err.message)
  }
}



