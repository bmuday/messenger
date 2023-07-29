export default async function createRoom() {
  try {
    const res = await fetch("/api/rooms");
    const data = await res.text();
    const room = JSON.parse(data);
    console.log("roomClient", room);
    return room;
  } catch (error) {
    console.log("error", error);
  }
}
