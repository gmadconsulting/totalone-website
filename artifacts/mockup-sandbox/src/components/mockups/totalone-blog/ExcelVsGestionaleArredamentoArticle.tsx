import { BlogArticle } from "./BlogArticle";
import { blogArticleById } from "./blogContent";

export function ExcelVsGestionaleArredamentoArticle() {
  return <BlogArticle article={blogArticleById["excel-vs-gestionale-arredamento"]} />;
}