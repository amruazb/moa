// POA Vehicle Test/Demo File
// This file demonstrates how to use the POA Vehicle generator

import { generatePOAVehicle, extractPOAVehicleContext, samplePOAVehicleFilled } from './index'
import * as fs from 'fs'
import * as path from 'path'

// Extract context from sample data
const context = extractPOAVehicleContext(samplePOAVehicleFilled)

// Generate the HTML document
const html = generatePOAVehicle(context)

// Write to file for testing
const outputPath = path.join(__dirname, 'test_output.html')
fs.writeFileSync(outputPath, html, 'utf-8')

console.log('POA Vehicle document generated successfully!')
console.log(`Output saved to: ${outputPath}`)
console.log('\nDocument details:')
console.log(`- Owner: ${context.owner.name}`)
console.log(`- Number of vehicles: ${context.vehicles.length}`)
console.log(`- Bank: ${context.bank.name}`)
console.log(`- Validity: ${context.validityYears} years`)
