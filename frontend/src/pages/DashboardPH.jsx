// dashboard placeholder. Transfer contents from board here and rename
import { useLoaderData } from "react-router-dom";
import FullWidthGrid from './Main'

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
        Main page for user ${user}
      </h1>
      <FullWidthGrid/>
    </div>
  )
}
