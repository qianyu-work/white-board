import {Liveblocks} from "@liveblocks/node";
import {ConvexHttpClient} from "convex/browser";
import {auth, currentUser} from "@clerk/nextjs/server";
import {api} from "../../../../convex/_generated/api";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

const loveBlocks = new Liveblocks({
  secret: "sk_dev_57KQYtq2vQLT8TOyWKqaDSnxjJG2GxN6AJ50CIToEEr_qQrhCZWByT0Pbua4I_CP",
});

export async function POST(request: Request) {
  const authorization = auth();
  const user = await currentUser();

  if (!authorization || !user) {
    return new Response("未经授权", {status: 403});
  }

  const {room} = await request.json();
  const board = await convex.query(api.board.get, {id: room});

  if (board?.orgId !== authorization.orgId) {
    return new Response("未经授权", {status: 403})
  }

  const userInfo = {
    name: user.firstName || "Teammeate",
    picture: user.imageUrl!
  }

  const session = loveBlocks.prepareSession(
    user.id,
    {userInfo}
  )

  if (room) {
    session.allow(room, session.FULL_ACCESS);
  }

  const {status, body} = await session.authorize();

  return new Response(body, {status});
}