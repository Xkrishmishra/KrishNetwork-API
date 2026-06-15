const { exec } = require("child_process");
const { promisify } = require("util");
const execAsync = promisify(exec);

module.exports = async (req, res) => {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({
      success: false,
      Creator: "https://t.me/Krishnetwork",
      error: "url parameter required. Example: ?url=https://twitter.com/user/status/xxx"
    });
  }

  if (!url.includes("twitter.com") && !url.includes("x.com") && !url.includes("t.co")) {
    return res.status(400).json({
      success: false,
      Creator: "https://t.me/Krishnetwork",
      error: "Invalid Twitter/X URL"
    });
  }

  try {
    const { stdout } = await execAsync(
      `yt-dlp --dump-json --no-download "${url}"`
    );
    const info = JSON.parse(stdout.trim().split("\n")[0]);

    const { stdout: streamOut } = await execAsync(
      `yt-dlp -g --no-warnings -f "best[ext=mp4]/best" "${url}"`
    );
    const streamUrl = streamOut.trim().split("\n")[0];

    return res.json({
      success: true,
      Creator: "https://t.me/Krishnetwork",
      data: {
        id: info.id,
        title: info.title || info.description || "Twitter/X Video",
        uploader: info.uploader || "",
        uploader_id: info.uploader_id || "",
        thumbnail: info.thumbnail || "",
        duration: info.duration || 0,
        view_count: info.view_count || 0,
        like_count: info.like_count || 0,
        retweet_count: info.repost_count || 0,
        download_url: streamUrl,
        source: url
      }
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      Creator: "https://t.me/Krishnetwork",
      error: "Failed to fetch Twitter/X video",
      details: err.message
    });
  }
};
