
export interface ICommunity {
    allCommunitiesData: [],
    communityData: ICommunityData,
    communityPosts:[],
    communitySettings: [],
    communityEvents: [],
    communityTextChannels: [],
}



export interface ICommunityData {
    youtubeChannelID: string
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
