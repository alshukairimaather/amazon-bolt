/*
  # Seed Product Catalog

  Inserts realistic Amazon-like products across all categories
  with real Pexels image URLs, prices, ratings, and descriptions.
*/

INSERT INTO products (title, description, price, compare_at_price, image_url, images, category, subcategory, brand, rating, review_count, prime, in_stock, stock_count, featured, best_seller, deal_percentage) VALUES

-- Electronics
('Apple AirPods Pro 2nd Generation', 'Active noise cancellation with adaptive transparency. Personalized spatial audio with dynamic head tracking. MagSafe charging case.', 249.00, 279.00, 'https://images.pexels.com/photos/3780681/pexels-photo-3780681.jpeg?auto=compress&cs=tinysrgb&w=600', ARRAY['https://images.pexels.com/photos/3780681/pexels-photo-3780681.jpeg?auto=compress&cs=tinysrgb&w=600','https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=600'], 'Electronics', 'Headphones', 'Apple', 4.70, 98432, true, true, 250, true, true, 11),

('Samsung 65-Inch Class OLED 4K Smart TV', 'Quantum HDR OLED, Dolby Atmos and Object Tracking Sound, LaserSlim Design, Smart TV with Alexa Built-In', 1297.99, 1799.99, 'https://images.pexels.com/photos/6941351/pexels-photo-6941351.jpeg?auto=compress&cs=tinysrgb&w=600', ARRAY['https://images.pexels.com/photos/6941351/pexels-photo-6941351.jpeg?auto=compress&cs=tinysrgb&w=600','https://images.pexels.com/photos/4006179/pexels-photo-4006179.jpeg?auto=compress&cs=tinysrgb&w=600'], 'Electronics', 'TVs', 'Samsung', 4.50, 12456, true, true, 45, true, true, 28),

('Apple MacBook Air 15-inch Laptop M3', 'M3 chip, 15.3-inch Liquid Retina Display, 8GB RAM, 256GB SSD, Up to 18 hours of battery life', 1049.00, 1299.00, 'https://images.pexels.com/photos/18105/drone-photography-landscape-nature-18105.jpeg?auto=compress&cs=tinysrgb&w=600', ARRAY['https://images.pexels.com/photos/18105/drone-photography-landscape-nature-18105.jpeg?auto=compress&cs=tinysrgb&w=600'], 'Electronics', 'Laptops', 'Apple', 4.80, 45678, true, true, 80, true, true, 19),

('Logitech MX Master 3S Wireless Mouse', 'Ultra-fast scrolling, ergonomic design, 8K DPI track-on-glass sensor, USB-C rechargeable', 99.99, 129.99, 'https://images.pexels.com/photos/2115256/pexels-photo-2115256.jpeg?auto=compress&cs=tinysrgb&w=600', ARRAY['https://images.pexels.com/photos/2115256/pexels-photo-2115256.jpeg?auto=compress&cs=tinysrgb&w=600'], 'Electronics', 'Accessories', 'Logitech', 4.60, 23456, true, true, 200, false, true, 23),

-- Clothing & Fashion
('Levis Mens 501 Original Fit Jeans', 'The original jean. Button fly. Straight leg. Sits at the waist. 100% cotton, classic 5-pocket styling', 49.99, 69.50, 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=600', ARRAY['https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=600','https://images.pexels.com/photos/1082529/pexels-photo-1082529.jpeg?auto=compress&cs=tinysrgb&w=600'], 'Clothing', 'Jeans', 'Levis', 4.40, 34521, true, true, 500, true, true, 28),

('Amazon Essentials Womens Slim-Fit V-Neck T-Shirt', 'Cotton blend, slim fit, versatile everyday essential', 12.99, 19.99, 'https://images.pexels.com/photos/2917632/pexels-photo-2917632.jpeg?auto=compress&cs=tinysrgb&w=600', ARRAY['https://images.pexels.com/photos/2917632/pexels-photo-2917632.jpeg?auto=compress&cs=tinysrgb&w=600'], 'Clothing', 'T-Shirts', 'Amazon Essentials', 4.20, 67890, true, true, 1000, false, true, 35),

('Columbia Mens Glennaker Rain Jacket', 'Waterproof, windproof, lightweight packable rain jacket with adjustable features', 59.99, 89.99, 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=600', ARRAY['https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=600'], 'Clothing', 'Jackets', 'Columbia', 4.50, 12345, true, true, 300, true, false, 33),

-- Home & Kitchen
('Ninja AF101 Air Fryer 4 Qt', 'Guilt-free meals made easy with 4-quart ceramic-coated nonstick basket. Wide temperature range.', 69.99, 99.99, 'https://images.pexels.com/photos/5529568/pexels-photo-5529568.jpeg?auto=compress&cs=tinysrgb&w=600', ARRAY['https://images.pexels.com/photos/5529568/pexels-photo-5529568.jpeg?auto=compress&cs=tinysrgb&w=600'], 'Home & Kitchen', 'Kitchen Appliances', 'Ninja', 4.80, 156789, true, true, 150, true, true, 30),

('Keurig K-Mini Single Serve Coffee Maker', 'Brews 6-12oz cups, compact design fits anywhere, compatible with all K-Cup pods', 49.99, 79.99, 'https://images.pexels.com/photos/324028/pexels-photo-324028.jpeg?auto=compress&cs=tinysrgb&w=600', ARRAY['https://images.pexels.com/photos/324028/pexels-photo-324028.jpeg?auto=compress&cs=tinysrgb&w=600'], 'Home & Kitchen', 'Coffee Makers', 'Keurig', 4.40, 89012, true, true, 200, false, true, 38),

('Instant Pot Duo 7-in-1 Electric Pressure Cooker', '7 appliances in 1: pressure cooker, slow cooker, rice cooker, steamer, saute pan, yogurt maker, warmer', 89.95, 119.95, 'https://images.pexels.com/photos/3737586/pexels-photo-3737586.jpeg?auto=compress&cs=tinysrgb&w=600', ARRAY['https://images.pexels.com/photos/3737586/pexels-photo-3737586.jpeg?auto=compress&cs=tinysrgb&w=600'], 'Home & Kitchen', 'Cookware', 'Instant Pot', 4.70, 234567, true, true, 100, true, true, 25),

-- Beauty & Personal Care
('CeraVe Moisturizing Cream for Dry Skin', 'Developed with dermatologists. Hyaluronic acid, ceramides, MVE delivery technology for 24-hour hydration', 16.99, 21.99, 'https://images.pexels.com/photos/3685538/pexels-photo-3685538.jpeg?auto=compress&cs=tinysrgb&w=600', ARRAY['https://images.pexels.com/photos/3685538/pexels-photo-3685538.jpeg?auto=compress&cs=tinysrgb&w=600'], 'Beauty', 'Skincare', 'CeraVe', 4.80, 345678, true, true, 400, true, true, 23),

('Oral-B Pro 1000 Electric Toothbrush', 'Clinically proven superior cleaning vs. manual toothbrush. Pressure sensor, 2 modes, 2-minute timer', 29.94, 49.99, 'https://images.pexels.com/photos/3889871/pexels-photo-3889871.jpeg?auto=compress&cs=tinysrgb&w=600', ARRAY['https://images.pexels.com/photos/3889871/pexels-photo-3889871.jpeg?auto=compress&cs=tinysrgb&w=600'], 'Beauty', 'Oral Care', 'Oral-B', 4.60, 56789, true, true, 250, false, true, 40),

-- Furniture & Home Decor
('Yaheetech L-Shaped Gaming Desk', 'L-shaped corner design, monitor stand, cable management, steel frame, 58.5 inch', 89.99, 139.99, 'https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=600', ARRAY['https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=600','https://images.pexels.com/photos/6444/desk-notebook.jpg?auto=compress&cs=tinysrgb&w=600'], 'Furniture', 'Desks', 'Yaheetech', 4.30, 8765, true, true, 75, false, false, 36),

('ZINUS Mia Modern Studio Sofa', 'Tufted square arm sofa with solid wood frame, cushions included, 78 inch, grey', 329.99, 449.99, 'https://images.pexels.com/photos/186941/pexels-photo-186941.jpeg?auto=compress&cs=tinysrgb&w=600', ARRAY['https://images.pexels.com/photos/186941/pexels-photo-186941.jpeg?auto=compress&cs=tinysrgb&w=600'], 'Furniture', 'Sofas', 'ZINUS', 4.10, 5432, true, true, 30, false, false, 27),

-- Pet Care
('Purina ONE SmartBlend Adult Dry Dog Food', 'Real chicken as the first ingredient. 100% complete nutrition. 31.1 lb. bag', 28.98, 34.99, 'https://images.pexels.com/photos/1633522/pexels-photo-1633522.jpeg?auto=compress&cs=tinysrgb&w=600', ARRAY['https://images.pexels.com/photos/1633522/pexels-photo-1633522.jpeg?auto=compress&cs=tinysrgb&w=600'], 'Pet Supplies', 'Dog Food', 'Purina', 4.70, 45678, true, true, 500, true, true, 17),

('PetSafe ScoopFree Self-Cleaning Cat Litter Box', 'Disposable crystal litter trays, automatic rake, odor control, works with any cat litter', 149.99, 199.99, 'https://images.pexels.com/photos/617272/pexels-photo-617272.jpeg?auto=compress&cs=tinysrgb&w=600', ARRAY['https://images.pexels.com/photos/617272/pexels-photo-617272.jpeg?auto=compress&cs=tinysrgb&w=600'], 'Pet Supplies', 'Cat Supplies', 'PetSafe', 4.20, 12345, true, true, 50, false, false, 25),

-- Toys & Games
('LEGO Star Wars Millennium Falcon Building Set', '1,335 pieces, includes 7 minifigures, interactive building instructions, for ages 9+', 134.99, 169.99, 'https://images.pexels.com/photos/163036/mario-luigi-yoshi-characters-163036.jpeg?auto=compress&cs=tinysrgb&w=600', ARRAY['https://images.pexels.com/photos/163036/mario-luigi-yoshi-characters-163036.jpeg?auto=compress&cs=tinysrgb&w=600'], 'Toys & Games', 'Building Sets', 'LEGO', 4.90, 23456, true, true, 60, true, true, 21),

('Hasbro Gaming Catan Board Game', 'Trade, build and settle the island of Catan. 3-4 players, ages 10+, 60+ minutes playtime', 29.99, 44.99, 'https://images.pexels.com/photos/278918/pexels-photo-278918.jpeg?auto=compress&cs=tinysrgb&w=600', ARRAY['https://images.pexels.com/photos/278918/pexels-photo-278918.jpeg?auto=compress&cs=tinysrgb&w=600'], 'Toys & Games', 'Board Games', 'Catan Studio', 4.70, 34567, true, true, 120, false, true, 33),

-- Books
('Atomic Habits An Easy and Proven Way to Build Good Habits', 'James Clear. No matter your goals, Atomic Habits offers a proven framework for improving every day.', 11.98, 18.00, 'https://images.pexels.com/photos/1741230/pexels-photo-1741230.jpeg?auto=compress&cs=tinysrgb&w=600', ARRAY['https://images.pexels.com/photos/1741230/pexels-photo-1741230.jpeg?auto=compress&cs=tinysrgb&w=600'], 'Books', 'Self-Help', 'Avery', 4.80, 567890, true, true, 800, true, true, 34),

-- Sports & Outdoors
('Hydro Flask Wide Mouth Water Bottle 32 oz', 'TempShield insulation keeps drinks cold 24 hours or hot 12 hours. BPA-free, stainless steel', 34.95, 44.95, 'https://images.pexels.com/photos/1003125/pexels-photo-1003125.jpeg?auto=compress&cs=tinysrgb&w=600', ARRAY['https://images.pexels.com/photos/1003125/pexels-photo-1003125.jpeg?auto=compress&cs=tinysrgb&w=600'], 'Sports & Outdoors', 'Water Bottles', 'Hydro Flask', 4.70, 67890, true, true, 350, true, true, 22),

-- Health
('Vitamin D3 5000 IU Supplement 360 Softgels', 'High potency vitamin D3 for immune support, bone health, and mood. 1-year supply', 12.97, 19.97, 'https://images.pexels.com/photos/5937232/pexels-photo-5937232.jpeg?auto=compress&cs=tinysrgb&w=600', ARRAY['https://images.pexels.com/photos/5937232/pexels-photo-5937232.jpeg?auto=compress&cs=tinysrgb&w=600'], 'Health', 'Supplements', 'NatureWise', 4.50, 78901, true, true, 600, false, true, 35),

-- Automotive
('Meguiars Complete Car Care Kit', '7 items: wash, wax, polish, interior detailer, wheel cleaner, microfiber towels, applicator pads', 34.97, 49.99, 'https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&cs=tinysrgb&w=600', ARRAY['https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&cs=tinysrgb&w=600'], 'Automotive', 'Car Care', 'Meguiars', 4.60, 23456, true, true, 100, false, false, 30),

-- Grocery
('Starbucks Pike Place Roast Medium Roast Coffee', '100% Arabica coffee, smooth and balanced, 28 oz bag, compatible with all coffee makers', 11.99, 15.99, 'https://images.pexels.com/photos/324028/pexels-photo-324028.jpeg?auto=compress&cs=tinysrgb&w=600', ARRAY['https://images.pexels.com/photos/324028/pexels-photo-324028.jpeg?auto=compress&cs=tinysrgb&w=600'], 'Grocery', 'Coffee', 'Starbucks', 4.50, 45678, true, true, 700, true, true, 25),

-- Tools & Home Improvement
('BLACK+DECKER 20V MAX Cordless Drill', 'Lithium-ion battery, 11 clutch settings, LED work light, includes 30 accessories and carrying bag', 49.97, 79.99, 'https://images.pexels.com/photos/162554/hammer-nail-wood-workshop-162554.jpeg?auto=compress&cs=tinysrgb&w=600', ARRAY['https://images.pexels.com/photos/162554/hammer-nail-wood-workshop-162554.jpeg?auto=compress&cs=tinysrgb&w=600'], 'Tools & Home Improvement', 'Power Tools', 'BLACK+DECKER', 4.50, 34567, true, true, 150, true, true, 38),

-- Smart Home Deals
('Echo Dot 5th Gen Smart Speaker with Alexa', 'Better sound than ever, Alexa can play music, answer questions, control smart home devices', 27.99, 49.99, 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=600', ARRAY['https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=600'], 'Electronics', 'Smart Home', 'Amazon', 4.60, 123456, true, true, 300, true, true, 44);
