import { registerEnumType } from '@nestjs/graphql';

export enum VoteStatus {
  UPVOTED = 'upvoted',
  DOWNVOTED = 'downvoted',
  NEITHER = 'neither',
}

registerEnumType(VoteStatus, {
  name: 'VoteStatus',
  description: 'Type of vote',
});
