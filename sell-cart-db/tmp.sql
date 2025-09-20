INSERT INTO categories (category_name)
VALUES 
  ('Computers'),      
  ('Laptops'),
  ('PC Components'), 
  ('Monitors'),
  ('Accessories'),
  ('Storage Devices'); 



-- ---- Computers (category_id = 1) ----
INSERT INTO products (product_id, product_name, image, description, quantity, price, discount, special_price, category_id)
VALUES
(1, 'Custom Gaming PC – Used', 'default.svg', 'Ryzen 5 5600X, RTX 3070 16GB RAM, 1TB SSD', 2, 1100, 10, 990, 1),
(2, 'Dell Alienware Aurora R10 – Used', 'default.svg', 'AMD Ryzen 7 5800, RTX 3080, 32GB RAM, 1TB SSD', 1, 1500, 8, 1380, 1),
(3, 'HP Omen 45L Desktop – Used', 'default.svg', 'Intel i9-12900K, RTX 3080 Ti, 32GB RAM, 2TB SSD', 1, 2000, 12, 1760, 1),
(4, 'Acer Predator Orion 3000 – Used', 'default.svg', 'Intel i7-11700F, RTX 3060 Ti, 16GB RAM, 1TB SSD', 3, 1200, 7, 1116, 1),
(5, 'Lenovo Legion T5 Desktop – Used', 'default.svg', 'Ryzen 7 5800X, RTX 3070 Ti, 32GB RAM, 1TB SSD', 2, 1400, 9, 1274, 1);

-- ---- Laptops (category_id = 2) ----
INSERT INTO products (product_id, product_name, image, description, quantity, price, discount, special_price, category_id)
VALUES
(6, 'Dell XPS 13 – Used', 'default.svg', '13-inch laptop with Intel i7, 16GB RAM, 512GB SSD', 2, 850, 5, 807.5, 2),
(7, 'MacBook Pro 14-inch – Used', 'default.svg', 'Apple M1 Pro chip, 16GB RAM, 512GB SSD', 1, 1400, 10, 1260, 2),
(8, 'Lenovo ThinkPad X1 Carbon – Used', 'default.svg', '14-inch business laptop with Intel i5, 8GB RAM, 256GB SSD', 3, 700, 5, 665, 2),
(9, 'HP Spectre x360 – Used', 'default.svg', '2-in-1 laptop, Intel i7, 16GB RAM, 512GB SSD', 1, 950, 5, 902.5, 2),
(10, 'ASUS ZenBook 14 – Used', 'default.svg', '14-inch laptop with AMD Ryzen 7, 16GB RAM, 512GB SSD', 4, 800, 6, 752, 2);

-- ---- PC Components (category_id = 3) ----
INSERT INTO products (product_id, product_name, image, description, quantity, price, discount, special_price, category_id)
VALUES
(11, 'Intel Core i7-12700K – Used', 'default.svg', '12th Gen 12-core CPU', 5, 250, 8, 230, 3),
(12, 'AMD Ryzen 7 5800X – Used', 'default.svg', '8-core CPU, 16 threads', 3, 220, 10, 198, 3),
(13, 'NVIDIA RTX 3080 – Used', 'default.svg', '10GB GDDR6X GPU', 2, 550, 12, 484, 3),
(14, 'Corsair Vengeance DDR4 32GB – Used', 'default.svg', '2x16GB 3200MHz RAM kit', 4, 90, 5, 85.5, 3),
(15, 'Samsung 970 EVO Plus 1TB – Used', 'default.svg', 'NVMe M.2 SSD', 6, 80, 7, 74.4, 3);

-- ---- Monitors (category_id = 4) ----
INSERT INTO products (product_id, product_name, image, description, quantity, price, discount, special_price, category_id)
VALUES
(16, 'Dell UltraSharp 27” – Used', 'default.svg', '27-inch QHD IPS monitor', 3, 200, 6, 188, 4),
(17, 'LG 34” Ultrawide – Used', 'default.svg', '34-inch ultrawide monitor 144Hz', 2, 300, 8, 276, 4),
(18, 'ASUS TUF Gaming 27” – Used', 'default.svg', '27-inch 165Hz gaming monitor', 4, 180, 5, 171, 4);

-- ---- Accessories (category_id = 5) ----
INSERT INTO products (product_id, product_name, image, description, quantity, price, discount, special_price, category_id)
VALUES
(19, 'Logitech MX Master 3S – Used', 'default.svg', 'Wireless ergonomic mouse', 6, 70, 5, 66.5, 5),
(20, 'Keychron K8 Wireless – Used', 'default.svg', 'Mechanical keyboard', 5, 80, 5, 76, 5),
(21, 'SteelSeries Arctis 7 – Used', 'default.svg', 'Wireless gaming headset', 3, 120, 8, 110.4, 5),
(22, 'Razer Mouse Pad – Used', 'default.svg', 'Large gaming mouse pad', 10, 20, 0, 20, 5);

-- ---- Storage Devices (category_id = 6) ----
INSERT INTO products (product_id, product_name, image, description, quantity, price, discount, special_price, category_id)
VALUES
(23, 'Western Digital 2TB External HDD', 'default.svg', 'USB 3.0 portable hard drive', 5, 50, 5, 47.5, 6),
(24, 'Samsung T7 Portable SSD 1TB', 'default.svg', 'USB-C external SSD', 3, 100, 7, 93, 6),
(25, 'Seagate Barracuda 4TB HDD', 'default.svg', '3.5-inch desktop hard drive', 4, 60, 6, 56.4, 6);
