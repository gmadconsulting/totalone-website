import { BlogArticle } from "./BlogArticle";
import { blogArticleById } from "./blogContent";

export function GestioneCommesseArredamentoArticle() {
  return <BlogArticle article={blogArticleById["gestione-commesse-arredamento"]} />;
}