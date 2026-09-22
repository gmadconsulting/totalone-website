import { BlogArticle } from "./BlogArticle";
import { blogArticleById } from "./blogContent";

export function GestireIngressiShowroomArticle() {
  return <BlogArticle article={blogArticleById["gestire-ingressi-showroom"]} />;
}