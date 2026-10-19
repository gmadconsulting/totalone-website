import { BlogArticle } from "./BlogArticle";
import { blogArticleById } from "./blogContent";

export function KpiNegozioArredamentoArticle() {
  return <BlogArticle article={blogArticleById["kpi-negozio-arredamento"]} />;
}
