const path = require('path');

// Portable relative paths
const METADATA_PATH = path.join(__dirname, '../data/metadata.json');
const EMOJI_SRC_PATH = path.join(__dirname, '../data/emoji.md');
const TARGET_HTML_PATH = path.join(__dirname, '../index.html');

// Load data
const metadata = JSON.parse(fs.readFileSync(METADATA_PATH, 'utf8'));
const emojiText = fs.readFileSync(EMOJI_SRC_PATH, 'utf8');

// Build emoji map
const emojiMap = {};
metadata.forEach(item => {
    emojiMap[item.emoji] = item;
});

// Sort by length to match multi-char emojis first
const sortedChars = Object.keys(emojiMap).sort((a, b) => b.length - a.length);

// 1. Identify all emojis in the text
const foundEmojis = [];
let remaining = emojiText;
while (remaining.length > 0) {
    let match = false;
    for (const char of sortedChars) {
        if (remaining.startsWith(char)) {
            foundEmojis.push(emojiMap[char]);
            remaining = remaining.substring(char.length);
            match = true;
            break;
        }
    }
    if (!match) remaining = remaining.substring(1);
}

// 2. Filter: Remove duplicates and skin-tone variations
const uniqueSet = new Set();
const finalEmojis = [];

const skinToneRegex = /[\u{1F3FB}-\u{1F3FF}]/u;

for (const e of foundEmojis) {
    // Skip if it contains a skin tone modifier
    if (skinToneRegex.test(e.emoji)) continue;
    
    // Skip if we've already seen this exact emoji character
    if (uniqueSet.has(e.emoji)) continue;
    
    uniqueSet.add(e.emoji);
    finalEmojis.push(e);
}

console.log(`Found ${finalEmojis.length} unique yellow emojis.`);

// 3. Generate HTML
const cardsHtml = finalEmojis.map(item => `
        <div class="emoji-card" data-emoji="${item.emoji}" data-search="${item.description.replace(/"/g, '&quot;')} ${item.aliases.join(' ')} ${item.tags.join(' ')}">
            <div class="emoji-char">${item.emoji}</div>
            <div class="emoji-name">${item.description}</div>
            <div class="emoji-tags">
                ${item.tags.map(tag => `<span class="tag">#${tag}</span>`).join('')}
                <div class="custom-tags"></div>
                <button class="add-tag-btn" onclick="promptAddTag(event, '${item.emoji}')">+</button>
            </div>
        </div>`).join('\n');

// 4. Update the actual gallery file
let html = fs.readFileSync(TARGET_HTML_PATH, 'utf8');
const startTag = '<div class="gallery" id="emojiGallery">';
const endTag = '    <div class="toast" id="toast">'; // This is the div right after the gallery

const parts = html.split(startTag);
const endParts = parts[1].split(endTag);

const newHtml = parts[0] + startTag + '\n        ' + cardsHtml + '\n    ' + '</div>\n\n' + endTag + endParts[1];

fs.writeFileSync(TARGET_HTML_PATH, newHtml);
console.log('Gallery (index.html) successfully updated and deduplicated.');
