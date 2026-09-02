export const works = [
  {
    id: "luminous-fold",
    title: "Luminous Fold",
    artist: "Nia Vale",
    category: "spatial",
    categoryLabel: "Spatial study",
    image: "assets/images/luminous-fold.webp",
    alt: "Interlocking translucent violet and cyan ribbons floating in darkness",
    price: 480,
    editionSize: 18,
    available: 7,
    year: 2026,
    dimensions: "2400 × 2400 px",
    medium: "Generative 3D study",
    description: "A continuous ribbon turns through itself without arriving at an edge. Glass, metal, and light exchange roles as the form rotates.",
    storyTitle: "A shape with no front",
    story: "Luminous Fold began as an exercise in removing the privileged viewpoint. Every turn offers a new beginning, while the same band remains intact. The work rewards slow inspection rather than a single decisive glance."
  },
  {
    id: "signal-bloom",
    title: "Signal Bloom",
    artist: "Mara Sol",
    category: "organic",
    categoryLabel: "Organic geometry",
    image: "assets/images/signal-bloom.webp",
    alt: "Angular violet and coral crystalline bloom surrounded by fine orbital lines",
    price: 360,
    editionSize: 24,
    available: 11,
    year: 2026,
    dimensions: "2400 × 2400 px",
    medium: "Procedural crystal study",
    description: "Crystalline planes open like petals around a dense center, catching violet, coral, and cyan light along their edges.",
    storyTitle: "Growth translated into signal",
    story: "Signal Bloom treats growth as an accumulation of directions rather than a smooth curve. Fine orbital traces hold the sharper planes together, preserving a sense of motion without turning the work into a literal flower."
  },
  {
    id: "quiet-orbit",
    title: "Quiet Orbit",
    artist: "Ivo Ren",
    category: "kinetic",
    categoryLabel: "Kinetic form",
    image: "assets/images/quiet-orbit.webp",
    alt: "Concentric obsidian and glass structures balanced around a warm radiant core",
    price: 620,
    editionSize: 12,
    available: 3,
    year: 2026,
    dimensions: "2400 × 2400 px",
    medium: "Digital material study",
    description: "Stone and glass segments hold a precise orbit around a warm core, balancing mechanical order with visible weight.",
    storyTitle: "Stillness under tension",
    story: "Quiet Orbit holds its energy inside the frame. The concentric structure suggests rotation, yet every element appears suspended at the exact point before movement begins. Its tension comes from that withheld action."
  }
];

export function findWork(id) {
  return works.find((work) => work.id === id);
}
