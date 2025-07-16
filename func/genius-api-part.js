import fetch from 'node-fetch'

export async function searchSong(query) {
    const accessToken = process.env.GENIUS_TOKEN
    const url = `https://api.genius.com/search?q=${encodeURIComponent(query)}`

    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${accessToken}` }
    })

    const data = await res.json()
    const results = data.response.hits.slice(0, 5).map((hit, index) => {
        let title = hit.result.title
        if (title.includes('(')) {
            title = title.split('(')[0].trim()
        }
        const artist = hit.result.primary_artist.name
        return {
            title,
            artist,
            index: index + 1,
        }
    })

    results.forEach(item => {
        console.log(`${item.index}. 🎵 ${item.title} — ${item.artist}`)
    })

    return results
}
