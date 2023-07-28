/*
  We'll add a 10-min expiry (exp) so rooms won't linger too long on your account.
  See other available options at https://docs.daily.co/reference#create-room
 */
export default async function createRoom() {
  const exp = Math.round(Date.now() / 1000) + 60 * 10;
  const options = {
    properties: {
      exp,
    },
  };

  const endpoint = "https://api.daily.co/v1/rooms/";

  const response = await fetch(endpoint, {
    method: "POST",
    body: JSON.stringify(options),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_DAILY_API_KEY}`,
    },
  });
  const data = await response.json();

  return data;
}
