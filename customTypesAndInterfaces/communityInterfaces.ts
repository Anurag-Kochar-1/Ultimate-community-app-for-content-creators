
export interface ICommunity {
    communityData: ICommunityData,
    communityPosts:[],
    communitySettings: [],
    communityEvents: [],
    communityTextChannels: [],
}



export interface ICommunityData {
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

    id?: string
}
