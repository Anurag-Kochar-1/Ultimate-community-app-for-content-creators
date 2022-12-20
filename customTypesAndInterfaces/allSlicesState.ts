import { IAllData } from "./allData"
import { ICommunity } from "./communityInterfaces"
import { IPost } from "./post"

export interface IAllSlicesState {
    user: []
    community: ICommunity
    posts: any
}

