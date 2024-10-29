



import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  TextInput,
  Dimensions,
  SafeAreaView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

const initialProducts = [
  {
    id: 1,
    name: "360 Block Sunscreen Gel SPF 50+",
    category: "Sunscreen",
    rating: 4.77,
    reviews: 100,
    originalPrice: 899,
    discountedPrice: 769,
    discount: 14,
    image: "https://m.media-amazon.com/images/I/51RnEZJ82WL.jpg",
    description:
      "360 Block Sunscreen Gel SPF 50+ offers comprehensive 360-degree photoprotection from UVA, UVB, IR, blue light, and atmosph...",
  },
  {
    id: 2,
    name: "8X Shampoo",
    category: "Hair Cleanser",
    rating: 4.58,
    reviews: 50,
    originalPrice: 490,
    discountedPrice: 399,
    discount: 19,
    image:
      "https://www.bigbasket.com/media/uploads/p/xxl/202243_12-pantene-pro-v-advanced-solution-shampoo-hairfall-control-strengthens-roots.jpg",
    description:
      "8X Shampoo is a medicated formula containing Ciclopirox and Zinc Pyrithione, designed to effectively treat dandruff and se...",
  },
  {
    id: 3,
    name: "8X-KT Advanced Scalp Care Shampoo",
    category: "Hair Cleanser",
    rating: 4.28,
    reviews: 75,
    originalPrice: 275,
    discountedPrice: 219,
    discount: 20,
    image: "https://m.media-amazon.com/images/I/511tl+qwZeL.jpg",
    description:
      "8X-KT Advanced Scalp Care Shampoo is an advanced hair and scalp treatment designed to address common concerns like dandruf...",
  },
];

const Header = () => (
  <View style={styles.header}>
    <View style={styles.promoContainer}>
      <Ionicons name="videocam-outline" size={20} color="#8a2be2" />
      <Text style={styles.promoText}>Get Derma Consult NOW @ ₹499 ₹249</Text>
    </View>
    <Text style={styles.logo}>Clinikally.</Text>
    <View style={styles.headerRightContainer}>
      <TouchableOpacity style={styles.headerButton}>
        <Ionicons name="person-outline" size={24} color="#333" />
        <Text style={styles.headerButtonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.headerButton}>
        <Ionicons name="cart-outline" size={24} color="#333" />
        <Text style={styles.headerButtonText}>Cart</Text>
        <View style={styles.cartBadge}>
          <Text style={styles.cartBadgeText}>0</Text>
        </View>
      </TouchableOpacity>
    </View>
  </View>
);

const Navigation = () => (
  <ScrollView
    horizontal
    showsHorizontalScrollIndicator={false}
    style={styles.nav}
  >
    {[
      "Brands",
      "Skin",
      "Hair",
      "Supplements",
      "Pediatric",
      "Shop All",
      "LUXE",
      "Treatment Finder",
      "More",
    ].map((item) => (
      <TouchableOpacity key={item} style={styles.navItem}>
        <Text style={styles.navItemText}>{item}</Text>
        {item === "LUXE" && (
          <View style={styles.newBadge}>
            <Text style={styles.newBadgeText}>NEW</Text>
          </View>
        )}
      </TouchableOpacity>
    ))}
  </ScrollView>
);

const Sidebar = ({ filters, setFilters }) => {
  const [expandedCategories, setExpandedCategories] = useState({});

  const toggleCategory = (category) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const toggleFilter = (category, item) => {
    setFilters((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [item]: !prev[category][item],
      },
    }));
  };

  return (
    <ScrollView style={styles.sidebar}>
      <Text style={styles.sidebarTitle}>Filters</Text>
      {Object.entries(filters).map(([category, items]) => (
        <View key={category} style={styles.categoryContainer}>
          <TouchableOpacity
            onPress={() => toggleCategory(category)}
            style={styles.categoryButton}
          >
            <Text style={styles.categoryButtonText}>{category}</Text>
            <Ionicons
              name={
                expandedCategories[category]
                  ? "chevron-down"
                  : "chevron-forward"
              }
              size={20}
              color="#8a2be2"
            />
          </TouchableOpacity>
          {expandedCategories[category] && (
            <View style={styles.categoryItems}>
              {Object.entries(items).map(([item, isSelected]) => (
                <TouchableOpacity
                  key={item}
                  style={styles.checkboxContainer}
                  onPress={() => toggleFilter(category, item)}
                >
                  <View
                    style={[
                      styles.checkbox,
                      isSelected && styles.checkboxSelected,
                    ]}
                  />
                  <Text style={styles.checkboxLabel}>{item}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      ))}
    </ScrollView>
  );
};

const ProductCard = ({ product }) => (
  <View style={styles.productCard}>
    <Image source={{ uri: product.image }} style={styles.productImage} />
    <View style={styles.discountBadge}>
      <Text style={styles.discountText}>SAVE {product.discount}%</Text>
    </View>
    <Text style={styles.productCategory}>{product.category}</Text>
    <Text style={styles.productName}>{product.name}</Text>
    <View style={styles.ratingContainer}>
      {[...Array(5)].map((_, i) => (
        <Ionicons
          key={i}
          name={i < Math.floor(product.rating) ? "star" : "star-outline"}
          size={16}
          color={i < Math.floor(product.rating) ? "#FFD700" : "#D3D3D3"}
        />
      ))}
      <Text style={styles.ratingText}>{product.rating}</Text>
    </View>
    <Text style={styles.productDescription} numberOfLines={2}>
      {product.description}
    </Text>
    <View style={styles.priceContainer}>
      <Text style={styles.originalPrice}>₹{product.originalPrice}</Text>
      <Text style={styles.discountedPrice}>₹{product.discountedPrice}</Text>
    </View>
    <TouchableOpacity style={styles.addToCartButton}>
      <Text style={styles.addToCartText}>Add To Cart</Text>
    </TouchableOpacity>
  </View>
);

export default function ProductListing() {
  const [sortBy, setSortBy] = useState("Alphabetically, A-Z");
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState(initialProducts);
  const [filters, setFilters] = useState({
    Popular: {
      "On Sale": false,
      "Top Rated": false,
      "Recently Launched": false,
    },
    "Type of Product": {
      Sunscreen: false,
      "Hair Cleanser": false,
    },
    "Skin Concerns": {
      Acne: false,
      Pigmentation: false,
    },
  });

  useEffect(() => {
    let filteredProducts = initialProducts;

    if (searchQuery) {
      filteredProducts = filteredProducts.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    Object.entries(filters).forEach(([category, items]) => {
      const activeFilters = Object.entries(items)
        .filter(([_, isActive]) => isActive)
        .map(([item]) => item);
      if (activeFilters.length > 0) {
        filteredProducts = filteredProducts.filter((product) => {
          if (category === "Type of Product") {
            return activeFilters.includes(product.category);
          }
          return true;
        });
      }
    });

    switch (sortBy) {
      case "Price, low to high":
        filteredProducts.sort((a, b) => a.discountedPrice - b.discountedPrice);
        break;
      case "Price, high to low":
        filteredProducts.sort((a, b) => b.discountedPrice - a.discountedPrice);
        break;
      default:
        filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
    }

    setProducts(filteredProducts);
  }, [searchQuery, sortBy, filters]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Header />
          <Navigation />
        </View>
        <View style={styles.content}>
          <View style={styles.sidebarContainer}>
            <Sidebar filters={filters} setFilters={setFilters} />
          </View>
          <View style={styles.productListContainer}>
            <View style={styles.searchSortContainer}>
              <TextInput
                style={styles.searchInput}
                placeholder="Search products..."
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
              <View style={styles.sortContainer}>
                <Text style={styles.sortLabel}>Sort by:</Text>
                <TouchableOpacity
                  style={styles.sortDropdown}
                  onPress={() => {
                    setSortBy((prevSort) => {
                      switch (prevSort) {
                        case "Alphabetically, A-Z":
                          return "Price, low to high";
                        case "Price, low to high":
                          return "Price, high to low";
                        default:
                          return "Alphabetically, A-Z";
                      }
                    });
                  }}
                >
                  <Text>{sortBy}</Text>
                  <Ionicons
                    name="chevron-down"
                    size={20}
                    color="#333"
                    style={styles.sortIcon}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <FlatList
              data={products}
              renderItem={({ item }) => <ProductCard product={item} />}
              keyExtractor={(item) => item.id.toString()}
              numColumns={2}
              columnWrapperStyle={styles.productRow}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  headerContainer: {
    width: "100%",
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    zIndex: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 10,
    height: 50,
  },
  promoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  promoText: {
    color: "#8a2be2",
    fontWeight: "bold",
    fontSize: 12,
    marginLeft: 5,
  },
  logo: {
    fontSize: 24,
    fontWeight: "bold",
  },
  headerRightContainer: {
    flexDirection: "row",
  },
  headerButton: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 15,
  },
  headerButtonText: {
    marginLeft: 5,
    fontSize: 14,
  },
  cartBadge: {
    backgroundColor: "#8a2be2",
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: -5,
    right: -10,
  },
  cartBadgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  nav: {
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  navItem: {
    marginRight: 20,
    paddingVertical: 5,
  },
  navItemText: {
    color: "#333",
    fontSize: 14,
  },
  newBadge: {
    backgroundColor: "#8a2be2",
    borderRadius: 2,
    paddingHorizontal: 4,
    paddingVertical: 2,
    position: "absolute",
    top: -8,
    right: -15,
  },
  newBadgeText: {
    color: "#fff",
    fontSize: 8,
  },
  content: {
    flex: 1,
    flexDirection: "row",
  },
  sidebarContainer: {
    width: width * 0.25,
    borderRightWidth: 1,
    borderRightColor: "#e0e0e0",
    backgroundColor: "#fff",
  },
  sidebar: {
    padding: 10,
  },
  sidebarTitle: {
    fontWeight: "bold",
    marginBottom: 10,
    fontSize: 16,
  },
  categoryContainer: {
    marginBottom: 10,
  },
  categoryButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 5,
  },
  categoryButtonText: {
    fontWeight: "bold",
    fontSize: 14,
  },
  categoryItems: {
    marginLeft: 10,
    marginTop: 5,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  checkbox: {
    width: 18,
    height: 18,
    borderWidth: 1,
    borderColor: "#8a2be2",
    marginRight: 8,
    borderRadius: 3,
  },
  checkboxSelected: {
    backgroundColor: "#8a2be2",
  },
  checkboxLabel: {
    fontSize: 12,
  },
  productListContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  searchSortContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
    fontSize: 14,
  },
  sortContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  sortLabel: {
    fontSize: 14,
    marginRight: 5,
  },
  sortDropdown: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 5,
  },
  sortIcon: {
    marginLeft: 5,
  },
  productRow: {
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  productCard: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    width: "48%",
  },
  productImage: {
    width: "100%",
    height: 150,
    resizeMode: "cover",
    borderRadius: 8,
    marginBottom: 10,
  },
  discountBadge: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "#8a2be2",
    borderRadius: 4,
    padding: 4,
  },
  discountText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "bold",
  },
  productCategory: {
    fontSize: 12,
    color: "#666",
    marginBottom: 5,
  },
  productName: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  ratingText: {
    marginLeft: 5,
    fontSize: 12,
    color: "#666",
  },
  productDescription: {
    fontSize: 12,
    color: "#666",
    marginBottom: 5,
  },
  priceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  originalPrice: {
    fontSize: 12,
    color: "#666",
    textDecorationLine: "line-through",
  },
  discountedPrice: {
    fontSize: 16,
    fontWeight: "bold",
  },
  addToCartButton: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#8a2be2",
    borderRadius: 4,
    padding: 8,
    alignItems: "center",
  },
  addToCartText: {
    color: "#8a2be2",
    fontWeight: "bold",
    fontSize: 12,
  },
});
