import { IAllData } from "./allData"
import { ICommunity } from "./communityInterfaces"
import { IPost } from "./post"
import { IUser } from "./user"

export interface IAllSlicesState {
    user: IUser
    community: ICommunity
    posts: any
}

