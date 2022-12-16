export interface ICommunity {
    communityID: string
    communityBanner: string|null
    communityContentType: string
    communityDescription: string
    communityLogo: string|null
    communityName: string
    creatorUserID: string
    creatorEmail: string
    creatorName: string
    creatorPhotoURL: string
    members: string[]
}
