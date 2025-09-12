CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    description TEXT,
    image VARCHAR(500),
    category VARCHAR(50) NOT NULL,
    discount BOOLEAN DEFAULT FALSE
);

INSERT INTO products (name, price, description, image, category, discount) VALUES
('Vestido de Verano', 49.99, 'Vestido ligero perfecto para los días calurosos de verano.', 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80', 'mujer', false),
('Abrigo de Invierno', 129.99, 'Abrigo cálido con 30% de descuento en oferta especial.', 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80', 'ofertas', true),
('Camisa de Algodón', 39.99, 'Camisa clásica de algodón para uso diario.', 'https://images.unsplash.com/photo-1621072156002-e2fccdc0b176?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80', 'hombre', false),
('Zapatillas Deportivas', 89.99, 'Zapatillas cómodas para running y entrenamiento.', 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80', 'deportes', false),
('Falda Elegante', 45.99, 'Falda midi perfecta para ocasiones formales.', 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80', 'mujer', false),
('Jeans Slim Fit', 59.99, 'Jeans ajustados de última tendencia con 20% de descuento.', 'https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80', 'ofertas', true),
('Chaqueta de Cuero', 199.99, 'Chaqueta de cuero genuino para un look rebelde.', 'https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80', 'hombre', false),
('Vestido de Noche', 89.99, 'Elegante vestido para eventos nocturnos y fiestas.', 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80', 'mujer', false),
('Sudadera con Capucha', 49.99, 'Sudadera cómoda para días casuales con 15% de descuento.', 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80', 'ofertas', true),
('Traje de Baño', 34.99, 'Traje de baño de una pieza con diseño moderno.', 'https://images.unsplash.com/photo-1581338834647-b0fb40704e21?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80', 'mujer', false),
('Camiseta Básica', 19.99, 'Camiseta de algodón 100% en varios colores.', 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80', 'hombre', false),
('Zapatos Formales', 129.99, 'Zapatos de cuero para ocasiones especiales.', 'https://images.unsplash.com/photo-1463100099107-aa0980c362e6?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80', 'hombre', false),
('Bolso de Mano', 79.99, 'Bolso elegante con espacio suficiente para tus essentials.', 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80', 'accesorios', false),
('Gafas de Sol', 59.99, 'Gafas de sol con protección UV y diseño trendy.', 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80', 'accesorios', false),
('Blusa de Seda', 69.99, 'Blusa elegante de seda natural para looks sofisticados.', 'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80', 'mujer', false),
('Chaqueta de Mezclilla', 59.99, 'Chaqueta de mezclilla moderna para un look casual.', 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80', 'hombre', false),
('Bolso de tela', 49.99, 'Bolso de tela casual con diseño moderno.', 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80', 'accesorios', false),
('Shorts Deportivos', 35.99, 'Shorts cómodos para entrenamiento y actividades físicas.', 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80', 'deportes', false),
('Suéter de Lana', 74.99, 'Suéter abrigado de lana merino para los días fríos.', 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80', 'hombre', false),
('Bufanda de Invierno', 24.99, 'Bufanda tejida de lana para mantener el calor en invierno.', 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80', 'accesorios', false);

CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_discount ON products(discount);
