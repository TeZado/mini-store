import { catchAsyncError } from "../middleware/catchAsyncError.js";
import ErrorHandler from "../middleware/error.js";
import Item from "../models/ItemSchema.js";
import { sendToken } from "../utils/jwtToken.js";

export const addItem = catchAsyncError(async (req, res, next) => {
  const { Item_Number, Item_Name, HSN_SAC, Price, GST } = req.body;

  if (!Item_Number || !Item_Name || !HSN_SAC || !Price || !GST) {
    return next(new ErrorHandler("Please Add All Item Details...."));
  }

  const isItem_Name = await Item.findOne({ Item_Name });
  if (isItem_Name) {
    return next(
      new ErrorHandler(
        "Cannot add same item again, Item with this name already Exist..."
      )
    );
  }

  const item = await Item.create({
    Item_Number,
    Item_Name,
    HSN_SAC,
    Price,
    GST,
  });
  sendToken(item, 200, res, "New Item Added Successfully...");
});

export const getItems = catchAsyncError(async (req, res, next) => {
  const items = await Item.find();

  res.status(200).json({
    success: true,
    items,
  });
});

export const findItems = catchAsyncError(async (req, res, next) => {
  const { Item_Name } = req.params;
  console.log(req.params)
  const items = await Item.find({ Item_Name:{$regex:Item_Name} });

  res.status(200).json({
    success: true,
    items,
  });
});

export const editItem = catchAsyncError(async (req, res, next) => {
  const { id } = req.params; // Item ID from URL params
  const { Item_Name } = req.body; // New Item name from the request body

  let item = await Item.findById(id); // Find the item by ID

  if (!item) {
    return next(new ErrorHandler("Item not found with the provided ID", 404)); // If item not found
  }

  // Check if another item with the same name exists but is not the current item
  const isItem_Name = await Item.findOne({ Item_Name, _id: { $ne: id } });

  if (isItem_Name) {
    return next(new ErrorHandler("Item with this name already exists...", 400)); // Error if another item with the same name exists
  }

  // Update the item with new details
  item = await Item.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  // Send the updated item in response
  res.status(200).json({
    success: true,
    message: "Item details updated successfully",
    item,
  });
});

export const deleteItem = catchAsyncError(async (req, res, next) => {
  const { id } = req.params; // Corrected 'req.param' to 'req.params'

  // Find the item by ID
  let item = await Item.findById(id);

  // If the item is not found
  if (!item) {
    return next(new ErrorHandler("Item not found with the provided ID", 404));
  }

  // Delete the item
  await Item.findByIdAndDelete(id);

  // Return the success response
  res.status(200).json({
    success: true,
    message: "Item has been removed from the list successfully",
    item,
  });
});
