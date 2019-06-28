// from SO user esmiralha
function hash(string) {
  let result = 0
  if (string.length === 0) {
    return result
  }
  for (let i = 0; i < string.length; i++) {
    const chr = string.charCodeAt(i)
    result = ((result << 5) - result) + chr
    result = Math.abs(parseInt(result % (2 ** 31), 10))
  }
  return result
}

// Return an animal emoji based on the hash of the given id
export default function idToEmoji(id) {
  const icons = [
    '🐅', '🐆', '🐘', '🦏', '🐂', '🐃', '🦃',
    '🐄', '🐎', '🦌', '🐐', '🐏', '🐑', '🐖',
    '🐗', '🦛', '🐪', '🐫', '🦍', '🦙', '🦘',
    '🦖', '🦕', '🐈', '🐀', '🐁', '🐇', '🐒',
    '🐩', '🐨', '🐿', '🦔', '🦇', '🐍', '🦝',
    '🐋', '🐳', '🐬', '🦈', '🐟', '🐠', '🐡',
    '🦑', '🦐', '🦀', '🐚', '🐌', '🦞', '🐢',
    '🐊', '🦅', '🦉', '🦜', '🦢', '🦚', '🦆',
    '🕊', '🐉', '🐕', '🦡', '🐙', '🦎', '🐓',
  ]
  return icons[hash(id) % icons.length]
}
