class ProductDatabase {
  constructor() {
    this.products = {
      GROCERY: {
        DRINKS: [
          { id: "drink-1", name: "Orange Juice 1L", price: 3.99, img: "https://images.unsplash.com/photo-1541976076758-347942db1970?q=80&w=600&auto=format&fit=crop" },
          { id: "drink-2", name: "Sparkling Water", price: 1.49, img: "https://images.unsplash.com/photo-1523374228107-6e44bd2b524e?q=80&w=600&auto=format&fit=crop" }
        ],
        BAKERY: [
          { id: "bakery-1", name: "Fresh Baguette", price: 2.49, img: "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=600&auto=format&fit=crop" },
          { id: "bakery-2", name: "Croissant 2pc", price: 3.29, img: "https://images.unsplash.com/photo-1541599540903-216a46caab26?q=80&w=600&auto=format&fit=crop" }
        ]
      },
      MEAT: {
        CHICKEN: [
          { id: "chicken-1", name: "Whole Chicken", price: 11.99, img: "https://images.unsplash.com/photo-1586511925558-c74907a3b5b4?q=80&w=600&auto=format&fit=crop" },
          { id: "chicken-2", name: "Chicken Breast (500g)", price: 7.49, img: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=600&auto=format&fit=crop" }
        ]
      },
      VEGETABLE: [
        { id: "veg-1", name: "Tomatoes (1kg)", price: 2.99, img: "https://images.unsplash.com/photo-1546470427-e66b7d6f3f9a?q=80&w=600&auto=format&fit=crop" }
      ]
    };
  }

  getAllProducts() {
    return this.products;
  }

  findProductById(id) {
    for (const category of Object.values(this.products)) {
      if (Array.isArray(category)) {
        const found = category.find(p => p.id === id);
        if (found) return found;
      } else {
        for (const subcategory of Object.values(category)) {
          const found = subcategory.find(p => p.id === id);
          if (found) return found;
        }
      }
    }
    return null;
  }
}

export const DB = new ProductDatabase();
