import { BlogArticle } from "./BlogArticle";
import { blogArticleById } from "./blogContent";

export function GestionaleMobilificioArticle() {
  return <BlogArticle article={blogArticleById["gestionale-mobilificio"]} />;
}
