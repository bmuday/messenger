// export default async function createRoom() {
//   const exp = Math.round(Date.now() / 1000) + 60 * 10; // 10 min room expiration
//   const options = {
//     properties: {
//       exp,
//     },
//   };

//   const endpoint = "https://api.daily.co/v1/rooms/";

//   const response = await fetch(endpoint, {
//     method: "POST",
//     body: JSON.stringify(options),
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${process.env.NEXT_PUBLIC_DAILY_API_KEY}`,
//     },
//   });
//   const room = await response.json();
//   console.log("room", room);
//   return room;
// }

export default async function createRoom() {
  try {
    const data = await (await fetch("/api/rooms")).text();
    const room = JSON.parse(data);
    console.log("roomClient", room);
    return room;
  } catch (error) {
    console.log("error", error);
  }
}

// {
//   api_created: true,
// config: {exp: 1690556991},
// created_at: "2023-07-28T14:59:51.000Z",
// id: "e45e8cfa-38c5-4fc7-8d38-ae05f5ff72e0",
// name: "sTWTDMGE2M8GkMcdaBov",
// privacy: "public",
// url: "https://bmuday.daily.co/sTWTDMGE2M8GkMcdaBov"
// }
