export const img = (id: string, w = 1600) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=75`;

export const HERO_VIDEO = "https://videos.pexels.com/video-files/7578552/7578552-hd_1920_1080_30fps.mp4";
export const FILM_VIDEO = "https://videos.pexels.com/video-files/3773486/3773486-hd_1920_1080_30fps.mp4";

export type Property = {
  slug: string; title: string; location: string; city: string; type: "Villa" | "Penthouse" | "Apartment" | "Townhouse";
  status: "For Sale" | "For Rent"; price: number; beds: number; baths: number; area: number; year: number;
  images: string[]; description: string; features: string[];
};

export const properties: Property[] = [
  { slug: "obsidian-house", title: "Obsidian House", location: "Golf Links", city: "New Delhi", type: "Villa", status: "For Sale", price: 0, beds: 5, baths: 6, area: 6200, year: 2022,
    images: ["1600596542815-ffad4c1539a9","1600607687939-ce8a6c25118c","1600566753190-17f0baa2a6c3","1600585154340-be6161a56a0c"],
    description: "A cantilevered glass-and-concrete residence suspended above the city. Floor-to-ceiling glazing dissolves the line between the living spaces and an infinity pool that seems to pour into the skyline.",
    features: ["Infinity pool","Home cinema","Smart home","Wine cellar","4-car garage","City views"] },
  { slug: "the-monolith", title: "The Monolith", location: "Golf Course Road, DLF Phase 5", city: "Gurugram", type: "Villa", status: "For Sale", price: 0, beds: 6, baths: 8, area: 9100, year: 2023,
    images: ["1613490493576-7fde63acd811","1613977257363-707ba9348227","1600607687939-ce8a6c25118c","1600566753190-17f0baa2a6c3"],
    description: "Sculpted volumes of raw stone and blackened steel frame a private courtyard estate, designed for quiet grandeur and effortless entertaining.",
    features: ["Courtyard garden","Spa & sauna","Guest house","Gym","Outdoor kitchen","Gated entry"] },
  { slug: "skyline-penthouse", title: "Skyline Penthouse", location: "Chanakyapuri", city: "New Delhi", type: "Penthouse", status: "For Sale", price: 0, beds: 3, baths: 3, area: 3400, year: 2021,
    images: ["1512917774080-9991f1c4c750","1502672260266-1c1ef2d93688","1560448204-e02f11c3d0e2","1600585154340-be6161a56a0c"],
    description: "A full-floor penthouse with a wraparound terrace, 12-foot ceilings and private elevator access, crowning one of the Capital's most coveted addresses.",
    features: ["Private elevator","Wraparound terrace","Concierge","Chef's kitchen","Doorman","Parking"] },
  { slug: "casa-linea", title: "Casa Línea", location: "Sector 5", city: "Chandigarh", type: "Villa", status: "For Sale", price: 0, beds: 4, baths: 5, area: 4800, year: 2020,
    images: ["1564013799919-ab600027ffc6","1600585154340-be6161a56a0c","1600566753190-17f0baa2a6c3","1600607687939-ce8a6c25118c"],
    description: "Modernist architecture at its sharpest — clean horizontal lines, shaded loggias and a lap pool framed by mature landscaping.",
    features: ["Lap pool","Lawn garden","Summer kitchen","Climate glass","Office","Courtyard"] },
  { slug: "graphite-loft", title: "Graphite Loft", location: "Civil Lines", city: "Jaipur", type: "Apartment", status: "For Rent", price: 0, beds: 2, baths: 2, area: 1650, year: 2019,
    images: ["1502672260266-1c1ef2d93688","1560448204-e02f11c3d0e2","1512917774080-9991f1c4c750","1600585154340-be6161a56a0c"],
    description: "An industrial loft reimagined — exposed beams, polished concrete and oversized steel windows overlooking historic avenues.",
    features: ["Exposed beams","Roof deck","In-unit laundry","Pet friendly","Gym","Bike storage"] },
  { slug: "meridian-residence", title: "Meridian Residence", location: "Vasant Vihar", city: "New Delhi", type: "Villa", status: "For Sale", price: 0, beds: 5, baths: 5, area: 5600, year: 2018,
    images: ["1580587771525-78b9dba3b914","1600596542815-ffad4c1539a9","1600607687939-ce8a6c25118c","1600566753190-17f0baa2a6c3"],
    description: "Contemporary luxury living with landscaped garden views, a resort-style pool and seamless indoor-outdoor flow.",
    features: ["Garden views","Resort pool","Fire pit","Guest suite","Solar","3-car garage"] },
  { slug: "harbor-townhouse", title: "Harbor Townhouse", location: "Mussoorie Foothills", city: "Dehradun", type: "Townhouse", status: "For Rent", price: 0, beds: 4, baths: 3, area: 3100, year: 2017,
    images: ["1605276374104-dee2a0ed3cd6","1560448204-e02f11c3d0e2","1502672260266-1c1ef2d93688","1512917774080-9991f1c4c750"],
    description: "A restored architectural estate with contemporary interiors, private orchards, and terrace views of the Himalayan foothills.",
    features: ["Private orchard","Roof terrace","Fireplace","Library","Garage","Himalayan views"] },
  { slug: "cube-residence", title: "Cube Residence", location: "Sector 128, Expressway", city: "Noida", type: "Villa", status: "For Sale", price: 0, beds: 4, baths: 4, area: 4200, year: 2024,
    images: ["1600585154340-be6161a56a0c","1564013799919-ab600027ffc6","1600566753190-17f0baa2a6c3","1600607687939-ce8a6c25118c"],
    description: "Brand-new construction of stacked white volumes with golf course views, a rooftop lounge and architect-designed landscape.",
    features: ["Golf view","Rooftop lounge","EV charging","Smart home","Pool","New build"] },
];

export const formatPrice = (p: Property) =>
  p.status === "For Rent" ? `$${p.price.toLocaleString()}/mo` : p.price >= 1e6 ? `$${(p.price / 1e6).toFixed(2)}M` : `$${p.price.toLocaleString()}`;

export const agents = [
  { name: "Elena Vasquez", role: "Founder & Principal Broker", photo: "1573497019940-1c28c88b4f3e" },
  { name: "Marcus Hale", role: "Director, Luxury Sales", photo: "1507003211169-0a1dd7228f2d" },
  { name: "Sofia Laurent", role: "Head of Leasing", photo: "1494790108377-be9c29b29330" },
];
