import assets from '../assets-manifest.json'

export const products = [
    {
        id: 'prod_001',
        title: 'Hydrn Velocity X',
        price: 12999,
        currency: 'INR',
        category: 'Footwear',
        imageKey: 'pbr:shoe:albedo', // Using the PBR texture as a product shot
        description: 'Engineered for the urban rave run. High energy return.',
        slug: 'hydrn-velocity-x'
    },
    {
        id: 'prod_002',
        title: 'Neon Night Pass',
        price: 2499,
        currency: 'INR',
        category: 'Events',
        currency: 'INR',
        category: 'Events',
        imageKey: 'img:hero:rave', // Distinct atmospheric image
        description: 'VIP access to all Neon Night events for the season.',
        slug: 'neon-night-pass'
    },
    {
        id: 'prod_003',
        title: 'Dawn Patrol Kit',
        price: 4999,
        currency: 'INR',
        category: 'Apparel',
        imageKey: 'img:routes:preview', // Distinct route image
        description: 'Reflective windbreaker and performance tee for sunrise runs.',
        slug: 'dawn-patrol-kit'
    },
    {
        id: 'prod_004',
        title: 'Rhythm Bottle',
        price: 1499,
        currency: 'INR',
        category: 'Accessories',
        imageKey: 'fx:techno', // Abstract texture for a "cyber" bottle
        description: 'Insulated steel bottle with sound-reactive LED base.',
        slug: 'rhythm-bottle'
    }
]
