import { GraphQLScalarType, Kind } from "graphql";
import { ObjectId } from "mongodb";
export const typeDefs = `#graphql
    scalar ObjectID
    scalar Number
    scalar DateTime

    type Query {
        products: [Product],
        posts: [Post],
        users: [User],
        searchProducts(searchTerm: String!): [Product],
        searchPosts(searchTerm: String!): [Post],
        searchProductsByName(name: String!): [Product],
        getProductById(_id:String!):Product,
        getProductsByIds(ids:[String!]!):[Product],
        getProductsByCategory(category:String!):[Product],
        getProductsByPriceRange(low:Int,high:Int!):[Product],
        getPostById(_id:String!):Post,
        getUserById(_id: String!): User,
        getChatById(_id: String!): Chat,
        getChatByParticipants(participants: [String!]!): Chat,
        getUsersByIds(ids: [String!]!): [User],
        getPostBySeller(_id: String!):[Post],
        getPostByBuyer(_id: String!):[Post],
        getProductBySeller(_id: String!):[Product],
        getProductByBuyer(_id: String!):[Product]
        getComment(user_id:String!, comment_id:String!): User
    }
    
    type Product {
        _id: String!,
        name: String!,
        price: Number!,
        date: String!,
        description:String,
        condition:String,
        seller_id:String,
        buyer_id:String,
        image:String,
        category:String,
        status:String
    }

    type Post {
      _id: String!,
      buyer_id: String!,
      seller_id: String,
      item: String!,
      category:String!,
      price: Number!,
      condition:String,
      date: String!,
      description:String,
      status:String!
  }

    type Comment{
      _id : String!,
      rating: Int!,
      comment_id: String!,
      comment: String,
    }

    type User{
    _id : String!,
    email: String!,
    firstname: String,
    lastname: String,
    comments:[Comment]
    rating: Number!
    favorite: [String]
  }

    type Message{
    sender : String!,
    time : DateTime,
    message : String
  }

    type Chat{
    _id : String!,
    participants : [String],
    messages : [Message]
  }

    type Mutation {
        addProduct(name:String!, price: Number!,description:String!,condition:String!,seller_id:String!, image:String!,category:String!):Product,
        editProduct(_id: String!, name:String, price: Number,date:DateTime,description:String,condition:String,seller_id:ObjectID!,buyer_id:ObjectID, image:String,category:String,status:String ):Product,
        removeProduct(_id:String!):Product,
        addPost(buyer_id: String!, item:String!, category:String!, price: Number!, condition:String!, description:String!):Post,
        editPost(_id: String!, buyer_id: String!, item:String!, category:String!, price: Number!, condition:String!, description:String!, status:String!):Post,
        removePost(_id:String!):Post,
        addUser(_id: String!, email: String!, firstname: String!, lastname: String!, favorite: String): User,
        editUser(_id: String!, email: String!, firstname: String!, lastname: String!): User,
        addChat(participants: [String!]!): Chat,
        addMessage(_id: String!, sender: ID!, time: DateTime!, message: String!): Message,
        retrievePost(_id: String!, user_id:String!): Post,
        repostPost(_id: String!, user_id:String!): Post,
        addComment(user_id: String!, comment_id: String!, rating: Int!, comment: String): User,
        editComment(user_id: String!, comment_id: String!, rating: Int!, comment: String): User,
        addProductToUserFavorite(_id:String!,productId:String!):[String],
        removeProductFromUserFavorite(_id:String!,productId:String!):[String]
    }
`;

export const ObjectID = new GraphQLScalarType({
  name: "ObjectID",
  description: "MongoDB ObjectID scalar type",
  serialize(value) {
    return value.toString();
  },
  parseValue(value) {
    return new ObjectId(value);
  },
  parseLiteral(ast) {
    if (ast.kind === "StringValue") {
      return new ObjectId(ast.value);
    }
    return null;
  },
});

export const DateTime = new GraphQLScalarType({
  // MM/DD/YYYY LOCALTIME
  name: "DateTime",
  description: "DateTime scalar type",
  serialize(value) {
    return value.toISOString();
  },
  parseValue(value) {
    return new Date(value);
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) {
      return new Date(ast.value);
    }
    return null;
  },
});

// export const Base64 = new GraphQLScalarType({
//   name: "Base64",
//   description: "Base64 custom scalar type",
//   serialize(value) {
//     return Buffer.from(value).toString("base64");
//   },
//   parseValue(value) {
//     return Buffer.from(value, "base64");
//   },
//   parseLiteral(ast) {
//     if (ast.kind === "StringValue") {
//       return Buffer.from(ast.value, "base64");
//     }
//     return null;
//   },
// });
