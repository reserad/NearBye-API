import { registerEnumType } from '@nestjs/graphql';

export enum VoteType {
  UPVOTE = 'upvote',
  DOWNVOTE = 'downvote',
}

registerEnumType(VoteType, {
  name: 'VoteType',
  description: 'Type of vote',
});
