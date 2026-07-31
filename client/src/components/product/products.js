// src/components/product/products.js

export const allProducts = [
  {
    id: 1,
    title: "Java Programming Book",
    subtitle: "The Complete Reference, 11th Edition",
    originalPrice: "599",
    price: "350", 
    discount: "42% OFF",
    rating: "4.7",
    reviewCount: 28,
    soldCount: 56,
    category: "Books",
    condition: "Like New",
    sellerType: "Student",
    postedDate: "28 July 2024",
    views: 124,
    description: "This book is in like new condition. Very helpful for Java programming practice and interviews.",
    tags: ["Java", "Programming", "Engineering"],
    seller: {
      name: "Rohit Sharma",
      dept: "TY IT",
      rating: "4.8",
      reviews: 32,
      isVerified: true,
      productsListed: 24,
      sold: 56,
      responseRate: "98%",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop"
    },
    pickupLocation: "Pillai College Library, New Panvel",
    preferredTime: "Today, 2:00 PM - 5:00 PM",
    paymentMethod: "Cash on Delivery",
    // Direct path string to public folder image:
    images: [
      "/products/book.jpg"
    ]
  },
  {
    id: 2,
    title: "Dell Inspiron 15",
    subtitle: "8GB RAM • 512GB SSD",
    price: "28,000",
    originalPrice: "38,000",
    discount: "26% OFF",
    rating: "4.7",
    category: "Electronics",
    condition: "Used",
    images: [
      "/products/laptop.jpg"
    ]
  }
];