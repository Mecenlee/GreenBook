import { action, observable } from "mobx";
import { request } from "../../utils/request";
import { load } from "../../utils/Storage";
import Loading from "../../components/widdget/Loading";


export default class ArticleDetailStore {
    @observable detail: Article = {} as Article;

    requestArticleDetail = async (id: number) => {
        Loading.show();

        try {
            const params = {
                id: id,
            }
            const { data } = await request('articleDetail', params); 
            console.log(`文章详情页` + data);
            this.detail = data || {};
        } catch (error) {
            console.log(error);
        } finally {
            Loading.hide();
        }
    }
}
