import React, { useContext } from "react";
import Pagination from "@mui/material/Pagination";
import { InfoContext } from "../context/InfoContext";
import { PagesContext } from "../context/PagesContext";
import { CharacterContext } from "../context/CharacterContext";

export default function PaginationItems() {
  const { myInfo } = useContext(InfoContext);
  const { myPage, updatePages } = useContext(PagesContext);
  const { myCharacters } = useContext(CharacterContext);

  const handleChangePage = (event, newPage) => {
    updatePages(newPage);
  };

  return (
    <>
      {myCharacters.length > 0 ? (
        <Pagination
          count={myInfo.pages}
          defaultPage={1}
          page={myPage}
          onChange={handleChangePage}
          hidePrevButton={myInfo.prev ? false : true} // Ocultar "prev" si está en la primera página
          hideNextButton={myInfo.next ? false : true} // Ocultar "next" si está en la última página
          variant="outlined"
          color="secondary"
        />
      ) : (
        ""
      )}
    </>
  );
}
