export const stages = [
  "Discovered",
  "Engaging (1 week)",
  "DM Sent",
  "Negotiating",
  "Assets Provided",
] as const

export type Stage = (typeof stages)[number]

export type Influencer = {
  id: string
  name: string
  handle: string
  initials: string
  niche: string
  platform: "Instagram" | "YouTube" | "TikTok"
  followers: number
  engagement: number
  location: string
  stage: Stage
  fitScore: number
  note: string
}

export const seedInfluencers: Influencer[] = [
  ["maya-chen", "Maya Chen", "@mayamoves", "MC", "Wellness", "Instagram", 48200, 6.8, "Austin, US", "Discovered", 94, "Mindful movement and sustainable routines."],
  ["arjun-mehta", "Arjun Mehta", "@minimalplates", "AM", "Food", "Instagram", 31500, 8.2, "Mumbai, IN", "Engaging (1 week)", 92, "Minimal recipes for ambitious professionals."],
  ["leila-noor", "Leila Noor", "@leilalately", "LN", "Lifestyle", "TikTok", 67400, 7.4, "Dubai, UAE", "DM Sent", 91, "Premium everyday lifestyle with warm storytelling."],
  ["theo-banks", "Theo Banks", "@theobuilds", "TB", "Technology", "YouTube", 22900, 9.1, "London, UK", "Negotiating", 90, "Clear, trusted explainers for curious builders."],
  ["nia-walker", "Nia Walker", "@niatravelslight", "NW", "Travel", "Instagram", 55700, 5.9, "Lisbon, PT", "Assets Provided", 89, "Slow travel guides with a design-forward eye."],
  ["sofia-reyes", "Sofia Reyes", "@studio.sofia", "SR", "Design", "Instagram", 19800, 10.3, "Mexico City, MX", "Discovered", 88, "Small-space interiors and joyful objects."],
  ["daniel-kim", "Daniel Kim", "@runwithdan", "DK", "Fitness", "TikTok", 73900, 6.2, "Seoul, KR", "Engaging (1 week)", 87, "Approachable running science and daily progress."],
  ["amara-okafor", "Amara Okafor", "@amarawrites", "AO", "Business", "Instagram", 28400, 7.8, "Lagos, NG", "DM Sent", 86, "Founder stories and thoughtful growth lessons."],
  ["lucas-martin", "Lucas Martin", "@lucasoutside", "LM", "Outdoors", "YouTube", 41600, 5.7, "Vancouver, CA", "Negotiating", 85, "Weekend adventures with practical field tests."],
  ["zoe-patel", "Zoe Patel", "@zoedoesmoney", "ZP", "Finance", "Instagram", 36300, 8.7, "Singapore, SG", "Discovered", 84, "Friendly personal finance for first-job earners."],
  ["hana-sato", "Hana Sato", "@hanaskinnotes", "HS", "Beauty", "TikTok", 62400, 7.1, "Tokyo, JP", "Engaging (1 week)", 83, "Ingredient-led skincare without the noise."],
  ["eli-turner", "Eli Turner", "@eliathome", "ET", "Home", "Instagram", 24700, 9.6, "Portland, US", "Assets Provided", 82, "Calm DIY projects for character-filled homes."],
  ["ines-costa", "Inês Costa", "@ineswears", "IC", "Fashion", "Instagram", 58900, 6.4, "Porto, PT", "Discovered", 81, "Circular fashion and expressive capsule wardrobes."],
  ["samira-ali", "Samira Ali", "@learnwithsamira", "SA", "Education", "YouTube", 17800, 11.2, "Toronto, CA", "DM Sent", 80, "Study systems grounded in cognitive science."],
  ["owen-wright", "Owen Wright", "@owenmakes", "OW", "Creator Economy", "TikTok", 45300, 7.6, "Melbourne, AU", "Discovered", 79, "Behind-the-scenes creator systems and tools."],
  ["priya-shah", "Priya Shah", "@plantspaced", "PS", "Sustainability", "Instagram", 21600, 9.4, "Bengaluru, IN", "Negotiating", 78, "Low-waste living for small urban spaces."],
  ["marco-silva", "Marco Silva", "@marcoframes", "MS", "Photography", "YouTube", 38400, 6.9, "São Paulo, BR", "Discovered", 77, "Cinematic photography made understandable."],
  ["ava-brooks", "Ava Brooks", "@avareadswell", "AB", "Books", "TikTok", 81200, 5.8, "Chicago, US", "Engaging (1 week)", 76, "Energetic book discovery and honest reviews."],
  ["noah-williams", "Noah Williams", "@noahbrews", "NW", "Coffee", "Instagram", 14200, 12.4, "Manchester, UK", "DM Sent", 75, "Specialty coffee without the gatekeeping."],
  ["mila-jensen", "Mila Jensen", "@milaunplugged", "MJ", "Parenting", "Instagram", 26900, 8.1, "Copenhagen, DK", "Discovered", 74, "Calm, candid family life and screen-free play."],
].map(([id, name, handle, initials, niche, platform, followers, engagement, location, stage, fitScore, note]) => ({
  id: id as string,
  name: name as string,
  handle: handle as string,
  initials: initials as string,
  niche: niche as string,
  platform: platform as Influencer["platform"],
  followers: followers as number,
  engagement: engagement as number,
  location: location as string,
  stage: stage as Stage,
  fitScore: fitScore as number,
  note: note as string,
}))

const storageKey = "vvj-influencers-v1"

export function loadInfluencers(): Influencer[] {
  if (typeof window === "undefined") return seedInfluencers
  const stored = window.localStorage.getItem(storageKey)
  if (!stored) return seedInfluencers
  try {
    const parsed = JSON.parse(stored) as Influencer[]
    return Array.isArray(parsed) && parsed.length ? parsed : seedInfluencers
  } catch {
    return seedInfluencers
  }
}

export function saveInfluencers(influencers: Influencer[]) {
  if (typeof window !== "undefined") window.localStorage.setItem(storageKey, JSON.stringify(influencers))
}

export function createInfluencer(target: string): Influencer {
  const cleaned = target.replace(/^https?:\/\/(www\.)?/, "").replace(/^(instagram|tiktok)\.com\//, "").replace(/^@/, "").split(/[/?#]/)[0] || "newcreator"
  const display = cleaned.replace(/[._-]+/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase())
  const hash = cleaned.split("").reduce((sum, character) => sum + character.charCodeAt(0), 0)
  return {
    id: `${cleaned.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${Date.now()}`,
    name: display,
    handle: `@${cleaned}`,
    initials: display.split(" ").map((part) => part[0]).join("").slice(0, 2).toUpperCase(),
    niche: "New prospect",
    platform: target.toLowerCase().includes("tiktok") ? "TikTok" : "Instagram",
    followers: 12000 + (hash % 54000),
    engagement: Number((4.5 + (hash % 71) / 10).toFixed(1)),
    location: "Remote",
    stage: "Discovered",
    fitScore: 72 + (hash % 24),
    note: "Newly identified creator ready for qualification and warm engagement.",
  }
}

export function formatFollowers(value: number) {
  return `${(value / 1000).toFixed(value >= 100000 ? 0 : 1)}K`
}
