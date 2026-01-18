import SupplierProfile from '../models/SupplierProfile.js';

export const getProfile = async (req, res, next) => {
  try {
    const profile = await SupplierProfile.findOne({ user: req.user._id })
      .populate('user', 'name email role');

    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    res.json({
      success: true,
      data: profile,
    });
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const { products, location } = req.body;

    const profile = await SupplierProfile.findOneAndUpdate(
      { user: req.user._id },
      { products, location },
      { new: true, upsert: true }
    ).populate('user', 'name email role');

    res.json({
      success: true,
      data: profile,
    });
  } catch (error) {
    next(error);
  }
};
