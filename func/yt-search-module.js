// import all required modules
import ytSearch from 'yt-search'

export async function findUrl(title, artist) {
  /* 
  This function searches for a YouTube video URL based on the track title and artist.
  */

  const searchQuery = `${title} ${artist}` // Search query

  const res = await ytSearch(searchQuery)
  const video = res.videos.length ? res.videos[0] : null
  if (!video) {
    console.log("❌ Not found")
    return null
  }

  return video.url // Return the URL of the first video found
}