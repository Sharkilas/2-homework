export type VideosModels = {
    id:	number,
    title:	string,
    author:	string,
    canBeDownloaded?: boolean,
    minAgeRestriction?:	number | null,
    createdAt?:	string,
    publicationDate?:	string,
    availableResolutions?: Array<string>    // или так лучше? string[]
}
export const dbavailableResolutions: Array<string> = ['P144', 'P240', 'P360', 'P480', 'P720', 'P1080', 'P1440', 'P2160'];

//export const dbavailableResolutions: Array<string> = ['P144', 'P240', 'P360', 'P480', 'P720', 'P1080', 'P1440', 'P2160'];

export const qualityCheck = (arr: string [], arr2: string []) => {
    return arr.every((res: string) => arr2.includes(res))
}