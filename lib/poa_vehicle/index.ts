// POA Vehicle Main Entry Point
import { POAVehicleContext, extractPOAVehicleContext, POAVehicleData } from './types'
import { generatePOAVehicleStyles } from './styles'
import { page1, page2 } from './pages'
import { FontSettings } from '@/store/formattingStore'

export function generatePOAVehicle(ctx: POAVehicleContext, settings?: FontSettings): string {
    const styles = generatePOAVehicleStyles(settings)

    return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Power of Attorney for Selling Mortgaged Vehicle</title>
        <style>${styles}</style>
      </head>
      <body>
        <div class="doc">
          ${page1(ctx, 1)}
          ${page2(ctx, 2)}
        </div>
      </body>
    </html>
  `
}

// Export types and utilities
export { POAVehicleContext, POAVehicleData, extractPOAVehicleContext } from './types'
export { samplePOAVehicleFilled, blankPOAVehicleSample } from './sampleData'
export { generatePOAVehicleStyles } from './styles'
