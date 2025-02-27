import { action, flow, observable } from "mobx";
import { request } from "../../utils/request";
import { load } from "../../utils/Storage";
import Loading from "../../components/widdget/Loading";


const SIZE = 10;
export default class HomeStore {
    
    page: number = 1;

    @observable messageList: MessageListItem[] = [];
    
    @observable refreshing: boolean = false;
    
    @observable unread: UnRead = {} as UnRead;
    
    @action
    resetPage = () => {
        this.page = 1;
    }

    requestMessageList = async () => {
        if (this.refreshing) {
            return;
        }
        Loading.show();
        try {
            this.refreshing = true;
            const params = {
                page: this.page,
                size: SIZE,
            };
            const { data } = await request('messageList', params);
            // console.log(`data = ${JSON.stringify(data)}`);
            if (data?.length) {
                if (this.page === 1) {
                    this.messageList = data;
                } else {
                    this.messageList = [...this.messageList, ...data];
                }
                this.page = this.page + 1;
            } else {
                if (this.page === 1) {
                    this.messageList = [];
                } else {
                    //已经加载完，无更多数据
                }
            }
        } catch (error) {
            console.log(error);
        } finally {
            this.refreshing = false;
            Loading.hide();
        }
    }

    @action
    requestUnRead = flow(function* (this: HomeStore) {
        try {
            const { data } = yield request('unread', {});
            this.unread = data || {};
        } catch (error) {
            console.log(error);
        }
    })
 
}
