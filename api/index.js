// ═══════════════════════════════════════════
//   KrishNetwork Media API
//   by Coder~Krish | @Krishnetwork
//   github.com/Xkrishmishra
// ═══════════════════════════════════════════

module.exports = (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.json({
    Creator: "https://t.me/Krishnetwork",
    Developer: "Coder~Krish | github.com/Xkrishmishra",
    message: "KrishNetwork API is live! 🔥",
    available_endpoints: {
      instagram: [
        "GET /api/instagram/stream?url=instagram_url",
        "GET /api/instagram/info?url=instagram_url"
      ],
      pinterest: [
        "GET /api/pinterest/stream?url=pinterest_url"
      ],
      spotify: [
        "GET /api/spotify/search?q=song_name",
        "GET /api/spotify/info?url=spotify_url",
        "GET /api/spotify/stream?url=spotify_url"
      ],
      tiktok: [
        "GET /api/tiktok/download?url=tiktok_url"
      ],
      twitter: [
        "GET /api/x/download?url=twitter_url"
      ],
      youtube: [
        "GET /api/youtube/stream?url=youtube_url"
      ]
    }
  });
};
