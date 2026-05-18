import { PrismaClient } from '@prisma/client'
import * as fs from 'fs'
import * as path from 'path'

const prisma = new PrismaClient()

// Map Indiamart data to Palette schema
function mapIndiamartToMaterial(item: any) {
  // Extract category from title/description
  const titleLower = (item.title || '').toLowerCase()
  const descLower = (item.description || '').toLowerCase()
  
  let category = 'int-flooring' // default
  let subcategory = 'Tile'
  
  // Categorize based on keywords
  if (titleLower.includes('tile') || titleLower.includes('vitrified')) {
    category = 'int-flooring'
    subcategory = titleLower.includes('vitrified') ? 'Vitrified tile' : 'Ceramic tile'
  } else if (titleLower.includes('marble') || titleLower.includes('granite')) {
    category = 'int-flooring'
    subcategory = 'Natural stone'
  } else if (titleLower.includes('paint') || titleLower.includes('emulsion')) {
    category = 'int-walls'
    subcategory = 'Paint'
  } else if (titleLower.includes('door') || titleLower.includes('window')) {
    category = 'int-doors'
    subcategory = 'Door/Window'
  } else if (titleLower.includes('light') || titleLower.includes('lamp')) {
    category = 'int-lighting'
    subcategory = 'Light fixture'
  }

  // Extract tags from title and description
  const tags: string[] = []
  if (titleLower.includes('glossy')) tags.push('Glossy')
  if (titleLower.includes('matt') || titleLower.includes('matte')) tags.push('Matte')
  if (titleLower.includes('vitrified')) tags.push('Vitrified')
  if (titleLower.includes('ceramic')) tags.push('Ceramic')
  if (titleLower.includes('digital')) tags.push('Digital print')
  if (titleLower.includes('double charge')) tags.push('Double charge')
  if (descLower.includes('floor')) tags.push('Floor')
  if (descLower.includes('wall')) tags.push('Wall')

  // Extract size from title
  let size = null
  const sizeMatch = item.title?.match(/(\d+x\d+)/i)
  if (sizeMatch) {
    size = sizeMatch[1] + 'mm'
  }

  // Extract finish from title
  let finish = null
  if (titleLower.includes('glossy')) finish = 'Glossy'
  else if (titleLower.includes('matt') || titleLower.includes('matte')) finish = 'Matte'
  else if (titleLower.includes('polish')) finish = 'Polished'

  // Parse price (remove non-numeric characters)
  let price = 50 // default
  if (item.price) {
    const priceNum = parseFloat(item.price.toString().replace(/[^0-9.]/g, ''))
    if (!isNaN(priceNum) && priceNum > 0) {
      price = priceNum
    }
  }

  // Determine unit
  let unit = 'sq ft'
  if (titleLower.includes('per piece') || titleLower.includes('unit')) {
    unit = 'unit'
  }

  // Color extraction (basic)
  let color = '#B8922A' // default brass color
  const colorMap: Record<string, string> = {
    'red': '#C0392B',
    'cherry': '#C0392B',
    'blue': '#2980B9',
    'green': '#27AE60',
    'white': '#ECF0F1',
    'black': '#2C2C2C',
    'grey': '#7F8C8D',
    'gray': '#7F8C8D',
    'brown': '#8B5C2A',
    'beige': '#D4C5A9',
    'cream': '#F7F2EA',
  }
  for (const [colorName, hex] of Object.entries(colorMap)) {
    if (titleLower.includes(colorName)) {
      color = hex
      if (!tags.includes(colorName.charAt(0).toUpperCase() + colorName.slice(1))) {
        tags.push(colorName.charAt(0).toUpperCase() + colorName.slice(1))
      }
      break
    }
  }

  return {
    name: item.title || 'Unnamed Material',
    brand: item.brand || item.company || 'Unbranded',
    location: 'India', // Indiamart is India-based
    category,
    subcategory,
    color,
    imageUrl: item.image || null, // Import image URL from Indiamart
    price,
    unit,
    available: item.availability === 'https://schema.org/InStock',
    availNote: item.availability === 'https://schema.org/InStock' ? 'In stock' : 'Contact supplier',
    featured: false,
    tags: tags.length > 0 ? tags : ['Indiamart'],
    finish,
    size,
    materialComposition: item.description?.substring(0, 200) || null,
    priceRange: item.price ? `₹${price}/unit` : null,
    specs: {
      'Source': 'Indiamart',
      'SKU': item.sku || 'N/A',
      ...(size ? { 'Size': size } : {}),
      ...(finish ? { 'Finish': finish } : {}),
    },
    whereUse: {
      residential: { ok: ['Living room', 'Bedroom', 'Kitchen'], no: [] },
      commercial: { ok: ['Offices', 'Retail', 'Hotels'], no: [] },
      institutional: { ok: ['Schools', 'Hospitals'], no: [] },
      exterior: { ok: [], no: ['Not recommended'] },
    },
    pros: [
      'Available on Indiamart',
      item.availability === 'https://schema.org/InStock' ? 'In stock' : 'Contact for availability',
      'Multiple suppliers available',
    ],
    cons: [
      'Verify specifications with supplier',
      'Check actual samples before ordering',
    ],
    maintenance: [
      { t: 'Cleaning', d: 'Clean regularly with mild detergent and water.' },
    ],
    installation: {
      bed: 'As per manufacturer specs',
      joint: 'Standard',
      waste: '10%',
      cure: '24 hrs',
      notes: 'Contact supplier for installation guidelines.',
    },
    suppliers: [
      {
        name: item.company || 'Indiamart Supplier',
        loc: 'India',
        price: price,
        note: 'Available on Indiamart - check URL for contact',
      },
    ],
    pairs: [],
  }
}

async function seedFromJSON() {
  console.log('🚀 Starting Indiamart data import...')

  // Read JSON file
  const jsonPath = path.join(__dirname, 'indiamart-data.json')
  
  if (!fs.existsSync(jsonPath)) {
    console.error('❌ File not found: prisma/indiamart-data.json')
    console.log('Please place your JSON file at: prisma/indiamart-data.json')
    return
  }

  const rawData = fs.readFileSync(jsonPath, 'utf-8')
  const indiamartData = JSON.parse(rawData)

  if (!Array.isArray(indiamartData)) {
    console.error('❌ JSON file must contain an array of items')
    return
  }

  console.log(`📦 Found ${indiamartData.length} items to import`)

  let imported = 0
  let skipped = 0
  let errors = 0

  for (const item of indiamartData) {
    try {
      // Check if material already exists (by name)
      const existing = await prisma.material.findFirst({
        where: { name: item.title },
      })

      if (existing) {
        console.log(`⏭️  Skipped (already exists): ${item.title}`)
        skipped++
        continue
      }

      // Map and create material
      const materialData = mapIndiamartToMaterial(item)
      await prisma.material.create({ data: materialData })
      
      console.log(`✅ Imported: ${item.title}`)
      imported++
    } catch (error) {
      console.error(`❌ Error importing ${item.title}:`, error)
      errors++
    }
  }

  console.log('\n📊 Import Summary:')
  console.log(`  ✅ Imported: ${imported}`)
  console.log(`  ⏭️  Skipped: ${skipped}`)
  console.log(`  ❌ Errors: ${errors}`)
  console.log(`  📦 Total: ${indiamartData.length}`)
}

seedFromJSON()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
