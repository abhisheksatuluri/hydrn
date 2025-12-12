import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '../../') // Fix root resolution to go up from src/scripts

// Read manifest manually to avoid import assertion issues in some node versions
const manifestPath = path.join(ROOT, 'src/assets-manifest.json')
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'))

console.log('Verifying assets from manifest...')
let errors = 0

for (const [key, value] of Object.entries(manifest)) {
    // Handle public folder vs src folder
    let assetPath
    if (value.startsWith('src/')) {
        assetPath = path.join(ROOT, value)
    } else if (value.startsWith('public/')) {
        assetPath = path.join(ROOT, value) // public is in root
    } else {
        assetPath = path.join(ROOT, value)
    }

    if (!fs.existsSync(assetPath)) {
        console.error(`[MISSING] ${key}: ${value} (Path: ${assetPath})`)
        errors++
    } else {
        // console.log(`[OK] ${key}`)
    }
}

if (errors === 0) {
    console.log('✅ All assets verified successfully!')
    process.exit(0)
} else {
    console.error(`❌ Found ${errors} missing assets.`)
    process.exit(1)
}
