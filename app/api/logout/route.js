export async function GET() {
  try {
    await useLogout();
  } catch (error) {
    console.log("error", error);
    return { error };
  }
}
