export interface IUser {
    currentUserData: ICurrentUserData,
    joinedCommunitiesData: [],
    ownedCommunitiesData: [],
    createdPostsData: []
}


export interface ICurrentUserData {
    communitiesJoinedID: string[] 
    communitiesOwnedID: string[] 
    createdPostsID: string[] 
    postsUpvoted: string[]
    postsDownvoted: string[] 
}