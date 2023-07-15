import { ArgsType, Field, InputType } from '@nestjs/graphql';

@InputType()
export class UserUpdateInput {
  @Field({ nullable: true })
  profileImage?: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  baseLatitude?: number;

  @Field({ nullable: true })
  baseLongitude?: number;
}

@ArgsType()
export class UserUpdateInputArgs {
  @Field(() => UserUpdateInput)
  userUpdateInput!: UserUpdateInput;
}
