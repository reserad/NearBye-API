import { registerEnumType } from '@nestjs/graphql';

export enum VoteStatus {
  UPVOTED = 'upvoted',
  DOWNVOTED = 'downvoted',
  NEITHER = 'neither',
}

registerEnumType(VoteStatus, {
  name: 'VoteStatus',
  description: 'If the user voted on the post what is the state?',
});
