import { getCategoriesWithProducts } from "@/actions/categories";
import CategoriesPageComponent from "./page-component";

export default async function Categories() {
  //Fetch categories
  const categories = await getCategoriesWithProducts();
  return <CategoriesPageComponent categories={categories} />;
}
