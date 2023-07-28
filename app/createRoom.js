export default async function createRoom() {
  try {
    const data = await (await fetch("/api/rooms")).text();
    const room = JSON.parse(data);
    return room;
  } catch (error) {
    console.log("error", error);
  }
}
