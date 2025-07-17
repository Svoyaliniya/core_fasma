import { exec } from 'child_process'
import { getCurrentOS } from './get-os.js'
import { findUrl } from './yt-search-module.js'
import ffmpegPath from 'ffmpeg-static'

export async function downloadVideo(title) {
    exec(`${getCurrentOS()} -x --audio-format mp3 --ffmpeg-location "${ffmpegPath}" "${await findUrl(title)}"`, (err, stdout, stderr) => {
      if (err) {
        console.error("❌ error:", err)
      } else {
        console.log("✅ ready")
      }
  })
}


