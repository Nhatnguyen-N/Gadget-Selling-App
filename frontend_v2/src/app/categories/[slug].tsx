import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { Redirect, Stack, useLocalSearchParams } from "expo-router";
import { ProductListItem } from "@/src/components/product-list-item";
import { getCategoryAndProducts } from "@/src/api/api";

type Props = {};

const Category = (props: Props) => {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const { data, error, isLoading } = getCategoryAndProducts(slug);
  if (isLoading) return <ActivityIndicator />;
  if (error || !data) return <Text>Error: {error?.message}</Text>;
  if (!data.category || !data.products) {
    return <Redirect href={"/+not-found"} />;
  }
  const { category, products } = data;

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: category.name,
          headerShadowVisible: true,
        }}
      />
      <Image source={{ uri: category.imageUrl }} style={styles.categoryImage} />
      <Text style={styles.categoryName}>{category.name}</Text>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <ProductListItem product={item} />}
        numColumns={2}
        columnWrapperStyle={styles.productRow}
        contentContainerStyle={styles.productsList}
      />
    </View>
  );
};

export default Category;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
    borderTopColor: "#ccc",
    borderTopWidth: 1,
  },
  categoryImage: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    borderRadius: 8,
    marginBottom: 16,
  },
  categoryName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  productsList: {
    flexGrow: 1,
  },
  productRow: {
    justifyContent: "space-between",
  },
  productContainer: {
    flex: 1,
    margin: 8,
  },
  productImage: {
    width: "100%",
    height: 150,
    resizeMode: "cover",
    borderRadius: 8,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 8,
  },
  producPrice: {
    fontSize: 14,
    color: "#888",
    marginTop: 4,
  },
});
