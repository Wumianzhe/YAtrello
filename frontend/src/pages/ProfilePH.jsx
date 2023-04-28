// dashboard placeholder. Transfer contents from board here and rename
import { useLoaderData } from "react-router-dom";

export function loader ({params}) {
  // should be
  // const board = await getBoard(params.uid)
  const user = params.uid;
  return user;
}
export default function Main() {
  const user = useLoaderData();
  return (
    <div>
      <h1>
        Profile of user {user}
      </h1>
    </div>
  )
}
