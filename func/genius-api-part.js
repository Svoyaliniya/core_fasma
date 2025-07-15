import fetch from 'node-fetch'

export async function searchLyrics(query) {
  const accessToken = process.env.GENIUS_TOKEN
  const url = `https://api.genius.com/search?q=${encodeURIComponent(query)}`

  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${accessToken}` }
  })
  const data = await res.json()

  data.response.hits.forEach((hit, index) => {
    console.log(`${index+1}. ${hit.result.full_title} — ${hit.result.url}`)
  })
}