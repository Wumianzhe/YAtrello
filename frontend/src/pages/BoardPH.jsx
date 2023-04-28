// board placeholder. Transfer contents from board here and rename
import { useLoaderData } from "react-router-dom";

export function loader (params) {
  // should be
  // const board = await getBoard(params.uid)
  const board = params.board_id;
  return board;
}

export default function Board() {
  const board = useLoaderData();
  return (
    <div>
      <h1>
        Board with id ${board}
      </h1>
    </div>
  )
}
