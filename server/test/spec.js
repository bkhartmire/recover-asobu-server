const chai = require('chai')
const expect = chai.expect
const url = 'http://localhost:3000'
const request = require('supertest')(url)

describe('GraphQL Queries', () => {
  const testUser = {
    first_name: 'Jerry',
    last_name: 'Berry',
    email: 'jberr@email.com',
    phone_number: '+18186662312',
    profile_photo:
      'https://cdn.thedailymash.co.uk/wp-content/uploads/20190324205229/40-something-man-2-1.jpg'
  }

  // These variables will be assigned according to the value of the first event returned in the all events query.
  // They'll be used for querying a single event. This is helpful since the autogenerated ids will change whenever
  // we drop and reseed the db.
  let testEventId
  let testEvent

  it('should query all Users', done => {
    const usersQuery = {
      query: `query {
                Users {
                    id
                    first_name
                    last_name
                    email
                    phone_number
                    profile_photo
                    interests
                    exp
                    lvl
                    stats {
                      funny
                      intellectual
                      fun
                      kind
                      therapeutic
                      interesting
                    }
                    chats {
                        chat_id
                        participants {
                          first_name
                          email
                          profile_photo
                        }
                    }
                    events {
                        event_id
                        is_creator
                    }
                    imei
                }
            }`
    }
    request
      .post('/graphql')
      .send(usersQuery)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)
        expect(Array.isArray(res.body.data.Users)).to.be.true
        done()
      })
  })
  it('should query one User by email', done => {
    const userQuery = {
      query: `query {
            User(userEmail: "jberr@email.com") {
                first_name
                last_name
                email
                phone_number
                profile_photo
            }
        }`
    }
    request
      .post('/graphql')
      .send(userQuery)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)
        expect(res.body.data.User).to.be.an('object')
        expect(res.body.data.User).to.deep.equal(testUser)
        done()
      })
  })
  it('should return user object with successful login query', done => {
    const loginQuery = {
      query: `query {
              Login(userEmail: "jberr@email.com", userPassword: "password") {
                first_name
                last_name
                email
                phone_number
                profile_photo
              }
          }`
    }
    request
      .post('/graphql')
      .send(loginQuery)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)
        expect(res.body.data.Login).to.be.an('object')
        expect(res.body.data.Login).to.deep.equal(testUser)
        done()
      })
  })
  it('should query all events', done => {
    const eventsQuery = {
      query: `query {
              Events {
                id
                name
                description
                cover_photo
                creator {
                    first_name
                    email
                    profile_photo
                }
                start
                end
                location
                limit
                tags
                attendees {
                    first_name
                    email
                    profile_photo
                }
                comments {
                    id
                    from {
                        first_name
                        email
                        profile_photo
                    }
                    content
                    timestamp
                }
              }
          }`
    }
    request
      .post('/graphql')
      .send(eventsQuery)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)
        expect(Array.isArray(res.body.data.Events)).to.be.true
        testEvent = res.body.data.Events[0]
        testEventId = testEvent.id
        done()
      })
  })
  it('should query one event by event id', done => {
    const eventQuery = {
      query: `query {
              Event(eventId: "${testEventId}") {
                id
                name
                description
                cover_photo
                creator {
                    first_name
                    email
                    profile_photo
                }
                start
                end
                location
                limit
                tags
                attendees {
                    first_name
                    email
                    profile_photo
                }
                comments {
                    id
                    from {
                        first_name
                        email
                        profile_photo
                    }
                    content
                    timestamp
                }
              }
          }`
    }
    request
      .post('/graphql')
      .send(eventQuery)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)
        expect(res.body.data.Event).to.be.an('object')
        expect(res.body.data.Event).to.deep.equal(testEvent)
        done()
      })
  })
})
