import { Project, JournalArticle } from '../types';

export const STUDIO_INFO = {
  name: 'The Royal Films',
  tagline: 'Tech-Enabled Wedding Photography & Cinematic Films',
  founder: 'Niraj Singh',
  founderTitle: 'Founder & Creative Director (AAFT Alumnus)',
  established: '2018',
  address: 'Chhotki Nawada, Near Gandhi More, Korma Road, Gaya, Bihar 823002',
  city: 'Gaya, Bihar',
  country: 'India',
  coordinates: '24.7955° N, 85.0002° E',
  phone: '+917004375740',
  phoneDisplay: '+91 70043 75740',
  phoneSecondary: '+91 95045 87351',
  email: 'info@theroyalfilms.in',
  website: 'https://www.theroyalfilms.in',
  instagramUrl: 'https://www.instagram.com/theroyalfilms.in/',
  instagramHandle: '@theroyalfilms.in',
  youtubeUrl: 'https://www.youtube.com/@theroyalfilms',
  youtubeHandle: '@theroyalfilms',
  facebookUrl: 'https://www.facebook.com/theroyalfilms.in',
  googleMapsUrl: 'https://maps.google.com/?q=The+Royal+Films+Chhotki+Nawada+Gandhi+More+Gaya+Bihar+823002',
  googleReviewRating: '4.6 ★ (100+ Verified Google Reviews)',
  whatsappUrl: 'https://wa.me/917004375740?text=Hello%20The%20Royal%20Films%2C%20I%20would%20like%20to%20inquire%20about%20wedding%20photography%20and%20cinematic%20film%20packages.'
};

export const PROJECTS: Project[] = [
  {
    id: 'proj-01',
    slug: 'aanya-rohan-royal-varmala',
    title: 'Aanya & Rohan: The Royal Varmala',
    subtitle: 'Grand 3-day royal wedding celebration documented with candid intimacy and aerial drone cinema',
    category: 'wedding',
    categoryLabel: 'Candid Wedding & Drone',
    year: '2026',
    client: 'Aanya & Rohan Singhania',
    location: 'Bodh Gaya & Gaya, Bihar',
    venue: 'Royal Heritage Resort & Courtyard',
    description: 'A celebration blending Bihari tradition with modern royal grandeur. From the emotional pheras under golden marigold canopies to the joyous baraat entry captured with 4K aerial drone perspective.',
    challenge: 'Balancing indoor banquet ambient lighting with high-energy baraat celebrations without losing the soft glow of bridal portraits.',
    approach: 'Deployed dual Sony FX6 cinema cameras with Profoto off-camera TTL wireless speedlights and synchronized 4K Mavic 3 Cine aerial tracking.',
    outcome: 'Over 850 color-graded high-resolution photos, a 4-minute cinematic teaser, and a 40-page velvet Italian flush-mount album delivered on time.',
    aspectRatio: '4:3',
    artType: 'monolith',
    imageUrl: '/assets/images/varmala.jpg',
    accentColor: '#1A1A1A',
    tags: ['Candid Wedding', 'Baraat Entry', 'Drone 4K', 'Gaya Heritage'],
    metrics: [
      { label: 'Event Duration', value: '3 Full Days' },
      { label: 'Photographs Delivered', value: '850+ Edited' },
      { label: 'Cinematic Film', value: '4K Master Teaser' }
    ],
    specs: {
      cameras: 'Sony FX6 & Sony A7S III (Dual 4K Setup)',
      lenses: 'Sony GM 24-70mm f/2.8 & 85mm f/1.4 GM',
      drone: 'DJI Mavic 3 Cine (Licensed Aerial Operator)',
      deliverables: '850+ Edited Photos, 4-Min Teaser, 40-Min Full Documentary Film',
      filmDuration: '4:20 Min Teaser · 42 Min Film',
      albumType: 'Handcrafted Italian Leather Flush-Mount 12x18'
    }
  },
  {
    id: 'proj-02',
    slug: 'riya-kunal-heritage-sangeet',
    title: 'Riya & Kunal: Sangeet & Bidaai',
    subtitle: 'Heritage celebration capturing tearful farewells and electric choreographed dance battles',
    category: 'films',
    categoryLabel: 'Cinematic Wedding Film',
    year: '2026',
    client: 'Riya & Kunal Verma',
    location: 'Rajgir & Gaya, Bihar',
    venue: 'Heritage Valley Resort',
    description: 'An emotional cinematic film directed by AAFT-trained filmmaker Niraj Singh, centering on the tender bond between a father and daughter, juxtaposed with the thunderous beats of a high-energy sangeet night.',
    challenge: 'Capturing whisper-quiet emotional bidaai moments in low-light conditions without being obtrusive or breaking family intimacy.',
    approach: 'Silent electronic shutters on 50mm f/1.2 primes, combined with directional wireless audio lavaliers placed discreetly on the couple during the vows.',
    outcome: 'Viral highlight teaser on YouTube and Instagram; praised by the family for capturing unfiltered, raw joy.',
    aspectRatio: '4:3',
    artType: 'sculpture',
    imageUrl: '/assets/images/sangeet.jpg',
    accentColor: '#121212',
    tags: ['Cinematic Film', 'Emotional Bidaai', 'Sangeet Night', 'The Royal Films'],
    metrics: [
      { label: 'Audio Tracks Mastered', value: '24-Bit Stereo' },
      { label: 'Social Reach', value: '250,000+' },
      { label: 'Turnaround Time', value: 'Timely Delivery' }
    ],
    specs: {
      cameras: 'Sony A7S III Dual Bodies (10-bit 4:2:2 S-Log3)',
      lenses: 'Sony 50mm f/1.2 GM & 35mm f/1.4 GM',
      drone: 'DJI Air 3 4K HDR',
      deliverables: 'Cinematic Teaser, Full Traditional Video, 600 Hi-Res Stills',
      filmDuration: '3:45 Min 4K Teaser · 35 Min Highlight Film',
      albumType: 'Silk Fabric Embossed Flush-Mount 12x15'
    }
  },
  {
    id: 'proj-03',
    slug: 'meera-siddharth-ganges-prewedding',
    title: 'Meera & Siddharth: Riverfront Twilight',
    subtitle: 'Sunset boat journey and historic heritage pre-wedding concept shoot',
    category: 'prewedding',
    categoryLabel: 'Pre-Wedding Cinema & Stills',
    year: '2026',
    client: 'Meera & Siddharth',
    location: 'Gaya & Varanasi Riverfront',
    venue: 'Historic Riverbank Steppes & Heritage Ghats',
    description: 'An evocative romance narrative capturing gentle laughter as wooden boats drifted down the river under amber sunset skies. Natural, unposed, and deeply personal storytelling.',
    challenge: 'Managing boat sway and shifting evening natural light without bulky stabilizing rigs that disrupt the couple’s spontaneity.',
    approach: 'Handheld gimbal stabilization paired with vintage-toned color science calibrated specifically for warm Indian skin tones and dusk reflections.',
    outcome: 'Used as the couple’s custom digital save-the-date invitation and grand wedding entrance film.',
    aspectRatio: '4:3',
    artType: 'monograph',
    imageUrl: '/assets/images/prewedding.jpg',
    accentColor: '#2B2B2B',
    tags: ['Pre-Wedding', 'Sunset Romance', 'Cinematic Portrait', 'Golden Hour'],
    metrics: [
      { label: 'Golden Hour Window', value: '45 Minutes' },
      { label: 'Locations Covered', value: '3 Heritage Sites' },
      { label: 'Save-The-Date Film', value: '90s 4K Reel' }
    ],
    specs: {
      cameras: 'Sony FX3 with DJI RS 3 Pro Gimbal',
      lenses: 'Sony 24mm f/1.4 GM & 85mm f/1.8',
      drone: 'DJI Mini 4 Pro 4K',
      deliverables: '90s Instagram Reel, 3-Min Film, 75 Retouched Stills',
      filmDuration: '1:30 Reel · 3:00 Concept Film',
      albumType: 'Hardcover Linen Coffee Table Book'
    }
  },
  {
    id: 'proj-04',
    slug: 'zoya-farhan-heritage-nikah',
    title: 'Zoya & Farhan: Heritage Nikah',
    subtitle: 'Classic courtyard Nikah, candlelit reception, and timeless family portraits',
    category: 'wedding',
    categoryLabel: 'Traditional & Fine Art',
    year: '2025',
    client: 'Zoya & Farhan',
    location: 'Gaya & Patna, Bihar',
    venue: 'Heritage Haveli Courtyard',
    description: 'Documenting the solemn beauty of the Qubool Hai vows, the delicate hand embroidery of the bridal zardozi veil, and laughter during family celebrations.',
    challenge: 'Preserving the quiet sanctity of religious rituals while capturing candid smiles from extended family elders.',
    approach: 'Long 70-200mm telephoto lenses positioned at respectful distances with zero flash during sacred recitations.',
    outcome: 'A cherished heirloom series featuring over 900 curated images and custom matching parent gift albums.',
    aspectRatio: '4:3',
    artType: 'kinetic',
    imageUrl: '/assets/images/baraat.jpg',
    accentColor: '#1F2421',
    tags: ['Nikah Ceremony', 'Fine Art', 'Traditional Elegance', 'The Royal Films'],
    metrics: [
      { label: 'Ceremony Stills', value: '900+ Mastered' },
      { label: 'Parent Albums', value: '2 Matching Leather' },
      { label: 'Client Rating', value: '5.0 ★★★★★' }
    ],
    specs: {
      cameras: 'Sony A7R V (61MP Ultra Resolution) & A7S III',
      lenses: 'Sony 70-200mm f/2.8 GM II & 50mm f/1.2 GM',
      drone: 'Indoor Safe Micro Drone (DJI Avata)',
      deliverables: 'Complete Photo & Traditional Video Coverage, Drone Highlights',
      filmDuration: '5:00 Cinematic Trailer · 60 Min Full Ceremony',
      albumType: 'Handmade Italian Leather Boxed Heirloom Album'
    }
  },
  {
    id: 'proj-05',
    slug: 'shreya-tanmay-vibrant-haldi',
    title: 'Shreya & Tanmay: Marigold Haldi',
    subtitle: 'High-speed 120FPS splash photography and euphoric phoolon ki holi celebrations',
    category: 'ceremonies',
    categoryLabel: 'Haldi & Sangeet',
    year: '2025',
    client: 'Shreya & Tanmay',
    location: 'Chhotki Nawada, Gaya',
    venue: 'Royal Palms Garden Lawn',
    description: 'Explosions of yellow marigold petals, turmeric smearing, laughter, and spontaneous water splashes captured at 120 frames-per-second slow motion.',
    challenge: 'Protecting expensive cinema lenses and camera bodies from flying turmeric paste and water spray while maintaining close-up action.',
    approach: 'Hydrophobic sealed lens housings and rapid autofocus tracking tuned for vibrant high-speed action.',
    outcome: 'One of our most celebrated viral reels with over 400,000 views across wedding platforms.',
    aspectRatio: '4:3',
    artType: 'industrial',
    imageUrl: '/assets/images/haldi.jpg',
    accentColor: '#1E1E1E',
    tags: ['Haldi Ceremony', 'Phoolon Ki Holi', 'Slow Motion 120FPS', 'Gaya'],
    metrics: [
      { label: 'Frame Rate', value: '120 FPS Slow-Mo' },
      { label: 'Social Engagement', value: '400k+ Views' },
      { label: 'Petal Splashes Captured', value: 'Zero Motion Blur' }
    ],
    specs: {
      cameras: 'Sony FX3 with 120FPS 4K All-Intra Recording',
      lenses: 'Sony 24-70mm f/2.8 GM II (Weather Sealed)',
      drone: 'DJI Mavic 3 Cine',
      deliverables: '300 Dynamic Stills, 60s Instagram Reel, Haldi Video',
      filmDuration: '1:00 Instagram Reel · 12 Min Haldi Reel',
      albumType: 'Custom Acrylic Cover Album 12x15'
    }
  },
  {
    id: 'proj-06',
    slug: 'imperial-keepsake-album-craft',
    title: 'The Royal Keepsake: Archival Albums',
    subtitle: 'Handmade flush-mount wedding albums crafted with Italian leather and German archival paper',
    category: 'albums',
    categoryLabel: 'Luxury Albums & Keepsakes',
    year: '2025',
    client: 'Curated Studio Collection',
    location: 'Gaya Atelier',
    venue: 'The Royal Films Craft Lab',
    description: 'Every wedding album is designed page-by-page by our in-house layout artists. Printed on non-tearable 300GSM pearl metallic sheets with seamless 180-degree lay-flat panoramic spreads.',
    challenge: 'Ensuring color reproduction on physical paper perfectly matches the richness of the couple’s original digital cinema masters.',
    approach: 'Individually profiled RGB to CMYK gamut proofing, thermal protective lamination against humidity, and solid wooden storage cases.',
    outcome: 'Passed down as family heirlooms with a guaranteed 100-year color permanence rating.',
    aspectRatio: '4:3',
    artType: 'grid',
    imageUrl: '/assets/images/album.jpg',
    accentColor: '#212529',
    tags: ['Handcrafted Album', 'Lay-Flat Spreads', 'Archival Paper', 'Royal Keepsake'],
    metrics: [
      { label: 'Color Permanence', value: '100+ Years' },
      { label: 'Page Thickness', value: '300 GSM Laminated' },
      { label: 'Lay-Flat Angle', value: '180° Seamless' }
    ],
    specs: {
      cameras: 'Color-Proofed on Eizo ColorEdge CG2700X',
      lenses: 'Studio Macro Reproduction Lenses',
      drone: 'N/A',
      deliverables: '12x18 Master Album + 2 Parent Gift Albums + Wooden Box',
      filmDuration: 'N/A',
      albumType: 'Genuine Italian Leather or Raw Silk with Custom Metal Monogram'
    }
  }
];

export const MARQUEE_ITEMS = [
  {
    id: 'mq-01',
    title: 'Aanya & Rohan Varmala',
    category: 'Royal Wedding / Bodh Gaya',
    year: '2026',
    artType: 'monolith' as const,
    imageUrl: '/assets/images/varmala.jpg',
    cardClass: 'card-asym-a',
    badge: '4K Cinema + Drone'
  },
  {
    id: 'mq-02',
    title: 'Riya & Kunal Sangeet',
    category: 'Heritage Film / Rajgir',
    year: '2026',
    artType: 'sculpture' as const,
    imageUrl: '/assets/images/sangeet.jpg',
    cardClass: 'card-asym-b',
    badge: '250k+ Film Views'
  },
  {
    id: 'mq-03',
    title: 'Riverfront Twilight Romance',
    category: 'Pre-Wedding Cinema',
    year: '2026',
    artType: 'monograph' as const,
    imageUrl: '/assets/images/prewedding.jpg',
    cardClass: 'card-asym-c',
    badge: 'Golden Hour'
  },
  {
    id: 'mq-04',
    title: 'Zoya & Farhan Nikah',
    category: 'Fine Art Traditional',
    year: '2025',
    artType: 'kinetic' as const,
    imageUrl: '/assets/images/baraat.jpg',
    cardClass: 'card-asym-a',
    badge: 'Heritage Haveli'
  },
  {
    id: 'mq-05',
    title: 'Marigold Phoolon Ki Holi',
    category: 'Haldi High-Speed 120FPS',
    year: '2025',
    artType: 'industrial' as const,
    imageUrl: '/assets/images/haldi.jpg',
    cardClass: 'card-asym-b',
    badge: 'Gaya Studio'
  },
  {
    id: 'mq-06',
    title: 'Handmade Flush Albums',
    category: 'Italian Leather Keepsakes',
    year: '2025',
    artType: 'grid' as const,
    imageUrl: '/assets/images/album.jpg',
    cardClass: 'card-asym-c',
    badge: '100-Yr Archival'
  }
];

export const STUDIO_SERVICES = [
  {
    number: '01',
    title: 'Candid Wedding Photography',
    summary: 'Unscripted, natural, and heartfelt. Led by AAFT film director Niraj Singh, we capture spontaneous tears, stolen glances, and euphoric laughter without forced poses.',
    deliverables: ['Unobtrusive Candid Photo Coverage', 'Bridal & Groom Fine-Art Portraits', 'Emotional Family Ritual Documentation', 'High-Res Color-Graded Digital Gallery']
  },
  {
    number: '02',
    title: 'Cinematic Wedding Films & Teasers',
    summary: 'Shot in rich 4K 10-bit cinema resolution using cinema primes, stabilizers, and studio audio. Your wedding film is edited with film-school narrative pacing and licensed emotional soundtracks.',
    deliverables: ['3-5 Minute High-Impact Cinematic Teaser', '30-45 Minute Complete Documentary Film', 'Full Uncut Ceremony & Ritual Speeches', '4K Master Video on Custom USB & Cloud']
  },
  {
    number: '03',
    title: 'Pre-Wedding & Post-Wedding Shoots',
    summary: 'Celebrate your love story in scenic locations—from Bodh Gaya heritage ruins and scenic riverbanks to royal palaces, Delhi NCR, and international shoots in Dubai.',
    deliverables: ['Concept & Moodboard Development', '1-2 Days Destination Location Coverage', 'Drone Aerial Perspectives Included', 'Save-The-Date Film & Curated Photo Book']
  },
  {
    number: '04',
    title: 'Drone Aerial Cinematography',
    summary: 'Licensed high-definition drone operators capturing sweeping grand venue overviews, dramatic baraat processions, and outdoor varmala entries from breathtaking vantage points.',
    deliverables: ['4K 60FPS High-Bitrate Aerial Footage', 'Licensed DGCA-Compliant Safety Operations', 'Venue & Baraat Overhead Tracking', 'Seamless Integration into Wedding Films']
  },
  {
    number: '05',
    title: 'Traditional Photography & 4K Video',
    summary: 'Comprehensive stage and ritual coverage ensuring that every single family member, elder, and visiting guest is respectfully photographed and recorded.',
    deliverables: ['Dedicated Senior Stage Photographers', 'Complete Multi-Camera Stage Video Coverage', 'Lighting Rig for Large Banquet Halls', 'Organized Guest & Family Digital Archives']
  },
  {
    number: '06',
    title: 'Handcrafted Flush-Mount Albums',
    summary: 'Museum-grade wedding photobooks crafted with imported Italian leather, acrylic covers, and 300GSM pearl paper with seamless 180-degree lay-flat panoramic spreads.',
    deliverables: ['Bespoke Storyboard Page Layouts', '180° Lay-Flat Non-Tearable Pages', 'Matching Mini Parent Gift Albums', 'Embossed Wooden Keepsake Storage Box']
  }
];

export const TESTIMONIALS = [
  {
    couple: 'Aanya & Rohan Singhania',
    wedding: 'Heritage Palace, Gaya & Bodh Gaya',
    quote: 'The Royal Films was the single best decision of our wedding! Niraj Singh and his crew were so humble, unobtrusive, and caught moments we did not even realize happened. Our teaser still brings happy tears to our family.',
    year: '2026'
  },
  {
    couple: 'Riya & Kunal Verma',
    wedding: 'Heritage Valley, Rajgir',
    quote: 'From our pre-wedding shoot along the river to the chaotic sangeet night, The Royal Films team made us feel like royalty. The video quality looks like a Netflix film. Truly Bihar’s finest wedding cinematographers.',
    year: '2026'
  },
  {
    couple: 'Dr. Zoya & Farhan Akhtar',
    wedding: 'Chhotki Nawada, Gaya',
    quote: 'They captured the solemnity of our Nikah with such dignity and grace. The leather album they delivered is pure luxury. We recommend The Royal Films to every couple with complete confidence.',
    year: '2025'
  }
];

export const FAQS = [
  {
    question: 'Where is The Royal Films studio located in Gaya?',
    answer: 'Our main studio is located at Chhotki Nawada, Near Gandhi More (Korma Road / AP Colony), Gaya, Bihar 823002. You are warmly welcome to visit by appointment to view our physical albums, cinema reels, and discuss custom wedding packages.'
  },
  {
    question: 'Who leads The Royal Films creative direction?',
    answer: 'The Royal Films is founded and led by Niraj Singh, an alumnus of AAFT (Asian Academy of Film and Television). Our entire crew is trained in cinematic visual storytelling, tech-enabled equipment, and discreet candid photojournalism.'
  },
  {
    question: 'Do you travel for outstation and destination weddings?',
    answer: 'Yes! While our home base is Gaya, Bihar, we routinely travel across Patna, Bodh Gaya, Rajgir, Nalanda, Varanasi, Delhi NCR, and international destinations such as Dubai. Travel and accommodation can be arranged directly by the couple or billed at actuals.'
  },
  {
    question: 'What is your delivery timeline for wedding photos and films?',
    answer: 'We provide an initial preview highlight of 25-35 retouched photos within 72 hours of your wedding. Complete high-resolution edited photos and the cinematic teaser are delivered in 4 to 5 weeks. Handcrafted physical albums are delivered after final layout approval.'
  },
  {
    question: 'Are your wedding packages customizable?',
    answer: 'Yes, completely! Rather than rigid fixed templates, we tailor our packages to match your specific ceremony schedule, family size, multi-day events, and preferred deliverables (candid photography, cinematic films, aerial drone, or heirloom albums).'
  },
  {
    question: 'How do we book The Royal Films for our dates?',
    answer: 'We accept bookings on a first-come, first-served basis with a standard advance deposit. Because we limit our dates to ensure personalized attention and master-quality deliverables, we recommend reserving your date 3 to 6 months in advance for peak wedding seasons.'
  }
];

export const JOURNAL_ARTICLES: JournalArticle[] = [
  {
    id: 'art-01',
    slug: 'wedding-photography-timeline-guide',
    number: 'GUIDE 01',
    title: 'Planning Your Indian Wedding Photography Timeline: Haldi to Bidaai',
    subtitle: 'Expert tips on allocating time for couple portraits, ritual lighting, and avoiding last-minute delays.',
    date: 'OCTOBER 2026',
    readTime: '6 MIN READ',
    category: 'WEDDING GUIDE',
    location: 'Chhotki Nawada, Gaya',
    excerpt: 'The secret to breathtaking wedding photos is not just great gear—it is smart timeline choreography that gives you 20 relaxed minutes for sunset portraits before the banquet chaos starts.',
    content: [
      'In a multi-day Indian wedding, ceremonies often run past schedule due to hair, makeup, or guest arrivals. The single most important advice Niraj Singh and our team give couples is to schedule dedicated couple portraits immediately after bridal and groom makeup is finished, BEFORE entering the varmala stage.',
      'During this 20-to-30-minute window, the bride’s makeup is pristine, the groom’s sherwani is crisp, and you have a quiet moment together to breathe and create intimate heirloom portraits.',
      'For haldi and sangeet events, natural outdoor daylight or warm festoon lighting always produces the most vibrant, flattering photos. Avoid harsh midday direct sun by planning haldi in open shade or under a draped marigold canopy.'
    ],
    tips: [
      'Buffer 45 minutes extra for bridal makeup in your day-of schedule',
      'Schedule couple portraits BEFORE the grand entry, not after the tiring dinner',
      'Inform the venue to dim banquet white fluorescent tubes during cinematic dance performances'
    ],
    artType: 'monolith',
    imageUrl: '/assets/images/varmala.jpg'
  },
  {
    id: 'art-02',
    slug: 'candid-photography-vs-traditional-video',
    number: 'GUIDE 02',
    title: 'Candid Photography vs Traditional Video: What Every Couple Needs',
    subtitle: 'Understanding how candid storytellers and traditional stage teams collaborate for complete coverage.',
    date: 'SEPTEMBER 2026',
    readTime: '5 MIN READ',
    category: 'CINEMA NOTES',
    location: 'The Royal Films Atelier',
    excerpt: 'Candid photography captures the stolen tear from the bride’s mother; traditional photography ensures your grandmother and every visiting guest are proudly documented.',
    content: [
      'Couples frequently ask us whether they need both candid and traditional coverage. The answer for Indian weddings is almost always an enthusiastic YES, because they serve two entirely distinct but equally vital purposes.',
      'Our Candid Photographers and Cinematographers roam freely with silent shutters and fast prime lenses. They look for emotional micro-moments: a spontaneous laugh between brothers, a nervous squeeze of hands, or the bride checking her reflection.',
      'Our Traditional Team anchors the main stage and banquet hall with professional studio lights, guaranteeing that every relative who arrived to bless you has a crisp, well-lit formal family portrait that elders treasure.'
    ],
    tips: [
      'A balanced team typically comprises 2 Candid Photographers, 2 Cinematographers, and 2 Traditional Photographers/Videographers',
      'Drone coverage is ideal for open-air venues, baraat entries, and poolside sangeet setups',
      'Review full albums, not just 5 highlight photos, when evaluating wedding photographers'
    ],
    artType: 'sculpture',
    imageUrl: '/assets/images/portrait_bride.jpg'
  },
  {
    id: 'art-03',
    slug: 'pre-wedding-shoots-in-bihar',
    number: 'GUIDE 03',
    title: 'Breathtaking Pre-Wedding Locations in Gaya, Bodh Gaya & Bihar',
    subtitle: 'From historic Buddhist temples in Bodh Gaya to riverfront twilights and heritage ruins.',
    date: 'AUGUST 2026',
    readTime: '4 MIN READ',
    category: 'LOCATION SPOTLIGHT',
    location: 'Gaya, Bodh Gaya & Rajgir',
    excerpt: 'You do not need to fly across continents for a fairy-tale pre-wedding shoot. Bihar offers rich cultural backdrops, serene riverside twilights, and spiritual heritage sanctuaries.',
    content: [
      'Over the years at The Royal Films, we have explored the most photogenic hidden corners of Bihar for pre-wedding concept shoots. The key to an authentic pre-wedding shoot is comfort and genuine chemistry.',
      'The quiet riverfront and Bodh Gaya architectural sanctuaries at sunrise offer a tranquil mist and warm pastel sky that flatters traditional sarees and western gowns alike. For couples who love history, the rocky terrain and ancient ruins of Rajgir provide dramatic cinematic scale.',
      'We also execute international destination pre-wedding shoots, including luxury desert dunes and modern architectural backdrops in Dubai.'
    ],
    tips: [
      'Begin shoots at 05:30 AM for golden hour dawn light and minimal public crowds',
      'Bring comfortable slip-on flats for walking between camera setups',
      'Trust your photographer and focus on each other rather than staring into the lens'
    ],
    artType: 'monograph',
    imageUrl: '/assets/images/camera_cinema.jpg'
  }
];
