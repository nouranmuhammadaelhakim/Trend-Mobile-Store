import { FaHeadphones, FaMobileAlt, FaTools, FaChargingStation, FaClock } from 'react-icons/fa';

export const categories = [
  {
    id: 1,
    title: "Airpods",
    image: "/assets/category-airpods.jpg", // Placeholder, will need real images or placeholders
    icon: <FaHeadphones />,
    link: "/category/airpods"
  },
  {
    id: 2,
    title: "Smart Watches",
    image: "/assets/category-watches.jpg",
    icon: <FaClock />,
    link: "/category/smart-watches"
  },
  {
    id: 3,
    title: "Phone Cases",
    image: "/assets/category-cases.jpg",
    icon: <FaMobileAlt />,
    link: "/category/phone-cases"
  },
  {
    id: 4,
    title: "Maintenance",
    image: "/assets/category-maintenance.jpg",
    icon: <FaTools />,
    link: "/category/maintenance"
  },
  {
    id: 5,
    title: "Chargers",
    image: "/assets/category-chargers.jpg",
    icon: <FaChargingStation />,
    link: "/category/chargers"
  }
];

export const products = [
  {
    id: 101,
    name: "IPhone 13 Pro max",
    category: "Phone Cases",
    price: 250,
    oldPrice: 350,
    image: "/assets/product-case-1.jpg",
    isNew: true,
    isBestSeller: false
  },
  {
    id: 102,
    name: "Anker charger",
    category: "Chargers",
    price: 350,
    image: "/assets/product-charger-1.jpg",
    isNew: true,
    isBestSeller: false
  },
  {
    id: 103,
    name: "Apple airpods",
    category: "Airpods",
    price: 2500,
    image: "/assets/product-airpods-1.jpg",
    isNew: true,
    isBestSeller: true
  },
  {
    id: 104,
    name: "Samsung S24 Ultra",
    category: "Phone Cases",
    price: 300,
    image: "/assets/product-case-2.jpg",
    isNew: true,
    isBestSeller: false
  },
  {
    id: 105,
    name: "Headphone",
    category: "Airpods",
    price: 500,
    image: "/assets/product-headphone-1.jpg",
    isNew: false,
    isBestSeller: true
  },
  {
    id: 106,
    name: "Smart Watch Series 7",
    category: "Smart Watches",
    price: 6000,
    image: "/assets/product-watch-1.jpg",
    isNew: false,
    isBestSeller: true
  },
    {
    id: 107,
    name: "Iphone Xs Max Case",
    category: "Phone Cases",
    price: 150,
    image: "/assets/product-case-3.jpg",
    isNew: false,
    isBestSeller: true
  }
];
