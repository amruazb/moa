import { writeFileSync, mkdirSync } from 'fs'
import { veristarAdSpcSample } from '../lib/ad_spc_founding_moa/sampleData'
import { generateAdSpcFoundingMoaHtml } from '../lib/ad_spc_founding_moa/document'

const html = generateAdSpcFoundingMoaHtml(veristarAdSpcSample)
mkdirSync('/tmp/ad-spc-moa', { recursive: true })
writeFileSync('/tmp/ad-spc-moa/moa.html', html)
console.log('wrote html', html.length)
