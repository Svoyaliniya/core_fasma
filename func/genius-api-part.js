// import all required modules
import fetch from 'node-fetch'

export async function searchSongs(query) {
    /* 
    This function searches for songs on Genius using the Genius API.
    */
   
    const accessToken = process.env.GENIUS_TOKEN // The GENIUS_TOKEN is located in the .env file   
    const url = `https://api.genius.com/search?q=${encodeURIComponent(query)}`
    const res = await fetch(url, {headers: { Authorization: `Bearer ${accessToken}` }})
    
    const data = await res.json()

    const results = data.response.hits.slice(0, 10).map((hit, index) => { // slice( 0 - from which index, 10 - how many items to return)
        
        let title = hit.result.title // Title of the song
        
        if (title.includes('(')) {
            title = title.split('(')[0].trim()
        }

        const artist = hit.result.primary_artist.name // Name of the artist
        
        return {
            title,
            artist,
            index: index + 1,
        }
    })

    results.forEach(item => {
        console.log(`${item.index}. 🎵 ${item.title} — ${item.artist}`) // What will be displayed
    })

    return results // Return "console.log(`${item.index}. 🎵 ${item.title} — ${item.artist}`)"
}
