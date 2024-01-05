export enum TweetType {
  Tweet,
  Retweet,
  Comment,
  QuoteTweet,
}

export enum TweetAudience {
  Everyone, // 0
  TwitterCircle, // 1
}

export enum MediaType {
  VIDEO = 'video',
  image = 'image',
}
export interface Media {
  url: string;
  type: MediaType;
}
