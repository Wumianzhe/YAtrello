// dashboard placeholder. Transfer contents from board here and rename
import { useLoaderData } from "react-router-dom";
import FullWidthGrid from './Main'
// import { useLoaderData } from "react-router-dom";

// export function loader ({params}) {
//   // should be
//   // const board = await getBoard(params.uid)
//   return null;
// }
export default function Main() {
  return (
    <div>
      <h1>
        Main page
      </h1>
      <FullWidthGrid/>
    </div>
  )
}
