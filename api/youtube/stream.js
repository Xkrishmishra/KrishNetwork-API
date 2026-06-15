const { exec } = require("child_process");
const { promisify } = require("util");
const execAsync = promisify(exec);

module.exports = async (req, res) => {
  const { url, quality } = req.query;

  if (!url) {
    return res.status(400).json({
      success: false,
      Creator: "https://t.me/Krishnetwork",
      error: "url parameter required. Example: ?url=https://youtube.com/watch?v=xxx",
      optional: "quality=audio|360|480|720|1080 (default: best)"
    });
  }

  if (!url.includes("youtube.com") && !url.includes("youtu.be")) {
    return res.status(400).json({
      success: false,
      Creator: "https://t.me/Krishnetwork",
      error: "Invalid YouTube URL"
    });
  }

  let format = "best[ext=mp4]/best";
  if (quality === "audio") format = "bestaudio[ext=m4a]/bestaudio";
  else if (quality === "360") format = "best[height<=360][ext=mp4]/best[height<=360]";
  else if (quality === "480") format = "best[height<=480][ext=mp4]/best[height<=480]";
  else if (quality === "720") format = "best[height<=720][ext=mp4]/best[height<=720]";
  else if (quality === "1080") format = "best[height<=1080][ext=mp4]/best[height<=1080]";

  try {
    const { stdout: infoOut } = await execAsync(
      `yt-dlp --dump-json --no-download "${url}"`
    );
    const info = JSON.parse(infoOut.trim().split("\n")[0]);

    const { stdout: streamOut } = await execAsync(
      `yt-dlp -g --no-warnings -f "${format}" "${url}"`
    );
    const streamUrl = streamOut.trim().split("\n")[0];

    return res.json({
      success: true,
      Creator: "https://t.me/Krishnetwork",
      data: {
        id: info.id,
        title: info.title,
        channel: info.channel || info.uploader || "",
        duration: info.duration,
        duration_string: info.duration_string || "",
        view_count: info.view_count || 0,
        like_count: info.like_count || 0,
        thumbnail: info.thumbnail || "",
        upload_date: info.upload_date || "",
        description: (info.description || "").slice(0, 300),
        stream_url: streamUrl,
        quality: quality || "best",
        source: url
      }
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      Creator: "https://t.me/Krishnetwork",
      error: "Failed to fetch YouTube stream",
      details: err.message
    });
  }
};
