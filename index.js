const { ApolloServer, gql } = require('apollo-server');
//파일을 읽는 함수 받아오기
const { readFileSync } = require('fs');
const { argsToArgsConfig } = require('graphql/type/definition');
//ApolloServer에서 typeDefs 받아와 

// The GraphQL
//백틱으로 gql을 받아서 사용하는 것을 type of templete이라고 부른다.
//여기서 스키마를 정의하는 것이다.
const typeDefs = gql`
  type Query {
    "A simple type for getting started!"
    hello: String
    books: [Book]
    book(bookID: Int) : Book
  }
  type Book {
    bookId: Int
    title: String
    message:String
    author: String
    url: String
  }
`;

// resolvers는 스키마에 해당하는 구현체를 적는 곳이다.
//그러므로 typeDefs와 resolvers를 한쌍을 이룬다.
const resolvers = {
  Query: {
    hello: () => 'world',
    books: () => {
      return JSON.parse(readFileSync(join(__dirname, 'books.js')).toString());
    },
    books: (parent, args, context, info) => {
      const books = JSON.parse(readFileSync(join(__dirname, 'books.js')).toString());
      return books.find(book => book.bookId === arg.bookId);
    }
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true,
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
