import ytSearch from 'yt-search'

export async function findUrl(title, artist) {
  const searchQuery = `${title} ${artist}`
  const r = await ytSearch(searchQuery)
  const video = r.videos.length ? r.videos[0] : null

  if (!video) {
    console.log("❌ not found")
    return null
  }
  return video.url
}