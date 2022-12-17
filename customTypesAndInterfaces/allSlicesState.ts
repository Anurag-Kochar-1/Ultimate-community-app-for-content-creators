import { IAllData } from "./allData"
import { ICommunity } from "./communityInterfaces"

export interface IAllSlicesState {
    allData: IAllData
    user: []
    community: ICommunity
    posts: []
}

