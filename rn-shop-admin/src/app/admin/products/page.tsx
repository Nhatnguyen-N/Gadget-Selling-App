import { getCategoriesWithProducts } from "@/actions/categories";
import { ProductPageComponent } from "./page-component";
import { getProductsWithCategories } from "@/actions/products";

export default async function Products() {
  const categories = await getCategoriesWithProducts();
  const productsWithCategories = await getProductsWithCategories();
  return (
    <ProductPageComponent
      productsWithCategories={productsWithCategories}
      categories={categories}
    />
  );
}
