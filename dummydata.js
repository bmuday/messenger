// Public or private rooms
export const rooms = [
  {
    id: "room_2SqLH",
    name: "home",
    description: "",
    cover_image: "",
    private: "true | false",
    media: [
      { id: "", path: "", extension: "" },
      { id: "", path: "", extension: "" },
    ], // 24h expiration
    presence: {
      "cool-room": [
        {
          id: "4c8dee53-fd51-445c-92d4-917701401d14",
          userId: "309cf686-64ba-4afa-9e6b-05fe13c56fbf",
          userName: "sean",
          joinTime: "2020-11-01T23:46:38.000Z",
        },
      ],
    },
  },
  {
    id: "room_23Frd",
    name: "agua",
    description: "",
    cover_image: "",
    private: "true | false",
    media: [
      { id: "", path: "", extension: "" },
      { id: "", path: "", extension: "" },
    ], // 24h expiration
  },
  {
    id: "room_3zEr7",
    name: "dance",
    description: "",
    cover_image: "",
    private: "true | false",
    media: [
      { id: "", path: "", extension: "" },
      { id: "", path: "", extension: "" },
    ], // 24h expiration
  },
  {
    id: "room_2Sdda",
    name: "pop",
    description: "",
    cover_image: "",
    private: "true | false",
    media: [
      { id: "", path: "", extension: "" },
      { id: "", path: "", extension: "" },
    ], // 24h expiration
  },
  {
    id: "room_1EfPc",
    name: "jazz",
    description: "",
    cover_image: "",
    private: "true | false",
    media: [
      { id: "", path: "", extension: "" },
      { id: "", path: "", extension: "" },
    ], // 24h expiration
  },
  {
    id: "room_7AmPn",
    name: "sports",
    description: "",
    cover_image: "",
    private: "true | false",
    media: [
      { id: "", path: "", extension: "" },
      { id: "", path: "", extension: "" },
    ], // 24h expiration
  },
];

// Members connected to the chat
export const activeMembers = [
  {
    id: 1,
    user_id: "2SqLH",
    pseudo: "sam",
    peer: {
      id: "",
      disconnected: false,
    },
    rooms: [],
  },
  {
    id: 1,
    user_id: "2SqLH",
    pseudo: "sam",
    peer: {
      id: "",
      disconnected: false,
    },
    rooms: [],
  },
  {
    id: 1,
    user_id: "2SqLH",
    pseudo: "sam",
    peer: {
      id: "",
      disconnected: false,
    },
    rooms: [],
  },
  {
    id: 1,
    user_id: "2SqLH",
    pseudo: "sam",
    peer: {
      id: "",
      disconnected: false,
    },
    rooms: [],
  },
  {
    id: 1,
    user_id: "2SqLH",
    pseudo: "sam",
    peer: {
      id: "",
      disconnected: false,
    },
    rooms: [],
  },
];

// Members info in the database
export const members = [
  {
    id: "2SqLH",
    firstName: "Samantha",
    lastName: "Altman",
    email: "samantha_altman@gmail.com",
    profilePicture: "",
    age: 34,
    location: "",
    subscription: "standard | vip | premium",
    role: "member | moderator",
    gender: "female",
    chatSettings: {
      // paramètres par défault ...
      settingsCheck: {
        microphones: "microphones",
        speakers: "speakers",
        cameras: "cameras",
      },
      blockedUsers: [],
      notifications: {},
      darkmode: true,
    },
  },
  {
    id: "jMwNQ",
    firstName: "Clara",
    lastName: "Hilfilgher",
    email: "clara_hilfilgher@gmail.com",
    profilePicture: "",
    age: 34,
    location: "",
    subscription: "standard | vip | premium",
    role: "member | moderator",
    gender: "female",
    chatSettings: {
      blockedUsers: [],
      notifications: {}, // par défault ...
    },
  },
  {
    id: "Fjtt4",
    firstName: "Baptiste",
    lastName: "Muday",
    email: "baptiste_muday@gmail.com",
    age: 24,
    profilePicture: "",
    location: "",
    subscription: "standard | vip | premium",
    role: "member | moderator",
    gender: "male",
    chatSettings: {
      blockedUsers: [],
      notifications: {}, // par défault ...
    },
  },
  {
    id: "2jMNK",
    firstName: "Nathan",
    lastName: "Toto",
    email: "nathan_toto@gmail.com",
    age: 18,
    profilePicture: "",
    location: "",
    subscription: "standard | vip | premium",
    role: "member | moderator",
    gender: "male",
    chatSettings: {
      blockedUsers: [],
      notifications: {}, // par défault ...
    },
  },
  {
    id: "jMwNQa",
    firstName: "Solène",
    lastName: "MUDAY",
    email: "solene_muday@gmail.com",
    age: 20,
    profilePicture: "",
    location: "",
    subscription: "standard | vip | premium",
    role: "member | moderator",
    gender: "female",
    chatSettings: {
      blockedUsers: [],
      notifications: {}, // par défault ...
    },
  },
  {
    id: "wNQ7d",
    firstName: "Cyrille",
    lastName: "Toto",
    email: "cyrille_toto@gmail.com",
    age: 50,
    profilePicture: "",
    location: "",
    subscription: "standard | vip | premium",
    role: "member | moderator",
    gender: "male",
    chatSettings: {
      blockedUsers: [],
      notifications: {}, // par défault ...
    },
  },
];

const posts = [
  {
    id: "article_7AmPn",
    title: "home",
    content: "lorem",
    coverImage: "",
  },
  {
    id: "article_jMwNQ",
    title: "home",
    content: "lorem",
    coverImage: "",
  },
  {
    id: "article_2jMNK",
    title: "home",
    content: "lorem",
    coverImage: "",
  },
  {
    id: "article_wNQ7d",
    title: "home",
    content: "lorem",
    coverImage: "",
  },
  {
    id: "article_1EfPc",
    title: "home",
    content: "lorem",
    coverImage: "",
  },
  {
    id: "article_Fjtt4",
    title: "home",
    content: "lorem",
    coverImage: "",
  },
];

const privateMessages = [
  {
    id: 1,
    senderId: "2SqLH",
    receiverId: "wNQ7d",
    text: "hello",
    image: "",
    pollAnswer: "",
    // createdAt: ,
  },
  {
    id: 2,
    senderId: "jMwNQ",
    receiverId: "2SqLH",
    text: "hey",
    image: "",
    pollAnswer: "",
    // createdAt: ,
  },
  {
    id: 3,
    senderId: "wNQ7d",
    receiverId: "jMwNQ",
    text: "what's up?",
    image: "",
    pollAnswer: "",
    // createdAt: ,
  },
];

const roomMessages = [
  {
    id: 1,
    senderId: "wNQ7d",
    text: "hello everybody!",
    image: "",
    roomId: "room_2SqLH",
    // createdAt: ,
  },
  {
    id: 1,
    senderId: "wNQ7d",
    text: "hello world!",
    image: "",
    roomId: "room_23Frd",
    // createdAt: ,
  },
  {
    id: 1,
    senderId: "wNQ7d",
    text: "hello coders!",
    image: "",
    roomId: "room_3zEr7",
    // createdAt: ,
  },
];

module.exports = {
  members,
  rooms,
  posts,
  roomMessages,
  privateMessages,
};
