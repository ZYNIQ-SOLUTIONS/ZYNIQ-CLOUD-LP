#!/usr/bin/env python3
"""Generate OG image for Solutions page using PIL/Pillow"""

from PIL import Image, ImageDraw, ImageFont
import os

# Create 1200x630 image with light background
img = Image.new('RGB', (1200, 630), '#FAFAFA')
draw = ImageDraw.Draw(img)

# Draw subtle grid
grid_color = '#E0E0E0'
for x in range(0, 1200, 40):
    draw.line([(x, 0), (x, 630)], fill=grid_color, width=1)
for y in range(0, 630, 40):
    draw.line([(0, y), (1200, y)], fill=grid_color, width=1)

# Large hero card
draw.rectangle([60, 60, 640, 570], fill='#FFFFFF', outline='#E0E0E0', width=2)

# Red Z logo square
draw.rectangle([90, 90, 170, 170], fill='#EA2323')

# Try to use system fonts
try:
    font_title = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf', 48)
    font_subtitle = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf', 32)
    font_text = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf', 24)
    font_small = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf', 16)
    font_tiny = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSansMono.ttf', 11)
except:
    font_title = ImageFont.load_default()
    font_subtitle = font_title
    font_text = font_title
    font_small = font_title
    font_tiny = font_title

# Draw Z on red square
draw.text((130, 115), 'Z', fill='#FFFFFF', font=font_title, anchor='mm')

# ZYNIQ SOLUTIONS text
draw.text((90, 210), 'ZYNIQ', fill='#111111', font=font_title)
draw.text((90, 250), 'SOLUTIONS', fill='#EA2323', font=font_subtitle)

# Tagline
draw.text((90, 310), 'WE MANUFACTURE', fill='#111111', font=font_text)
draw.text((90, 345), 'SUCCESS', fill='#EA2323', font=font_text)

# Description
draw.text((90, 395), 'Your Ambition. Our Intelligence.', fill='#666666', font=font_small)
draw.text((90, 425), 'Enterprise solutions powered by', fill='#666666', font=font_small)
draw.text((90, 455), 'synthetic precision.', fill='#666666', font=font_small)

# Stats
draw.text((90, 510), '500+', fill='#EA2323', font=font_text)
draw.text((90, 538), 'COMMANDERS', fill='#999999', font=font_tiny)

draw.text((240, 510), '99.9%', fill='#EA2323', font=font_text)
draw.text((240, 538), 'SUCCESS', fill='#999999', font=font_tiny)

draw.text((400, 510), '$2B+', fill='#EA2323', font=font_text)
draw.text((400, 538), 'VALUE CREATED', fill='#999999', font=font_tiny)

# Right side cards
# Card 1 - AI Strategy
draw.rectangle([680, 60, 1140, 210], fill='#FFFFFF', outline='#E0E0E0', width=1)
draw.rectangle([700, 80, 742, 122], fill='#FFEBEB')
draw.text((760, 95), 'AI Strategy', fill='#111111', font=font_text)
draw.text((760, 120), 'Custom implementation roadmaps', fill='#666666', font=font_small)

# Card 2 - AI Agents (Red)
draw.rectangle([680, 230, 900, 395], fill='#EA2323')
draw.text((700, 275), 'AI', fill='#FFFFFF', font=font_title)
draw.text((700, 315), 'AGENTS', fill='#FFFFFF', font=font_text)
draw.text((700, 355), 'Execute complex', fill='#FFFFFF', font=font_small)
draw.text((700, 380), 'workflows autonomously', fill='#FFFFFF', font=font_small)

# Card 3 - Custom Development
draw.rectangle([920, 230, 1140, 395], fill='#FFFFFF', outline='#E0E0E0', width=1)
draw.rectangle([940, 250, 978, 288], fill='#FFEBEB')
draw.text((940, 315), 'CUSTOM DEV', fill='#111111', font=font_text)
draw.text((940, 345), 'Full-stack manufacturing', fill='#666666', font=font_small)

# Card 4 - Stats
draw.rectangle([680, 415, 1140, 570], fill='#FFFFFF', outline='#E0E0E0', width=1)
draw.text((720, 460), '24/7', fill='#111111', font=font_text)
draw.text((720, 490), 'DEPLOYMENT', fill='#999999', font=font_tiny)

draw.text((860, 460), '10+', fill='#111111', font=font_text)
draw.text((860, 490), 'INDUSTRIES', fill='#999999', font=font_tiny)

draw.text((990, 460), '100%', fill='#EA2323', font=font_text)
draw.text((990, 490), 'SECURE', fill='#999999', font=font_tiny)

# Green active dot
draw.ellipse([1086, 533, 1094, 541], fill='#00FF00')
draw.text((1100, 537), 'ACTIVE', fill='#666666', font=font_tiny)

# Domain watermark
draw.text((1140, 615), 'zyniq.solutions', fill='#999999', font=font_tiny, anchor='rt')

# Save
output_path = 'og-solutions.png'
img.save(output_path, 'PNG', quality=95)
print(f'✅ Created {output_path}')
