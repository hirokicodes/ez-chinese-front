export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type AuthPayload = {
  token: Scalars["String"];
  user: User;
};

export type Deck = {
  id: Scalars["ID"];
  name: Scalars["String"];
  hanzis: Array<Hanzi>;
  creator: User;
};

export type Hanzi = {
  id: Scalars["ID"];
  traditional: Scalars["String"];
  simplified: Scalars["String"];
  referencedTraditional?: Maybe<Scalars["String"]>;
  referencedSimplified?: Maybe<Scalars["String"]>;
  pinyinNumeric?: Maybe<Scalars["String"]>;
  pinyinDiacritic?: Maybe<Scalars["String"]>;
  definitions: Scalars["String"];
  definitionsDiacritic?: Maybe<Scalars["String"]>;
  updatedAt: Scalars["String"];
  createdAt: Scalars["String"];
  usersBookmarked: Array<User>;
  decksIncluded: Array<Deck>;
};

export type Mutation = {
  signup: AuthPayload;
  login: AuthPayload;
  createDeck: Deck;
  deleteDeck: Deck;
  addHanziToDeck: Deck;
  removeHanziFromDeck: Deck;
  bookmarkHanzi: User;
  unbookmarkHanzi: User;
};

export type MutationSignupArgs = {
  data: SignupUserInput;
};

export type MutationLoginArgs = {
  email: Scalars["String"];
  password: Scalars["String"];
};

export type MutationCreateDeckArgs = {
  deckName: Scalars["String"];
};

export type MutationDeleteDeckArgs = {
  id: Scalars["ID"];
};

export type MutationAddHanziToDeckArgs = {
  hanziId: Scalars["ID"];
  deckId: Scalars["ID"];
};

export type MutationRemoveHanziFromDeckArgs = {
  hanziId: Scalars["ID"];
  deckId: Scalars["ID"];
};

export type MutationBookmarkHanziArgs = {
  id: Scalars["ID"];
};

export type MutationUnbookmarkHanziArgs = {
  id: Scalars["ID"];
};

export type Query = {
  hanzi: Array<Hanzi>;
  users: Array<User>;
  decks: Array<Deck>;
  me?: Maybe<User>;
};

export type QueryHanziArgs = {
  hanzi: Scalars["String"];
};

export type QueryUsersArgs = {
  data?: Maybe<QueryUsersInput>;
};

export type QueryDecksArgs = {
  data?: Maybe<QueryDecksInput>;
};

export type QueryDecksInput = {
  query?: Maybe<Scalars["String"]>;
  first?: Maybe<Scalars["Int"]>;
  skip?: Maybe<Scalars["Int"]>;
  after?: Maybe<Scalars["String"]>;
};

export type QueryUsersInput = {
  query?: Maybe<Scalars["String"]>;
  first?: Maybe<Scalars["Int"]>;
  skip?: Maybe<Scalars["Int"]>;
  after?: Maybe<Scalars["String"]>;
};

export type SignupUserInput = {
  username: Scalars["String"];
  email: Scalars["String"];
  password: Scalars["String"];
};

export type User = {
  id: Scalars["ID"];
  username: Scalars["String"];
  email: Scalars["String"];
  password: Scalars["String"];
  updatedAt: Scalars["String"];
  createdAt: Scalars["String"];
  bookmarkedHanzis: Array<Hanzi>;
  decks: Array<Deck>;
};
export type LoginMutationVariables = {
  email: Scalars["String"];
  password: Scalars["String"];
};

export type LoginMutation = { __typename?: "Mutation" } & {
  login: { __typename?: "AuthPayload" } & Pick<AuthPayload, "token"> & {
      user: { __typename?: "User" } & Pick<
        User,
        "id" | "username" | "email" | "password"
      >;
    };
};

import gql from "graphql-tag";
import * as React from "react";
import * as ReactApollo from "react-apollo";
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export const LoginDocument = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      user {
        id
        username
        email
        password
      }
      token
    }
  }
`;
export type LoginMutationFn = ReactApollo.MutationFn<
  LoginMutation,
  LoginMutationVariables
>;

export const LoginComponent = (
  props: Omit<
    Omit<
      ReactApollo.MutationProps<LoginMutation, LoginMutationVariables>,
      "mutation"
    >,
    "variables"
  > & { variables?: LoginMutationVariables }
) => (
  <ReactApollo.Mutation<LoginMutation, LoginMutationVariables>
    mutation={LoginDocument}
    {...props}
  />
);

export type LoginProps<TChildProps = {}> = Partial<
  ReactApollo.MutateProps<LoginMutation, LoginMutationVariables>
> &
  TChildProps;
export function withLogin<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    LoginMutation,
    LoginMutationVariables,
    LoginProps<TChildProps>
  >
) {
  return ReactApollo.withMutation<
    TProps,
    LoginMutation,
    LoginMutationVariables,
    LoginProps<TChildProps>
  >(LoginDocument, {
    alias: "withLogin",
    ...operationOptions
  });
}
