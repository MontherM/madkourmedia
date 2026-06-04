export interface Subcategory {
  id: string
  label: string
  prompt: string
}

export interface Category {
  id: string
  label: string
  description: string
  subcategories: Subcategory[]
}

const STRUCTURE_PREFIX =
  'professional interior design photography, maintain exact room architecture walls windows doors ceiling height floor layout unchanged, only change furniture decor and styling, photorealistic, 8k, architectural visualization, '

const NEGATIVE =
  'low quality, blurry, distorted, changing room structure, different windows, different doors, different walls, exterior view, people, text, watermark, cartoon, illustration, 3d render, cgi'

export const CATEGORIES: Category[] = [
  {
    id: 'wohnen',
    label: 'Wohnbereich',
    description: 'Wohnzimmer, Schlafzimmer & Essbereiche',
    subcategories: [
      {
        id: 'modern',
        label: 'Modernes Design',
        prompt: STRUCTURE_PREFIX + 'modern luxury living room, contemporary minimalist furniture, clean architectural lines, neutral tones with warm accent colors, designer floor lamp, marble side table, large textile rug, high gloss surfaces',
      },
      {
        id: 'skandinavisch',
        label: 'Skandinavisch',
        prompt: STRUCTURE_PREFIX + 'Scandinavian living room, natural blonde wood furniture, white walls, hygge atmosphere, cozy wool textiles, indoor plants, warm ambient lighting, minimalist Nordic design, linen curtains',
      },
      {
        id: 'luxus',
        label: 'Luxus Penthouse',
        prompt: STRUCTURE_PREFIX + 'luxury penthouse living room, high-end designer furniture, gold and dark walnut wood accents, statement chandelier, floor-to-ceiling curtains, velvet sofa, premium materials, sophisticated elite interior',
      },
      {
        id: 'minimalist',
        label: 'Minimalistisch',
        prompt: STRUCTURE_PREFIX + 'minimalist Japanese wabi-sabi living room, white and warm grey palette, single statement sofa, zen atmosphere, hidden storage, concrete textures, perfect proportions, calm serene space',
      },
    ],
  },
  {
    id: 'buero',
    label: 'Büro & Office',
    description: 'Arbeitsbereiche, Co-Working & Konferenzräume',
    subcategories: [
      {
        id: 'modern',
        label: 'Modernes Büro',
        prompt: STRUCTURE_PREFIX + 'modern corporate office space, open plan layout, ergonomic workstations, glass partitions, professional LED lighting, branded accent colors, contemporary office furniture, motivating productive atmosphere',
      },
      {
        id: 'coworking',
        label: 'Co-Working Space',
        prompt: STRUCTURE_PREFIX + 'vibrant creative co-working space, modular flexible furniture, community long tables, phone booths, living plant wall, colorful accent furniture, energetic startup atmosphere, exposed brick or concrete',
      },
      {
        id: 'executive',
        label: 'Executive Office',
        prompt: STRUCTURE_PREFIX + 'luxury executive office, solid dark walnut desk, leather executive chair, built-in floor-to-ceiling bookshelves, sophisticated mood lighting, power and prestige atmosphere, premium artworks on wall',
      },
      {
        id: 'homeoffice',
        label: 'Home Office',
        prompt: STRUCTURE_PREFIX + 'elegant home office, built-in shelving with books and objects, comfortable ergonomic desk setup, warm reading lamp, personal touches plants and art, productive warm work-from-home space',
      },
    ],
  },
  {
    id: 'wellness',
    label: 'Wellness',
    description: 'Yoga, Meditation, Spa & Fitness',
    subcategories: [
      {
        id: 'yoga',
        label: 'Yoga Studio',
        prompt: STRUCTURE_PREFIX + 'serene professional yoga studio, natural bamboo wood flooring, mirror wall, soft diffused ambient lighting, clean minimal open space, potted tropical plants, meditation cushions, peaceful zen atmosphere',
      },
      {
        id: 'meditation',
        label: 'Meditationsraum',
        prompt: STRUCTURE_PREFIX + 'peaceful meditation room, soft cushions on floor, dim warm candlelight, incense holder, small fountain, zen garden elements, spiritual serene atmosphere, minimal Japanese-inspired decoration',
      },
      {
        id: 'spa',
        label: 'Spa & Wellness',
        prompt: STRUCTURE_PREFIX + 'luxury spa treatment room, white marble surfaces, soft warm lighting, professional massage table with crisp white linen, candles, orchids, calming stone tones, premium hotel spa atmosphere',
      },
    ],
  },
  {
    id: 'gastronomie',
    label: 'Gastronomie',
    description: 'Restaurant, Café, Bar & Lounge',
    subcategories: [
      {
        id: 'restaurant',
        label: 'Restaurant',
        prompt: STRUCTURE_PREFIX + 'upscale fine dining restaurant interior, elegant white tablecloths, crystal wine glasses, warm pendant lighting above each table, comfortable upholstered chairs, sophisticated tasteful decor, intimate ambiance',
      },
      {
        id: 'cafe',
        label: 'Café & Bistro',
        prompt: STRUCTURE_PREFIX + 'cozy artisanal café bistro, rustic reclaimed wooden tables, mismatched vintage chairs, warm Edison bulb string lights, barista station, plants in terracotta pots, chalkboard menu, welcoming neighborhood feel',
      },
      {
        id: 'bar',
        label: 'Bar & Lounge',
        prompt: STRUCTURE_PREFIX + 'stylish cocktail bar lounge, dramatic mood lighting, long marble bar counter with leather stools, ambient neon light accents, premium spirits backlit display, velvet booth seating, sophisticated nightlife atmosphere',
      },
    ],
  },
  {
    id: 'retail',
    label: 'Retail & Showroom',
    description: 'Boutique, Showroom & Galerie',
    subcategories: [
      {
        id: 'boutique',
        label: 'Boutique',
        prompt: STRUCTURE_PREFIX + 'high-end luxury fashion boutique, minimalist display racks with curated items, soft spotlight lighting, cream and gold palette, premium shopping experience, marble floor, designer mannequins',
      },
      {
        id: 'showroom',
        label: 'Showroom',
        prompt: STRUCTURE_PREFIX + 'modern product showroom, clean white display plinths, precision professional track lighting, architectural display elements, gallery-like neutral presentation space, luxury brand atmosphere',
      },
      {
        id: 'galerie',
        label: 'Galerie',
        prompt: STRUCTURE_PREFIX + 'contemporary white cube art gallery, pristine white walls, museum-quality track lighting, polished concrete floor, minimal bench seating, exhibition space perfect for artworks',
      },
    ],
  },
]

export const NEGATIVE_PROMPT = NEGATIVE

export function getCategoryById(id: string): Category | undefined {
  return CATEGORIES.find((c) => c.id === id)
}

export function getSubcategoryById(
  categoryId: string,
  subcategoryId: string
): Subcategory | undefined {
  return getCategoryById(categoryId)?.subcategories.find((s) => s.id === subcategoryId)
}
