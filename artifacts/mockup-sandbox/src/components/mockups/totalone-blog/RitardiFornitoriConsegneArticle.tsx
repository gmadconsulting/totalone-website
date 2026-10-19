import { BlogArticle } from "./BlogArticle";
import { blogArticleById } from "./blogContent";

export function RitardiFornitoriConsegneArticle() {
  return <BlogArticle article={blogArticleById["ritardi-fornitori-consegne-mobili"]} />;
}
