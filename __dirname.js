import { fileURLToPath } from 'url'
import { dirname } from 'path'

function getDirname(importMetaUrl) {
  return dirname(fileURLToPath(importMetaUrl))
}
const __dirname = getDirname(import.meta.url)

export default __dirname