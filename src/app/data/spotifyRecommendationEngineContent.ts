export const spotifyRecommendationEngineContent = {
  overview: `Backend-first service that **generates personalised discovery playlists for Spotify users.** It aims to solve common user (and my) frustrations with new artist discovery on Spotify — where algorithmic recommendations like _Discover Weekly_ and _Daily Mix_ can feel repetitive or stale to listeners. 

The service extracts a user's top artists via the Spotify API, sources similarity data from open music databases to find similar artists, and delivers a **ready-to-play playlist directly into the user's Spotify library.**`,

  prd: `# Vision

Enable Spotify listeners to discover new music by automatically generating a playlist of recommended artists similar to the ones they already love — delivered directly into the user's Spotify library.

# Problem statement

Spotify users often enjoy discovering new music, but existing recommendation features like **Discover Weekly** and **Daily Mix** — despite being widely used — also attract criticism for becoming repetitive, lacking variety, or failing to introduce meaningful new music that fits a user's nuanced tastes. Users report that recommendations feel increasingly stale.

# Scope & Overview

This product **only includes backend functionality** — it interacts with two APIs to generate playlists:
- **Spotify API:** for reading user top artists and creating playlists.  
- **ListenBrainz (via MusicBrainz):** for finding similar artists not already on the user's top list.

The service runs as a backend process that:

1. Authenticates the user via Spotify.
2. Fetches the user's top artists.
3. Converts those artists into MusicBrainz IDs.
4. Queries ListenBrainz for similar artists.
5. Filters out artists the user already listens to.
6. Picks a representative track for each recommended artist.
7. Creates and saves a Spotify playlist in the user's library.

The output is a playlist titled  *"Recommended Artists 🎧"* that appears in the user's Spotify app.

# Key Features

### **Spotify OAuth integration**

- Secure login and permission request to read top artists and manage playlists.
- Minimal scopes to protect user privacy: \`user-top-read\`, \`playlist-modify-public\`, \`playlist-modify-private\`.

**Success criteria:**  
Users can authenticate once and playlists are generated without further user input.


### **Top artists fetch**

- Retrieve the user's top artists (configurable time range: short, medium, long term).
- Defaults to the top 20–50 artists.

**Success criteria:**  
Top artists list accurately reflects recent listening behaviour.


### **Similar artists lookup**

- Use **ListenBrainz API/MusicBrainz** to find similar artists for each top artist.
- Allow configuration of similarity strictness (e.g., "close", "medium", "exploratory").

**Success criteria:**  
Generated artist list contains artists not already in the user's listening history.


### **Playlist creation**

- For each recommended artist, fetch a *representative top track*.
- Create a playlist in the authenticated user's Spotify library automatically.

**Success criteria:**  
Playlist is visible in the Spotify app and tracks are playable immediately.



# Roadmap

- Add **genre or mood filtering** (e.g., only southern soul, only high-energy tracks).  
- Expose a simple **API endpoint** to trigger playlist generation programmatically.  
- Build a lightweight dashboard for configuring preferences (e.g., similarity strength, track popularity filters).
- Support **recurring playlist refreshes** (e.g., weekly updates)?`,
};

