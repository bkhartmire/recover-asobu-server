import gql from 'graphql-tag'

export const sendHangoutRequestQuery = gql`
  mutation SendHangoutRequest(
    $currentUserEmail: String!
    $toUserEmail: String!
  ) {
    SendHangoutRequest(
      currentUserEmail: $currentUserEmail
      toUserEmail: $toUserEmail
    )
  }
`

export const acceptHangoutRequestQuery = gql`
  mutation AcceptHangoutRequest(
    $currentUserEmail: String!
    $fromUserEmail: String!
  ) {
    AcceptHangoutRequest(
      currentUserEmail: $currentUserEmail
      fromUserEmail: $fromUserEmail
    ) {
      chat_id
      participants {
        first_name
        email
        profile_photo
      }
    }
  }
`