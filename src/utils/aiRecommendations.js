// Mock AI recommendation engine
// Simulates supplier ranking based on delivery history, locality, and reliability

export function calculateRecommendation(request) {
  // Skip recommendations for claimed requests
  if (request.status !== "Open") {
    return null;
  }

  // Mock logic: generate confidence score based on item name hash
  // This creates consistent but seemingly intelligent recommendations
  const itemHash = request.item.toLowerCase().split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  
  // Base score between 78-96%
  const baseScore = 78 + (itemHash % 18);
  
  // Add small variations based on quantity and delivery
  const quantityBonus = request.quantity.includes('kg') ? 3 : 1;
  const deliveryBonus = request.delivery === "Friday" || request.delivery === "Thursday" ? 2 : 0;
  
  const confidenceScore = Math.min(98, baseScore + quantityBonus + deliveryBonus);

  // Generate supplier name based on item
  const supplierNames = [
    "Green Valley Farms",
    "Local Harvest Co.",
    "Fresh Direct Supply",
    "Urban Garden Hub",
    "Farm-to-Table Partners"
  ];
  
  const supplierIndex = itemHash % supplierNames.length;
  const supplierName = supplierNames[supplierIndex];

  // Generate mock metrics
  const fulfillmentCount = 45 + (itemHash % 55); // 45-100
  const reliabilityScore = 4.2 + (itemHash % 80) / 100; // 4.2-5.0
  
  return {
    supplierName,
    confidenceScore,
    fulfillmentCount,
    reliabilityScore: reliabilityScore.toFixed(1),
    isLocal: true,
    reason: "Based on delivery history and locality"
  };
}
