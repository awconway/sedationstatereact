import React from "react"
import { ApolloProvider } from "react-apollo"
import { Query } from "react-apollo"
import gql from "graphql-tag"
import { getProfile } from "../utils/auth"

import Layout from "./layout"

import Radio from "./radio"

const query = gql`
  query {
    states {
      state
      time
      user_id
    }
  }
`

const mutation = gql`
  mutation statesMutation(
    $state: String = ""
    $time: String = ""
    $user_id: String = ""
  ) {
    insert_states(objects: { state: $state, time: $time, user_id: $user_id }) {
      returning {
        id
      }
    }
  }
`
const user = getProfile()

export default function SedationState({ client }) {
  const createPlaylist = () => {
    client.mutate({
      mutation: mutation,
      variables: {
        state: "warn",
        time: Date(),
        user_id: user["https://hasura.io/jwt/claims"]["x-hasura-user-id"],
      },
    })
  }

  return (
    <>
      <Layout>
        <Radio />
        <ApolloProvider client={client}>
          <button onClick={() => createPlaylist()}>Create</button>

          <Query query={query}>
            {({ loading, error, data, client }) => {
              if (loading) {
                return <div>Loading...</div>
              }

              if (error) {
                console.error(error)
                return <div>Error!</div>
              }
              return (
                <div>
                  {data.states.map((states, index) => (
                    <div key={index}>
                      <ul>
                        <li>{states.state}</li>
                        <li>{states.time}</li>
                        <li>{states.user_id}</li>
                      </ul>
                    </div>
                  ))}
                </div>
              )
            }}
          </Query>
        </ApolloProvider>
      </Layout>
    </>
  )
}
