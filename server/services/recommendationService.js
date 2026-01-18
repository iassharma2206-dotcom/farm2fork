import SupplierProfile from '../models/SupplierProfile.js';
import Order from '../models/Order.js';

export const getRecommendations = async (buyRequest) => {
  try {
    const suppliers = await SupplierProfile.find({
      products: { $regex: buyRequest.item, $options: 'i' },
    }).populate('user', 'name email');

    const recommendations = await Promise.all(
      suppliers.map(async (profile) => {
        const pastOrders = await Order.countDocuments({
          supplier: profile.user._id,
          status: 'delivered',
        });

        const totalOrders = profile.totalOrders || 0;
        const fulfillmentRate = totalOrders > 0 ? (pastOrders / totalOrders) * 100 : 0;
        const reliabilityScore = profile.rating || 0;
        const localityBonus = 10;

        // Calculate confidence score
        const baseScore = fulfillmentRate * 0.4 + reliabilityScore * 10 + localityBonus;
        const confidenceScore = Math.min(98, Math.max(70, Math.round(baseScore)));

        return {
          supplierId: profile.user._id,
          supplierName: profile.user.name,
          confidenceScore,
          fulfillmentCount: pastOrders,
          reliabilityScore: profile.rating.toFixed(1),
          location: profile.location,
        };
      })
    );

    return recommendations.sort((a, b) => b.confidenceScore - a.confidenceScore);
  } catch (error) {
    console.error('Recommendation error:', error);
    return [];
  }
};
