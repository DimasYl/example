import profileReducer, {addPostActionCreator, deletePost, ProfilePageType} from "./profile-reducer";

let state: ProfilePageType = {
    posts: [
        {id: 1, message: 'Hi, how are you?', likesCount: 10},
        {id: 2, message: 'It\'s my first post', likesCount: 25},
        {id: 3, message: 'Blabla', likesCount: 25},
        {id: 4, message: 'Dada', likesCount: 25}
    ],
    profile: null,
    status: ''
}

it('new post should be added',()=> {

    let action = addPostActionCreator('superSamurai')
    let newState = profileReducer(state,action)
    expect(newState.posts.length).toBe(5)
    expect(newState.posts[4].message).toBe('superSamurai')
    expect(newState.posts[4].likesCount).toBe(0)


})


it('after deleting length of messages should be decrement',()=> {

    let action = deletePost(1)
    let newState = profileReducer(state,action)

    expect(newState.posts.length).toBe(3)
})

