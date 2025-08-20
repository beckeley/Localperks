// dealData.ts - Centralized deal data management

export interface DealSpecificData {
  logo: any;
  description: string;
  endDate: string;
  partner: string;
  benefits: string[];
  terms: string[];
  moreFromPartner: {
    image: any;
    title: string;
    quantityUsed: number;
    quantityTotal: number;
    avatars: any[];
  }[];
}

// Comprehensive deal-specific data
export const dealSpecificData: Record<string, DealSpecificData> = {
  '1': {
    logo: require('../assets/images/explore/logo-spotify-icon-4096.png'),
    partner: 'Spotify',
    description: `Prepare to take advantage of an exceptional offer at Spotify. We are pleased to announce a FREE 1-year Premium subscription for all new users.

Experience unlimited music streaming with no ads, offline listening, and premium sound quality. Access millions of songs, podcasts, and exclusive content from your favorite artists around the world.

This limited-time promotion is available to new subscribers only. Download the Spotify app, create your account, and start your premium journey today with unrestricted access to the world's largest music library.

Enjoy personalized playlists, discover new music through advanced algorithms, and sync your music across all devices seamlessly.`,
    endDate: '31 December, 2024',
    benefits: [
      'No ads interruptions during playback',
      'Offline listening capability',
      'High-quality audio streaming (320kbps)',
      'Unlimited skips and replays',
      'Access to exclusive podcast content',
      'Cross-device synchronization',
      'Personalized Daily Mix playlists',
      'Early access to new releases'
    ],
    terms: [
      'Valid for new Spotify users only',
      'One subscription per user account',
      'Auto-renewal after trial period',
      'Valid payment method required for signup',
      'Offer cannot be combined with other promotions',
      'Geographic restrictions may apply'
    ],
    moreFromPartner: [{
      image: require('../assets/images/explore/bella.jpg'),
      title: "Student Discount Plan - 50% Off",
      quantityUsed: 156,
      quantityTotal: 200,
      avatars: [
        require('../assets/images/explore/p.jpg'),
        require('../assets/images/explore/q.png'),
        require('../assets/images/explore/d.png'),
      ]
    }, {
      image: require('../assets/images/explore/spotify.png'),
      title: "Family Premium Package - 6 Accounts",
      quantityUsed: 89,
      quantityTotal: 120,
      avatars: [
        require('../assets/images/explore/p.jpg'),
        require('../assets/images/explore/q.png'),
      ]
    }]
  },
  
  '2': {
    logo: require('../assets/images/explore/logo.png'),
    partner: 'Adidas',
    description: `Unlock exclusive access to Adidas' limited-edition capsule collection featuring cutting-edge designs and premium materials. This exclusive collection showcases innovative athletic wear that combines style with performance.

Each piece in this capsule collection represents the pinnacle of sports fashion, featuring unique colorways and limited designs not available through regular retail channels. The collection includes premium sneakers with boost technology, performance apparel with moisture-wicking fabrics, and lifestyle accessories.

Perfect for fashion enthusiasts and athletes who want to stand out from the crowd. This collection embodies the Adidas legacy of innovation, combining street style with athletic performance.

Experience the fusion of sport and fashion with pieces designed by world-renowned designers and athletes.`,
    endDate: '15 March, 2025',
    benefits: [
      'Exclusive limited-edition designs',
      '15% discount on all collection items',
      'Priority access to future releases',
      'Free shipping and returns worldwide',
      'Member-only colorways and styles',
      'Early sale notifications',
      'VIP customer service support',
      'Access to exclusive events and launches'
    ],
    terms: [
      'Limited quantities available per design',
      'One-time use discount per customer',
      'Cannot be combined with other offers',
      'Valid for online purchases only',
      'Sizes subject to availability',
      'Return policy: 30 days from purchase'
    ],
    moreFromPartner: [{
      image: require('../assets/images/explore/Adi.jpg'),
      title: "Summer Athletic Collection 2024",
      quantityUsed: 67,
      quantityTotal: 100,
      avatars: [
        require('../assets/images/explore/p.jpg'),
        require('../assets/images/explore/q.png'),
        require('../assets/images/explore/d.png'),
      ]
    }]
  },
  
  '3': {
    logo: require('../assets/images/explore/1843c9170a8d8abcf009bb82f244ab49922a38de.jpg'),
    partner: 'Premium Beverages Co',
    description: `Celebrate life's special moments with our exclusive offer of 100 complimentary premium bottles. This exceptional package is designed for those who appreciate the finer things in life and want to make their events truly memorable.

Our curated selection includes premium champagne from renowned French houses, fine wines from prestigious vineyards, craft spirits from award-winning distilleries, and specialty beverages from around the world. Each bottle represents quality, tradition, and celebration.

Perfect for weddings, corporate events, milestone celebrations, anniversary parties, or intimate gatherings with friends and family. Our sommelier-selected collection ensures every occasion becomes unforgettable with the perfect beverage pairing.

Professional delivery service ensures your beverages arrive in perfect condition, properly chilled and ready to serve.`,
    endDate: '30 June, 2025',
    benefits: [
      '100 premium bottles included in package',
      'Sommelier-curated selection process',
      'Professional event delivery service',
      'Complimentary premium glassware set',
      'Professional serving staff option available',
      'Custom labeling and branding available',
      'Temperature-controlled storage and transport',
      'Event planning consultation included'
    ],
    terms: [
      'Minimum event size of 50 guests required',
      '48-hour advance booking required',
      'Delivery within 50km city limits only',
      'Valid for one event per customer',
      'Event date must be confirmed 7 days prior',
      'Additional charges for weekend delivery'
    ],
    moreFromPartner: [{
      image: require('../assets/images/explore/1843c9170a8d8abcf009bb82f244ab49922a38de.jpg'),
      title: "Corporate Event Packages",
      quantityUsed: 34,
      quantityTotal: 80,
      avatars: [
        require('../assets/images/explore/p.jpg'),
        require('../assets/images/explore/q.png'),
      ]
    }]
  },
  
  '4': {
    logo: require('../assets/images/signin/brand-etihad-airways-icon-512x239-fig1x8ir 1.png'),
    partner: 'Etihad Airways',
    description: `Experience the world in unprecedented luxury with Etihad Airways' exclusive partnership program. As the national airline of the United Arab Emirates, Etihad offers world-class service and unmatched comfort on every journey.

Our comprehensive partnership program provides access to premium travel experiences including complimentary business class upgrades, priority boarding, extra baggage allowance, and exclusive lounge access across our global network of destinations.

Whether traveling for business or pleasure, enjoy personalized service, gourmet dining prepared by world-renowned chefs, and state-of-the-art entertainment systems. Discover destinations worldwide with the comfort and elegance that defines Etihad Airways.

Members gain access to The Residence, our exclusive three-room suite in the sky, and priority booking for our most popular routes.`,
    endDate: '31 December, 2025',
    benefits: [
      'Complimentary business class upgrades',
      'Priority check-in and boarding access',
      'Extra 20kg baggage allowance',
      'Exclusive lounge access worldwide',
      'Priority customer service line',
      'Etihad Guest miles bonus program',
      'Complimentary seat selection',
      'Fast-track security and immigration'
    ],
    terms: [
      'Subject to seat availability',
      'Valid for international flights only',
      'Minimum 7-day advance booking required',
      'Member verification required',
      'Upgrades based on operational requirements',
      'Miles earning subject to fare class'
    ],
    moreFromPartner: [{
      image: require('../assets/images/explore/ethihad.png'),
      title: "Frequent Flyer Elite Status Program",
      quantityUsed: 203,
      quantityTotal: 300,
      avatars: [
        require('../assets/images/explore/p.jpg'),
        require('../assets/images/explore/q.png'),
        require('../assets/images/explore/d.png'),
      ]
    }]
  },
  
  '5': {
    logo: require('../assets/images/explore/bmw.jpg'),
    partner: 'BMW',
    description: `Experience "The Ultimate Driving Machine" through BMW's exclusive partnership program. Gain access to premium automotive experiences that showcase German engineering excellence, luxury craftsmanship, and innovative technology.

Our comprehensive program includes extended test drives of the latest BMW models, exclusive service discounts, VIP access to new model launches, and invitations to premium automotive events including track days and driving experiences.

Whether you're passionate about performance, luxury, or innovation, discover why BMW remains the benchmark for premium automobiles. Experience cutting-edge technology like iDrive infotainment, superior craftsmanship in every detail, and driving dynamics that set the standard.

Access to BMW's latest electric vehicle lineup, including the innovative BMW iX and i4 models, showcasing the future of sustainable luxury mobility.`,
    endDate: '31 March, 2025',
    benefits: [
      'Extended test drive opportunities (up to 48 hours)',
      '25% discount on all service and maintenance',
      'VIP invitations to exclusive events',
      'Priority access to new model previews',
      'Complimentary maintenance packages',
      'BMW Performance driving experience days',
      'Access to BMW M driving school',
      'Exclusive merchandise and accessories'
    ],
    terms: [
      'Valid driver\'s license required',
      'Comprehensive insurance verification needed',
      'Advance appointment scheduling required',
      'Limited to one test drive per model per month',
      'Age restriction: 25 years and above',
      'Clean driving record verification required'
    ],
    moreFromPartner: [{
      image: require('../assets/images/explore/bmw.jpg'),
      title: "BMW Performance Driving School",
      quantityUsed: 45,
      quantityTotal: 60,
      avatars: [
        require('../assets/images/explore/p.jpg'),
        require('../assets/images/explore/q.png'),
      ]
    }]
  },
  
  '6': {
    logo: require('../assets/images/explore/Adi.jpg'),
    partner: 'Adidas Sport Performance',
    description: `Elevate your athletic performance with Adidas Sport Performance exclusive training program. This comprehensive package combines premium athletic wear with professional training guidance to maximize your potential.

Access to limited-edition performance gear designed specifically for serious athletes, featuring advanced moisture-wicking fabrics, revolutionary cushioning technology, and aerodynamic designs that enhance your training experience and competition performance.

This program includes personalized fitness coaching from certified trainers, comprehensive nutrition guidance from sports nutritionists, and access to exclusive training facilities equipped with the latest sports technology and professional-grade equipment.

Train alongside professional athletes and access the same resources used by Olympic champions and world-class performers.`,
    endDate: '20 May, 2025',
    benefits: [
      'Premium performance gear set (5 pieces)',
      'Personal training sessions (12 sessions)',
      'Sports nutrition consultation and meal plans',
      'Elite fitness facility access (6 months)',
      'Performance tracking and analytics tools',
      'Monthly gear updates and releases',
      'Access to professional athlete mentorship',
      'Exclusive sports events and competitions'
    ],
    terms: [
      'Minimum 3-month program commitment',
      'Initial fitness assessment required',
      'Flexible training schedule options available',
      'Equipment return policy applies if unused',
      'Program transferable with 30-day notice',
      'Medical clearance required for participation'
    ],
    moreFromPartner: [{
      image: require('../assets/images/explore/Adi.jpg'),
      title: "Youth Sports Development Program",
      quantityUsed: 78,
      quantityTotal: 100,
      avatars: [
        require('../assets/images/explore/p.jpg'),
        require('../assets/images/explore/d.png'),
      ]
    }]
  },
  
  '7': {
    logo: require('../assets/images/explore/bmw.jpg'),
    partner: 'BMW Innovation Hub',
    description: `Step into the future of mobility with BMW Innovation Hub's exclusive technology preview program. Experience next-generation automotive technologies before they reach the consumer market.

This unique program offers hands-on experience with autonomous driving features, cutting-edge electric vehicle technology, and connected car innovations that are revolutionizing the transportation industry and shaping the future of mobility.

Participants gain insider access to BMW's research and development initiatives, including sustainable mobility solutions, advanced driver assistance systems, revolutionary manufacturing processes, and the latest in artificial intelligence integration.

Be among the first to experience BMW's vision for the future of transportation, including flying cars, fully autonomous vehicles, and sustainable energy solutions.`,
    endDate: '15 August, 2025',
    benefits: [
      'Beta technology access and testing',
      'Innovation lab tours with engineers',
      'Direct interaction with engineering teams',
      'Prototype vehicle test experiences',
      'Technology webinar series access',
      'Future mobility insights and reports',
      'Exclusive tech preview events',
      'First access to new technology releases'
    ],
    terms: [
      'Non-disclosure agreement (NDA) required',
      'Background verification needed',
      'Limited program capacity (50 participants)',
      'Technology feedback participation mandatory',
      'Professional or technical background preferred',
      'Commitment to program completion required'
    ],
    moreFromPartner: [{
      image: require('../assets/images/explore/bmw.jpg'),
      title: "Electric Vehicle Trial Program",
      quantityUsed: 92,
      quantityTotal: 150,
      avatars: [
        require('../assets/images/explore/p.jpg'),
        require('../assets/images/explore/q.png'),
        require('../assets/images/explore/d.png'),
      ]
    }]
  }
};

// Helper function to get deal specific data
export const getDealSpecificData = (dealId: string): DealSpecificData => {
  return dealSpecificData[dealId] || {
    logo: require('../assets/images/explore/logo.png'),
    description: 'Deal description not available. Please check back later for updated information about this exclusive offer.',
    endDate: 'To be announced',
    partner: 'Partner',
    benefits: ['Exclusive access', 'Special pricing', 'Premium support'],
    terms: ['Terms and conditions apply', 'Limited time offer', 'Subject to availability'],
    moreFromPartner: []
  };
};

// Function to get all available deal IDs
export const getAvailableDealIds = (): string[] => {
  return Object.keys(dealSpecificData);
};

// Function to validate if a deal has specific data
export const hasDealSpecificData = (dealId: string): boolean => {
  return dealId in dealSpecificData;
};