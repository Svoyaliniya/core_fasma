import { exec } from 'child_process'
import { getCurrentOS } from './get-os.js'
import { findUrl } from './yt-search-module.js'

export async function downloadVideo(title, artist) {
    exec(`${getCurrentOS()} -x --audio-format mp3 "${await findUrl(title, artist)}"`, (err, stdout, stderr) => {
      if (err) {
        console.error("❌ error:", err)
      } else {
        console.log("✅ result:", stdout)
      }
    })
}