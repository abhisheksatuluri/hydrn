import fs from 'fs'
import path from 'path'

// Minimal valid GLB header and empty JSON chunk
// Header: magic (4), version (4), length (4)
// Chunk 0: length (4), type (4), data (N)

function createMinimalGLB(filename) {
  // A minimal valid GLB with an empty scene definition
  const jsonContent = JSON.stringify({
    asset: { version: '2.0' },
    scenes: [{ nodes: [0] }],
    nodes: [{ name: 'Placeholder' }]
  })

  // Pad JSON to 4-byte boundary with spaces
  let padding = 4 - (jsonContent.length % 4)
  if (padding === 4) padding = 0
  const paddedJson = jsonContent + ' '.repeat(padding)

  const jsonLength = paddedJson.length
  const totalLength = 12 + 8 + jsonLength // Header (12) + ChunkHeader (8) + ChunkData

  const buffer = Buffer.alloc(totalLength)

  // 1. Header
  buffer.write('glTF', 0) // Magic
  buffer.writeUInt32LE(2, 4) // Version
  buffer.writeUInt32LE(totalLength, 8) // Total length

  // 2. JSON Chunk
  buffer.writeUInt32LE(jsonLength, 12) // Chunk length
  buffer.writeUInt32LE(0x4e4f534a, 16) // Chunk type (JSON)
  buffer.write(paddedJson, 20) // Chunk data

  const targetPath = path.join('spline_scenes', filename)
  fs.writeFileSync(targetPath, buffer)
  console.log(`Generated: ${targetPath} (${totalLength} bytes)`)
}

const scenes = [
  'hero.glb',
  'bubbles.glb',
  'route.glb',
  'medal.glb',
  'rave_lights.glb',
  'shoe_morph.glb'
]

if (!fs.existsSync('spline_scenes')) {
  fs.mkdirSync('spline_scenes')
}

scenes.forEach((scene) => createMinimalGLB(scene))
