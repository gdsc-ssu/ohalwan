import { Dropdown } from "semantic-ui-react";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import { useState } from "react";
import AddStory from "./AddStory";
import UpdateStory from "./UpdateStory";
import { atom, useRecoilState } from "recoil";
import { pageState } from "../atom";

function StoryDropDown({ id, dark, users, setUsers, name, body, heart }) {
  const [updateOpen, setUpdateOpen] = useState(false);
  const [page, setPage] = useRecoilState(pageState);

  const deleteItem = async () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      await deleteDoc(doc(db, "local", id));
      setPage((cur) => !cur);
    }
  };
  const updateItem = () => {
    setUpdateOpen(true);
  };
  return (
    <Dropdown>
      <Dropdown.Menu>
        <Dropdown.Item text="수정" onClick={updateItem} />
        <Dropdown.Item text="삭제" onClick={deleteItem} />
        <UpdateStory
          id={id}
          users={users}
          text={body}
          name={name}
          open={updateOpen}
          setOpen={setUpdateOpen}
          heart={heart}
          setUsers={setUsers}
        />
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default StoryDropDown;
