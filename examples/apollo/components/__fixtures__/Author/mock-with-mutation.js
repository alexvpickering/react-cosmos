import Author from '../../Author';

export default {
  component: Author,

  props: {
    authorId: 1,
    upvoteEnabled: true
  },
  apollo: {
    PostsForAuthor: {
      resolveWith: {
        author: {
          __typename: 'Author',
          id: 123,
          firstName: 'Ovidiu',
          posts: [
            {
              __typename: 'Post',
              id: 456,
              title: 'Testing React Components',
              votes: 1234
            },
            { __typename: 'Post', id: 789, title: 'When to assert?', votes: 56 }
          ]
        }
      }
    },
    UpvotePost: {
      resolveWith: ({ cache, variables }) => {
        const typename = 'Post';

        const data = cache.extract();

        const post = data[`${typename}:${variables.postId}`];

        return {
          upvotePost: {
            ...post,
            votes: post.votes + 1
          }
        };
      }
    }
  }
};