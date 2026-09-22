import { BlogArticle } from "./BlogArticle";
import { blogArticleById } from "./blogContent";

export function GestioneMagazzinoArredamentoArticle() {
  return <BlogArticle article={blogArticleById["gestione-magazzino-arredamento"]} />;
}