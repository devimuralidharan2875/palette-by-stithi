import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const materials = [
  {
    id: 'm001',
    name: 'Athangudi Floor Tile',
    brand: 'Athangudi Tile Works',
    location: 'Athangudi, Tamil Nadu',
    category: 'int-flooring',
    subcategory: 'Handmade tile',
    color: '#C8956A',
    price: 95,
    unit: 'sq ft',
    available: true,
    availNote: '3–4 week lead time',
    featured: true,
    tags: ['Traditional', 'Handmade', 'Chettinad', 'Colourful'],
    finish: 'Natural cement polish',
    size: '300×300mm',
    materialComposition: 'White cement, natural pigments, gravel base',
    priceRange: '₹85–110/sq ft',
    specs: { 'Size': '300×300mm', 'Finish': 'Natural cement polish', 'Material': 'White cement + natural pigments', 'Origin': 'Athangudi, Tamil Nadu', 'Lead time': '3–4 weeks' },
    whereUse: {
      residential: { ok: ['Living room', 'Bedroom', 'Verandah', 'Courtyard'], no: ['Wet bathrooms', 'Kitchen without sealing'] },
      commercial: { ok: ['Boutique hotels', 'Heritage restaurants', 'Retail'], no: [] },
      institutional: { ok: ['Cultural centres', 'Museums'], no: [] },
      exterior: { ok: ['Covered verandah'], no: ['Fully exposed rain'] }
    },
    pros: ['Unique handmade pattern — no two tiles identical', 'Cool underfoot in Indian summer', 'Heritage aesthetic, extremely photogenic', 'Locally made, supports artisans'],
    cons: ['Needs sealing every 2–3 years', 'Not for very wet zones without sealing', 'Longer lead time than factory tiles'],
    maintenance: [{ t: 'Sealing', d: 'Seal with penetrating sealer on installation. Re-seal every 2–3 years.' }, { t: 'Cleaning', d: 'Mild soap and water. Avoid acidic cleaners.' }],
    installation: { bed: 'Cement mortar bed', joint: '3mm grout joint', waste: '10%', cure: '24 hrs before walking', notes: 'Soak tiles in water 30 min before laying. Do not use white cement grout on dark tiles.' },
    suppliers: [{ name: 'Athangudi Tile Works', loc: 'Athangudi village, Karaikudi', price: 95, note: 'Direct from makers. Min order 200 sq ft.' }, { name: 'Ethnic Tiles', loc: 'Nungambakkam, Chennai', price: 110, note: 'Ready stock, smaller quantities' }],
    pairs: ['Lime plaster walls', 'Teak wood doors', 'Brass fixtures', 'White ceilings'],
  },
  {
    id: 'm002',
    name: 'Indian Black Granite',
    brand: 'Sri Balaji Granites',
    location: 'Chennai',
    category: 'int-flooring',
    subcategory: 'Natural stone',
    color: '#2C2C2C',
    price: 75,
    unit: 'sq ft',
    available: true,
    availNote: 'In stock',
    featured: false,
    tags: ['Granite', 'Polished', 'Durable', 'Premium'],
    finish: 'Mirror polish',
    size: '600×600mm',
    materialComposition: 'Natural granite stone',
    priceRange: '₹65–90/sq ft',
    specs: { 'Size': '600×600mm', 'Finish': 'Mirror polish', 'Material': 'Natural granite', 'Origin': 'Rajasthan / Karnataka', 'Lead time': 'Immediate' },
    whereUse: {
      residential: { ok: ['Living room', 'Kitchen', 'Bathroom', 'Staircase'], no: [] },
      commercial: { ok: ['Offices', 'Hotels', 'Retail', 'Hospitals'], no: [] },
      institutional: { ok: ['All spaces'], no: [] },
      exterior: { ok: ['Covered entrance', 'Parking'], no: [] }
    },
    pros: ['Extremely durable — lasts decades', 'Fully waterproof', 'Easy to clean', 'Premium look at moderate cost'],
    cons: ['Cold and hard underfoot', 'Slippery when wet without anti-slip finish', 'Heavy — structural load consideration'],
    maintenance: [{ t: 'Cleaning', d: 'Mop with mild cleaner. Avoid acidic cleaners like vinegar.' }, { t: 'Polishing', d: 'Re-polish every 5–7 years for mirror finish.' }],
    installation: { bed: 'Cement mortar', joint: '1mm butt joint or 2mm grout', waste: '5%', cure: '24 hrs', notes: 'Use anti-slip sealer for bathrooms.' },
    suppliers: [{ name: 'Sri Balaji Granites', loc: 'Koyambedu, Chennai', price: 75, note: 'Inc. polishing' }],
    pairs: ['White walls', 'Teak accents', 'Brass fixtures', 'Minimal furniture'],
  },
  {
    id: 'm003',
    name: 'Teak Strip Flooring',
    brand: 'Kerala Timber Works',
    location: 'Kerala / Chennai',
    category: 'int-flooring',
    subcategory: 'Hardwood flooring',
    color: '#8B5C2A',
    price: 280,
    unit: 'sq ft',
    available: true,
    availNote: '2-week lead time',
    featured: true,
    tags: ['Teak', 'Wood', 'Premium', 'Herringbone'],
    specs: { 'Size': '90×12mm strips', 'Finish': 'UV lacquer or natural oil', 'Material': 'Grade A teak', 'Origin': 'Kerala — plantation teak', 'Lead time': '2 weeks' },
    whereUse: {
      residential: { ok: ['Living room', 'Bedroom', 'Study', 'Dining room'], no: ['Bathrooms', 'Kitchen', 'Outdoor'] },
      commercial: { ok: ['Boutique hotels', 'Heritage offices', 'Restaurants'], no: [] },
      institutional: { ok: ['Libraries', 'Heritage spaces'], no: [] },
      exterior: { ok: [], no: ['Not for exterior'] }
    },
    pros: ['Timeless beauty, ages gracefully', 'Warm and comfortable underfoot', 'Increases property value', 'Can be sanded and refinished multiple times'],
    cons: ['Most expensive flooring option', 'Needs periodic oiling/polishing', 'Expands in monsoon — needs expansion gap'],
    maintenance: [{ t: 'Oiling', d: 'Oil with teak oil every 6–12 months. Avoid water pooling.' }, { t: 'Polishing', d: 'Sand and re-polish every 5–10 years.' }],
    installation: { bed: 'Plywood sub-floor required', joint: '10mm expansion gap at walls', waste: '12%', cure: '48 hrs before walking', notes: 'Acclimatise boards in room for 5 days before laying. Do not install in monsoon.' },
    suppliers: [{ name: 'Kerala Timber Works', loc: 'Anna Nagar, Chennai', price: 280, note: 'Inc. installation' }, { name: 'Greenply Dealer', loc: 'Guindy, Chennai', price: 260, note: 'Supply only' }],
    pairs: ['Lime plaster walls', 'Brass fixtures', 'Cane furniture', 'Jute rugs'],
  },
  {
    id: 'm004',
    name: 'Cane Armchair',
    brand: 'Nilkamal Heritage',
    location: 'Pan India',
    category: 'int-furniture',
    subcategory: 'Seating Traditional',
    color: '#D4C5A9',
    price: 18500,
    unit: 'unit',
    available: true,
    availNote: 'In stock',
    featured: false,
    tags: ['Cane', 'Traditional', 'Indoor', 'Accent'],
    specs: { 'Dimensions': 'W70 D75 H85 cm', 'Finish': 'Natural cane + teak frame', 'Material': 'Rattan cane, teak wood', 'Weight': '8kg', 'Lead time': 'Immediate' },
    whereUse: {
      residential: { ok: ['Living room', 'Bedroom corner', 'Verandah', 'Study'], no: [] },
      commercial: { ok: ['Boutique hotels', 'Cafes', 'Heritage resorts'], no: [] },
      institutional: { ok: [], no: [] },
      exterior: { ok: ['Covered verandah'], no: ['Direct rain or sun'] }
    },
    pros: ['Lightweight and movable', 'Breathable for Indian climate', 'Timeless aesthetic', 'Sustainable', 'Easy to repair locally'],
    cons: ['Can sag over time', 'Not for heavy use', 'Dust collects in weave'],
    maintenance: [{ t: 'Cleaning', d: 'Dust weekly with soft brush. Damp cloth monthly. Never soak.' }, { t: 'Repair', d: 'Local cane craftsmen re-weave at low cost.' }],
    installation: { bed: 'N/A', joint: 'N/A', waste: 'N/A', cure: 'N/A', notes: 'Use felt pads under legs to protect floors.' },
    suppliers: [{ name: 'Nilkamal Home', loc: 'Phoenix Mall, Chennai', price: 18500, note: 'In stock' }, { name: 'Pepperfry Studio', loc: 'Nungambakkam', price: 17200, note: 'EMI available' }],
    pairs: ['Teak floors', 'Jute rug', 'Lime plaster walls', 'Brass lighting'],
  },
  {
    id: 'm005',
    name: 'Antique Brass Pendant',
    brand: 'Jainsons Lights',
    location: 'Chennai',
    category: 'int-lighting',
    subcategory: 'Pendant light',
    color: '#B8922A',
    price: 6200,
    unit: 'unit',
    available: true,
    availNote: '1 week lead time',
    featured: true,
    tags: ['Brass', 'Pendant', 'Warm light', 'Traditional'],
    specs: { 'Size': '30cm diameter, 60-120cm drop', 'Finish': 'Antique brass electroplated', 'Material': 'Brass + iron frame', 'Weight': '1.8kg', 'Lead time': '1 week' },
    whereUse: {
      residential: { ok: ['Living room', 'Dining room', 'Bedroom', 'Verandah'], no: ['Bathrooms', 'Outdoor'] },
      commercial: { ok: ['Restaurants', 'Heritage hotels', 'Boutique retail'], no: [] },
      institutional: { ok: ['Cultural centres', 'Museums'], no: [] },
      exterior: { ok: [], no: ['Not IP rated'] }
    },
    pros: ['Creates warm amber light', 'Jali pattern casts beautiful shadows', 'Solid brass ages beautifully', 'Strong statement piece'],
    cons: ['Heavy — needs secure ceiling mount', 'Tarnishes without care', 'Indoor only'],
    maintenance: [{ t: 'Polishing', d: 'Polish with Brasso every 6 months or let patina develop.' }, { t: 'Bulb', d: 'Use warm white LED 2700K max 7W.' }],
    installation: { bed: 'Ceiling mount provided', joint: 'N/A', waste: 'N/A', cure: 'N/A', notes: 'Needs earthed ceiling point. Use electrician. Adjust drop before final fixing.' },
    suppliers: [{ name: 'Jainsons Lights', loc: 'Ritchie Street, Chennai', price: 6200, note: 'Direct from store' }],
    pairs: ['Lime plaster ceilings', 'Teak floors', 'Cane furniture'],
  },
  {
    id: 'm006',
    name: 'Lime Plaster Finish',
    brand: 'Local craftsmen',
    location: 'Chennai',
    category: 'int-walls',
    subcategory: 'Traditional plaster',
    color: '#E8D49A',
    price: 35,
    unit: 'sq ft',
    available: true,
    availNote: 'Craftsmen available',
    featured: false,
    tags: ['Traditional', 'Breathable', 'Natural', 'Cool wall'],
    specs: { 'Thickness': '12-20mm', 'Finish': 'Smooth burnished or textured', 'Material': 'Lime putty, marble dust, pigment', 'Lead time': '2-3 weeks inc. curing', 'Colours': 'Ivory, White, Terracotta, Ochre, Grey' },
    whereUse: {
      residential: { ok: ['Living room', 'Bedroom', 'Courtyard', 'Verandah'], no: ['Wet bathrooms'] },
      commercial: { ok: ['Heritage hotels', 'Boutique restaurants'], no: [] },
      institutional: { ok: ['Cultural centres'], no: [] },
      exterior: { ok: ['Sheltered walls'], no: ['Direct rain'] }
    },
    pros: ['Breathable walls stay cool', 'Natural anti-fungal', 'Historically correct for Chettinad', 'Beautiful texture'],
    cons: ['Needs skilled craftsmen', 'Longer curing time', 'More expensive than paint'],
    maintenance: [{ t: 'Waxing', d: 'Apply beeswax annually for protection.' }, { t: 'Cracks', d: 'Fill with lime putty and burnish to match.' }],
    installation: { bed: 'On plaster/brick substrate', joint: 'N/A', waste: 'N/A', cure: '21 days full cure', notes: 'Applied in 2-3 coats. Burnish final coat while slightly damp.' },
    suppliers: [{ name: 'Chitra Lime Works', loc: 'Mylapore, Chennai', price: 35, note: 'Inc. labour' }],
    pairs: ['Athangudi tiles', 'Teak floors', 'Brass fixtures'],
  },
  {
    id: 'm007',
    name: 'Fiddle Leaf Fig',
    brand: 'Ugaoo Nursery',
    location: 'Pan India',
    category: 'land-indoor',
    subcategory: 'Indoor plant',
    color: '#3B6D11',
    price: 1800,
    unit: 'unit',
    available: true,
    availNote: 'Available',
    featured: false,
    tags: ['Indoor', 'Statement plant', 'Tall', 'Air purifying'],
    specs: { 'Mature height': '8-10ft indoors', 'Size at purchase': '4-5ft', 'Spacing': 'Standalone', 'Sun requirement': 'Bright indirect light', 'Water needs': 'Moderate every 7-10 days' },
    whereUse: {
      residential: { ok: ['Living room corner', 'Foyer', 'Bedroom', 'Study'], no: ['Dark rooms', 'Near AC vent'] },
      commercial: { ok: ['Hotel lobbies', 'Restaurants', 'Offices'], no: [] },
      institutional: { ok: ['Atriums', 'Reception'], no: [] },
      exterior: { ok: [], no: ['Direct outdoor sun'] }
    },
    pros: ['Strong visual statement', 'Air purifying', 'Grows to 10ft indoors', 'Works with all styles'],
    cons: ['Needs bright indirect light', 'Sensitive to moving', 'Drops leaves if overwatered', 'Toxic to pets'],
    maintenance: [{ t: 'Watering', d: 'Every 7-10 days. Let top 2 inches dry between watering.' }, { t: 'Light', d: 'Bright indirect light. South or east window. Rotate monthly.' }],
    installation: { bed: 'N/A', joint: 'N/A', waste: 'N/A', cure: 'N/A', notes: 'Use decorative pot 2-3 inches larger than nursery pot.' },
    suppliers: [{ name: 'Ugaoo', loc: 'Online', price: 1800, note: 'Home delivery' }, { name: 'Annamalai Nursery', loc: 'Adyar, Chennai', price: 1400, note: 'Walk-in' }],
    pairs: ['Cane furniture', 'Teak floors', 'Lime plaster walls'],
  },
  {
    id: 'm008',
    name: 'Sage Green Emulsion',
    brand: 'Asian Paints',
    location: 'Pan India',
    category: 'int-walls',
    subcategory: 'Interior emulsion',
    color: '#7AAB6E',
    price: 420,
    unit: 'litre',
    available: true,
    availNote: 'In stock everywhere',
    featured: false,
    tags: ['Emulsion', 'Sage', 'Low VOC', 'Washable'],
    specs: { 'Finish': 'Matte / Eggshell', 'Material': 'Acrylic emulsion', 'Coverage': '120-140 sq ft/litre', 'Lead time': 'Immediate' },
    whereUse: {
      residential: { ok: ['Living room', 'Bedroom', 'Bathroom above dado', 'Study'], no: [] },
      commercial: { ok: ['Offices', 'Boutique retail', 'Cafes'], no: [] },
      institutional: { ok: ['Schools', 'Clinics'], no: [] },
      exterior: { ok: [], no: [] }
    },
    pros: ['Widely available', 'Easy to apply', 'Washable', 'Hundreds of colour options'],
    cons: ['Fades in direct sun', 'Less breathable than lime plaster'],
    maintenance: [{ t: 'Cleaning', d: 'Wipe with damp cloth. Mild detergent for stains.' }],
    installation: { bed: 'On plaster substrate', joint: 'N/A', waste: 'N/A', cure: '7 days full cure', notes: 'Apply primer first. 2 coats minimum.' },
    suppliers: [{ name: 'Asian Paints', loc: 'Pan India', price: 420, note: 'Available everywhere' }],
    pairs: ['Teak floors', 'Brass fixtures', 'White trim'],
  },
  {
    id: 'm009',
    name: 'Rain Tree',
    brand: 'Local nursery',
    location: 'Pan India',
    category: 'land-shade',
    subcategory: 'Shade tree',
    color: '#2D5A1B',
    price: 2500,
    unit: 'unit',
    available: true,
    availNote: 'Nursery available',
    featured: false,
    tags: ['Shade', 'Fast growing', 'Tropical', 'Spreading canopy'],
    specs: { 'Mature height': '15-25m', 'Canopy spread': '20-30m', 'Spacing': 'Min 15m apart', 'Growth rate': 'Fast 1-2m/year' },
    whereUse: {
      residential: { ok: ['Large gardens', 'Farm boundary'], no: ['Small plots'] },
      commercial: { ok: ['Resorts', 'Farm stays', 'Large campuses'], no: [] },
      institutional: { ok: ['Schools', 'Colleges', 'Parks'], no: [] },
      exterior: { ok: ['Open landscapes', 'Avenue planting'], no: [] }
    },
    pros: ['Massive shade cover', 'Nitrogen-fixing improves soil', 'Long-lived 100+ years'],
    cons: ['Very large — needs open space', 'Roots damage structures if close', 'Drops pods'],
    maintenance: [{ t: 'Watering', d: 'Daily for first 2 years. Rainfall sufficient once established.' }],
    installation: { bed: 'Large pit 3x3ft minimum', joint: '15m from structures', waste: 'N/A', cure: 'Stake for first 2 years', notes: 'Plant in well-drained soil. Mulch around base.' },
    suppliers: [{ name: 'Annamalai Nursery', loc: 'Adyar, Chennai', price: 2500, note: '15-20ft saplings' }],
    pairs: ['Buffalo grass', 'Shade-tolerant ferns', 'Jasmine on boundary walls'],
  },
  {
    id: 'm010',
    name: 'Bougainvillea',
    brand: 'Local nursery',
    location: 'Pan India',
    category: 'land-flowering',
    subcategory: 'Flowering shrub',
    color: '#C0392B',
    price: 350,
    unit: 'unit',
    available: true,
    availNote: 'Widely available',
    featured: false,
    tags: ['Flowering', 'Drought tolerant', 'Climbing', 'Boundary'],
    specs: { 'Mature height': '3-12m climber', 'Spread': '3-6m', 'Sun requirement': 'Full sun min 6hrs', 'Growth rate': 'Fast' },
    whereUse: {
      residential: { ok: ['Boundary walls', 'Pergolas', 'Entrance'], no: ['Indoor'] },
      commercial: { ok: ['Hotels', 'Resorts', 'Retail facades'], no: [] },
      institutional: { ok: ['Campuses', 'Public spaces'], no: [] },
      exterior: { ok: ['Walls', 'Fences', 'Open garden'], no: [] }
    },
    pros: ['Brilliant colour for months', 'Extremely drought tolerant', 'Fast growing', 'Thorny security hedge'],
    cons: ['Thorny near walkways', 'Drops bracts', 'Needs full sun'],
    maintenance: [{ t: 'Pruning', d: 'Prune hard after each flowering cycle.' }],
    installation: { bed: 'Well-drained soil', joint: '3-5m from other plants', waste: 'N/A', cure: 'Stake climber first season', notes: 'Plant in full sun. Avoid over-watering.' },
    suppliers: [{ name: 'Annamalai Nursery', loc: 'Adyar, Chennai', price: 350, note: 'Multiple colours' }, { name: 'Ugaoo', loc: 'Online', price: 299, note: 'Home delivery' }],
    pairs: ['Plumbago', 'Ixora', 'Croton hedge', 'Grass lawn'],
  },
  {
    id: 'm011',
    name: 'Curry Leaf Tree',
    brand: 'Local nursery',
    location: 'Pan India',
    category: 'land-fruit',
    subcategory: 'Culinary fruit tree',
    color: '#3B6D11',
    price: 180,
    unit: 'unit',
    available: true,
    availNote: 'Very widely available',
    featured: false,
    tags: ['Culinary', 'Native', 'Compact', 'Fragrant'],
    specs: { 'Mature height': '4-6m', 'Sun requirement': 'Full sun to partial shade', 'Native to': 'India and Sri Lanka' },
    whereUse: {
      residential: { ok: ['Courtyard', 'Kitchen garden', 'Balcony in large pot'], no: [] },
      commercial: { ok: ['Restaurants', 'Resorts'], no: [] },
      institutional: { ok: ['Herb gardens'], no: [] },
      exterior: { ok: ['South-facing garden'], no: [] }
    },
    pros: ['Fresh curry leaves for cooking', 'Fully native to India', 'Compact suits small spaces', 'Fragrant foliage'],
    cons: ['Slow from seed — buy grafted', 'Suckers prolifically', 'Berries mildly toxic to pets'],
    maintenance: [{ t: 'Pruning', d: 'Pinch tips regularly. Harvest leaves frequently.' }],
    installation: { bed: 'Rich well-drained soil', joint: '3m from structures', waste: 'N/A', cure: 'Mulch base', notes: 'Buy grafted plants for faster establishment.' },
    suppliers: [{ name: 'Annamalai Nursery', loc: 'Adyar, Chennai', price: 180, note: 'Grafted available' }],
    pairs: ['Tulsi', 'Lemon grass', 'Moringa', 'Jasmine'],
  },
  {
    id: 'm012',
    name: 'Duranta (Golden Dewdrop)',
    brand: 'Local nursery',
    location: 'Pan India',
    category: 'land-hedge',
    subcategory: 'Hedge plant',
    color: '#7AAB6E',
    price: 120,
    unit: 'unit',
    available: true,
    availNote: 'Widely available',
    featured: false,
    tags: ['Hedge', 'Clipping', 'Fast growing', 'Evergreen'],
    specs: { 'Height (hedge)': '1-1.5m trimmed', 'Spacing': '0.5m for dense hedge', 'Sun requirement': 'Full sun', 'Growth rate': 'Fast' },
    whereUse: {
      residential: { ok: ['Boundary hedge', 'Garden partition', 'Formal garden'], no: [] },
      commercial: { ok: ['Hotels', 'Corporate campuses'], no: [] },
      institutional: { ok: ['Schools', 'Public parks'], no: [] },
      exterior: { ok: ['Boundary', 'Avenue hedge'], no: [] }
    },
    pros: ['Dense clipping hedge', 'Purple flowers attract butterflies', 'Fast growing', 'Tolerates hard pruning'],
    cons: ['Berries toxic — avoid near children', 'Needs frequent clipping'],
    maintenance: [{ t: 'Clipping', d: 'Clip every 4-6 weeks during growing season.' }],
    installation: { bed: 'Any well-drained soil', joint: '0.5m apart for hedge', waste: 'N/A', cure: 'N/A', notes: 'Plant in row with 0.5m spacing for dense screen.' },
    suppliers: [{ name: 'Annamalai Nursery', loc: 'Adyar, Chennai', price: 120, note: 'Per plant' }],
    pairs: ['Ixora', 'Bougainvillea on wall behind', 'Grass lawn in front'],
  },
]

async function main() {
  console.log('🌱 Seeding Palette by Stithi database...')

  // Clear existing data
  await prisma.roomMaterial.deleteMany()
  await prisma.boardItem.deleteMany()
  await prisma.favourite.deleteMany()
  await prisma.room.deleteMany()
  await prisma.board.deleteMany()
  await prisma.project.deleteMany()
  await prisma.material.deleteMany()

  // Seed materials
  for (const mat of materials) {
    await prisma.material.create({
      data: {
        id: mat.id,
        name: mat.name,
        brand: mat.brand,
        location: mat.location,
        category: mat.category,
        subcategory: mat.subcategory,
        color: mat.color,
        price: mat.price,
        unit: mat.unit,
        available: mat.available,
        availNote: mat.availNote,
        featured: mat.featured,
        tags: mat.tags,
        finish: mat.finish,
        size: mat.size,
        materialComposition: mat.materialComposition,
        priceRange: mat.priceRange,
        specs: mat.specs,
        whereUse: mat.whereUse,
        pros: mat.pros,
        cons: mat.cons,
        maintenance: mat.maintenance,
        installation: mat.installation,
        suppliers: mat.suppliers,
        pairs: mat.pairs,
      }
    })
    console.log(`  ✓ ${mat.name}`)
  }

  // Seed sample project
  const project = await prisma.project.create({
    data: {
      name: 'Chettinad Villa',
      location: 'Karaikudi',
      client: 'Suresh Rajan',
      status: 'active',
      color: '#3D2E20',
    }
  })

  const room1 = await prisma.room.create({
    data: { name: 'Master Bathroom', area: 120, notes: 'Client prefers matte finishes.', projectId: project.id }
  })
  const room2 = await prisma.room.create({
    data: { name: 'Living Room', area: 320, notes: 'Herringbone teak as hero.', projectId: project.id }
  })
  const room3 = await prisma.room.create({
    data: { name: 'Kitchen', area: 90, notes: '', projectId: project.id }
  })

  await prisma.roomMaterial.createMany({
    data: [
      { roomId: room1.id, materialId: 'm001' },
      { roomId: room1.id, materialId: 'm002' },
      { roomId: room2.id, materialId: 'm003' },
      { roomId: room2.id, materialId: 'm004' },
      { roomId: room2.id, materialId: 'm005' },
      { roomId: room2.id, materialId: 'm006' },
      { roomId: room2.id, materialId: 'm007' },
      { roomId: room3.id, materialId: 'm008' },
    ]
  })

  // Sample board
  const board = await prisma.board.create({
    data: { name: 'Chettinad Living Room', projectId: project.id, notes: 'Hero materials for living room' }
  })
  await prisma.boardItem.createMany({
    data: [
      { boardId: board.id, materialId: 'm001', position: 0 },
      { boardId: board.id, materialId: 'm003', position: 1 },
      { boardId: board.id, materialId: 'm005', position: 2 },
      { boardId: board.id, materialId: 'm006', position: 3 },
    ]
  })

  console.log('✅ Seed complete!')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
