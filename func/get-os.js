import os from 'os'

export function getCurrentOS() {
  const platform = os.platform()
  if (platform === 'win32') {
    return './yt-dlp.exe'
  } else {
    return './yt-dlp_macos'
  }
}