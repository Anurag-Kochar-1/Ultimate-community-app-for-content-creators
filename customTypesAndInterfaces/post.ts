export interface IPost {
    postID?: string
    postTitle: string
    postCaption?: string
    postImageURL?: string
    postVideoURL?: string
    postCreatorID: string
    postCreatorName: string
    postCreateAtCommunityID: string
    upvotedByUserID: string[]
    downvotedByUserID: string[]

}