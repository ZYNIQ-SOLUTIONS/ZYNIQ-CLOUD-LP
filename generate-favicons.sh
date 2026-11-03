#!/bin/bash

# ZYNIQ Favicon Generation Script
# This script generates all required favicon sizes from the brand logo

set -e

SOURCE_IMAGE="../brand_assets/ZYNIQ_SIGN_LOGO_RED.png"
OUTPUT_DIR="./public"

echo "🔴 ZYNIQ Favicon Generator"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Check if source image exists
if [ ! -f "$SOURCE_IMAGE" ]; then
    echo "❌ Error: Source image not found at $SOURCE_IMAGE"
    exit 1
fi

# Check if ImageMagick is installed
if ! command -v convert &> /dev/null; then
    echo "❌ Error: ImageMagick is not installed"
    echo "Install with: sudo apt-get install imagemagick (Ubuntu/Debian)"
    echo "           or: brew install imagemagick (macOS)"
    exit 1
fi

echo "✅ Source image found"
echo "✅ ImageMagick installed"
echo ""
echo "Generating favicons..."

# Create output directory if it doesn't exist
mkdir -p "$OUTPUT_DIR"

# Generate favicon.ico (multi-resolution)
echo "→ Generating favicon.ico (16x16, 32x32, 48x48)..."
convert "$SOURCE_IMAGE" -resize 16x16 -background none -gravity center -extent 16x16 /tmp/favicon-16.png
convert "$SOURCE_IMAGE" -resize 32x32 -background none -gravity center -extent 32x32 /tmp/favicon-32.png
convert "$SOURCE_IMAGE" -resize 48x48 -background none -gravity center -extent 48x48 /tmp/favicon-48.png
convert /tmp/favicon-16.png /tmp/favicon-32.png /tmp/favicon-48.png "$OUTPUT_DIR/favicon.ico"
rm /tmp/favicon-16.png /tmp/favicon-32.png /tmp/favicon-48.png

# Generate PNG favicons
echo "→ Generating favicon-16x16.png..."
convert "$SOURCE_IMAGE" -resize 16x16 -background none -gravity center -extent 16x16 "$OUTPUT_DIR/favicon-16x16.png"

echo "→ Generating favicon-32x32.png..."
convert "$SOURCE_IMAGE" -resize 32x32 -background none -gravity center -extent 32x32 "$OUTPUT_DIR/favicon-32x32.png"

# Generate Apple Touch Icon
echo "→ Generating apple-touch-icon.png (180x180)..."
convert "$SOURCE_IMAGE" -resize 180x180 -background none -gravity center -extent 180x180 "$OUTPUT_DIR/apple-touch-icon.png"

# Generate Android Chrome icons
echo "→ Generating android-chrome-192x192.png..."
convert "$SOURCE_IMAGE" -resize 192x192 -background none -gravity center -extent 192x192 "$OUTPUT_DIR/android-chrome-192x192.png"

echo "→ Generating android-chrome-512x512.png..."
convert "$SOURCE_IMAGE" -resize 512x512 -background none -gravity center -extent 512x512 "$OUTPUT_DIR/android-chrome-512x512.png"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ All favicons generated successfully!"
echo ""
echo "Generated files:"
echo "  • favicon.ico (multi-resolution)"
echo "  • favicon-16x16.png"
echo "  • favicon-32x32.png"
echo "  • apple-touch-icon.png"
echo "  • android-chrome-192x192.png"
echo "  • android-chrome-512x512.png"
echo ""
echo "Location: $OUTPUT_DIR"
