const { exec } = require("child_process");
const { promisify } = require("util");
const execAsync = promisify(exec);

module.exports = async (req, res) => {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({
      success: false,
      Creator: "https://t.me/Krishnetwork",
      error: "url parameter required. Example: ?url=https://pinterest.com/pin/xxx/"
    });
  }

  if (!url.includes("pinterest.com") && !url.includes("pin.it")) {
    return res.status(400).json({
      success: false,
      Creator: "https://t.me/Krishnetwork",
      error: "Invalid Pinterest URL"
    });
  }

  try {
    const { stdout } = await execAsync(
      `yt-dlp -g --no-warnings -f "best[ext=mp4]/best" "${url}"`
    );

    const streamUrl = stdout.trim().split("\n")[0];

    return res.json({
      success: true,
      Creator: "https://t.me/Krishnetwork",
      stream_url: streamUrl,
      source: url
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      Creator: "https://t.me/Krishnetwork",
      error: "Failed to get Pinterest stream",
      details: err.message
    });
  }
};
