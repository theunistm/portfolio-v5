#!/usr/bin/env node

/**
 * Generate poster images (JPG) from video first frames
 * Extracts frame at 0.1s from each .webm video in /public/flows/videos
 * Saves as .jpg alongside the video
 * 
 * Requirements: ffmpeg must be installed
 * Run: node scripts/generate-video-posters.js
 */

import { exec } from 'child_process';
import { promisify } from 'util';
import { readdir, stat, access } from 'fs/promises';
import { join, dirname, basename, extname } from 'path';
import { fileURLToPath } from 'url';

const execAsync = promisify(exec);
const __dirname = dirname(fileURLToPath(import.meta.url));

// Configuration
const FLOWS_DIR = join(__dirname, '..', 'public', 'flows', 'videos');
const FRAME_TIME = '0.1'; // Extract frame at 0.1 seconds
const QUALITY = '2'; // JPEG quality (2-31, lower is better)

/**
 * Check if ffmpeg is installed
 */
async function checkFFmpeg() {
  try {
    await execAsync('ffmpeg -version');
    return true;
  } catch {
    console.error('❌ ffmpeg not found. Please install ffmpeg:');
    console.error('   macOS:  brew install ffmpeg');
    console.error('   Ubuntu: sudo apt-get install ffmpeg');
    console.error('   Windows: choco install ffmpeg');
    return false;
  }
}

/**
 * Recursively find all .webm files
 */
async function findVideos(dir) {
  const videos = [];
  
  try {
    const entries = await readdir(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = join(dir, entry.name);
      
      if (entry.isDirectory()) {
        videos.push(...await findVideos(fullPath));
      } else if (entry.isFile() && extname(entry.name) === '.webm') {
        videos.push(fullPath);
      }
    }
  } catch (err) {
    console.error(`Error reading directory ${dir}:`, err.message);
  }
  
  return videos;
}

/**
 * Generate poster image from video
 */
async function generatePoster(videoPath) {
  const dir = dirname(videoPath);
  const name = basename(videoPath, extname(videoPath));
  const posterPath = join(dir, `${name}.jpg`);
  
  // Check if poster already exists
  try {
    await access(posterPath);
    console.log(`⏭️  Skipping ${name}.jpg (already exists)`);
    return { success: true, skipped: true };
  } catch {
    // Poster doesn't exist, generate it
  }
  
  try {
    // Extract frame at 0.1s, scale to maintain aspect ratio
    const command = `ffmpeg -ss ${FRAME_TIME} -i "${videoPath}" -vframes 1 -q:v ${QUALITY} "${posterPath}" -y`;
    
    await execAsync(command, { stdio: 'pipe' });
    console.log(`✅ Generated ${name}.jpg`);
    return { success: true, skipped: false };
  } catch (err) {
    console.error(`❌ Failed to generate poster for ${name}.webm:`, err.message);
    return { success: false, skipped: false };
  }
}

/**
 * Main execution
 */
async function main() {
  console.log('🎬 Video Poster Generator\n');
  
  // Check ffmpeg
  const hasFFmpeg = await checkFFmpeg();
  if (!hasFFmpeg) {
    process.exit(1);
  }
  
  console.log(`\n📂 Scanning ${FLOWS_DIR}...\n`);
  
  // Find all videos
  const videos = await findVideos(FLOWS_DIR);
  
  if (videos.length === 0) {
    console.log('⚠️  No .webm videos found');
    return;
  }
  
  console.log(`Found ${videos.length} video(s)\n`);
  
  // Generate posters
  let generated = 0;
  let skipped = 0;
  let failed = 0;
  
  for (const video of videos) {
    const result = await generatePoster(video);
    if (result.success) {
      if (result.skipped) {
        skipped++;
      } else {
        generated++;
      }
    } else {
      failed++;
    }
  }
  
  // Summary
  console.log('\n📊 Summary:');
  console.log(`   Generated: ${generated}`);
  console.log(`   Skipped:   ${skipped}`);
  console.log(`   Failed:    ${failed}`);
  console.log(`   Total:     ${videos.length}`);
  
  if (failed > 0) {
    process.exit(1);
  }
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
