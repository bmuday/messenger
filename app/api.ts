/*
  We'll add a 30-min expiry (exp) so rooms won't linger too long on your account.
  See other available options at https://docs.daily.co/reference#create-room
 */
async function createRoom() {
  const response = await fetch(`${window.location.origin}/api/rooms`);

  return response;
  console.log("response", response);
}

export default { createRoom };
