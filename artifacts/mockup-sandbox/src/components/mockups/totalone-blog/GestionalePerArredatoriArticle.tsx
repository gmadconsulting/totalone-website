import { BlogArticle } from "./BlogArticle";
import { blogArticleById } from "./blogContent";

export function GestionalePerArredatoriArticle() {
  return <BlogArticle article={blogArticleById["gestionale-per-arredatori"]} />;
}