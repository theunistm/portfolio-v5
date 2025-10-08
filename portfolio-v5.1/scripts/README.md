# Video Poster Generation

## Overview

This script automatically generates poster images (JPG thumbnails) from the first frame of each video file. Poster images eliminate the blank flash when videos load, providing instant visual feedback.

## Requirements

- **ffmpeg** must be installed on your system

### Install ffmpeg

```bash
# macOS
brew install ffmpeg

# Ubuntu/Debian
sudo apt-get install ffmpeg

# Windows (with Chocolatey)
choco install ffmpeg
```

## Usage

### Manual Generation

Generate poster images for all videos:

```bash
npm run generate-posters
```

### Automatic Generation

Posters are automatically generated before each build via the `prebuild` script:

```bash
npm run build  # Generates posters, then builds
```

## How It Works

1. **Scans** `/public/flows/videos` recursively for all `.webm` files
2. **Extracts** a frame at 0.1 seconds from each video
3. **Saves** as `.jpg` with the same filename alongside the video
4. **Skips** existing posters to avoid regeneration

### Example

```
/public/flows/videos/
├── project-name/
│   ├── 01-flow-name.webm
│   ├── 01-flow-name.mp4
│   └── 01-flow-name.jpg   ← Generated poster
```

## Video Component Behavior

### Desktop (PhonePreview.tsx)
- Shows poster instantly on hover
- Waits for `canplay` event before starting playback
- No blank flash between poster and video

### Mobile (PhonePreviewModal.tsx)
- Shows poster when modal opens
- Waits for video to be ready before playing
- Smooth transition from poster to video

### Browser Support
- **Chrome/Firefox/Edge**: Loads `.webm` with poster
- **Safari (macOS/iOS)**: Loads `.mp4` fallback with poster

## Configuration

Edit `generate-video-posters.js` to customize:

```javascript
const FRAME_TIME = '0.1';  // Extract frame at 0.1s
const QUALITY = '2';       // JPEG quality (2-31, lower = better)
```

## Troubleshooting

### "ffmpeg not found"
Install ffmpeg using the commands above

### "Permission denied"
Make the script executable:
```bash
chmod +x scripts/generate-video-posters.js
```

### Posters look incorrect
- Adjust `FRAME_TIME` to capture a better frame
- Decrease `QUALITY` for higher image quality
- Re-run: `npm run generate-posters`

### Videos still flash
- Ensure poster `.jpg` files exist alongside videos
- Check browser console for 404 errors
- Verify poster paths match video paths
