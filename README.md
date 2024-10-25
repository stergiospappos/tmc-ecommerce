# TMC E-commerce - Watches Distributor Demo

A demo project showcasing a luxurious hero and product archive page for a watch distributor e-commerce site. This project focuses on creating a seamless shopping experience with dynamic functionality and stylish design elements.

## Features

### Product Listing and Filtering

- **Dynamic Product Display**: Automatically displays products from an array for an organized, up-to-date listing.
- **Filter by Brand**: Users can filter products by brand for easy navigation and improved UX.
- **Reset Filters**: A reset button is available to clear all filters and show the full product catalog again.
- **Search Box**: The search box allows users to search for products by name, showing relevant results as they type.

### Mini Cart Functionality

- **Add to Cart**: Users can add items to the cart, which displays with a smooth animation upon adding or by clicking the cart icon in the header.
- **Remove from Cart**: Remove items directly from the cart.
- **Quantity Management**: Users can increase the quantity of each product within the mini cart.
- **Subtotal and VAT Calculation**: The cart calculates item totals, adds VAT, and displays the final price to provide transparency at checkout.

### UI & UX Enhancements

- **Smooth Scrolling with Lenis**: Integrated Lenis for smooth scrolling, adding a luxurious feel to the browsing experience.
- **Responsive Design**: Optimized for all screen sizes to ensure a consistent experience on mobile, tablet, and desktop.
- **Consistent Styling**: Uses normalize.css for browser consistency, a custom local font, and defined variables for font sizes, colors, and spacing.

## Technical Details

### Dependencies

- **Lenis Smooth Scrolling**: Used to create smooth scrolling for enhanced UX.
- **normalize.css**: Ensures uniform rendering across different browsers.

### Styling

- **Custom Fonts and Variables**: Includes custom local fonts and variables for streamlined styling adjustments.
- **Responsiveness**: CSS media queries are used to ensure the layout adapts smoothly across all device types and resolutions.

## Known Issues

1. **Add to Cart After Filtering**: Currently, adding a product to the cart does not work correctly if filters are applied.
2. **Subtotal Calculation**: The cart subtotal does not update when increasing the quantity of items already in the cart.
3. **Duplicate Products in Cart**: Adding the same item multiple times creates separate entries instead of increasing the quantity.

---
