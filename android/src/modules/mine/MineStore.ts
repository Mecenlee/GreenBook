import { action, flow, observable } from "mobx";
import { request } from "../../utils/request";
import { load } from "../../utils/Storage";
import Loading from "../../components/widdget/Loading";


const SIZE = 10;
export default class MineStore {

    @observable refreshing: boolean = false;

    @observable info: any = {};

    @observable noteList: ArticleSimple[] = [];
    @observable collectionList: ArticleSimple[] = [];
    @observable favorateList: ArticleSimple[] = [];

    requestAll = async () => {
        Loading.show();
        this.refreshing = true;
        Promise.all([
            this.requestNoteList(),
            this.requestCollectionList(),
            this.requestFavorateList(),
            this.requestInfo(),
        ]).then(() => {
            Loading.hide();
            this.refreshing = false;
        });
    }

    @action
    requestInfo = async () => {
        try {
            const { data } = await request('accountInfo', {});
            this.info = data || {};
        } catch (error) {
            console.log(error);
        }
    }

    @action
    requestNoteList = async () => {
        try {
            const { data } = await request('noteList', {});
            this.noteList = data || {};
        } catch (error) {
            console.log(error);
        }
    }


    @action
    requestCollectionList = async () => {
        try {
            const { data } = await request('collectionList', {});
            this.collectionList = data || {};
        } catch (error) {
            console.log(error);
        }
    }

    @action
    requestFavorateList = async () => {
        try {
            const { data } = await request('favorateList', {});
            this.favorateList = data || {};
        } catch (error) {
            console.log(error);
        }
    }
}
