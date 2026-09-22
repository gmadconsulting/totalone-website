import { BlogArticle } from "./BlogArticle";
import { blogArticleById } from "./blogContent";

export function SoftwareGestionaleNegozioArredamentoArticle() {
  return <BlogArticle article={blogArticleById["software-gestionale-negozio-arredamento"]} />;
}