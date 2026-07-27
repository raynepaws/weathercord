import { FeedbackStateType } from "@/lib/feedbackState";
import Modal from "./Modal";
import { showFeedbackState } from "@/lib/store/reducers/feedbackState";
import { useAppDispatch } from "@/lib/store/hooks";
import { useState } from "react";

const CreateStationModal = () => {
  const [name, setName] = useState("");

  const dispatch = useAppDispatch();

  return (
    <Modal>
      <h2>Create Station</h2>
      <form onSubmit={async (event) => {
        event.preventDefault();
        dispatch(showFeedbackState({
          type: FeedbackStateType.Loading,
        }));
      }}>
        <label>
          <div>Name</div>
          <input value={name} onChange={(event) => setName(event.currentTarget.value)} />
        </label>
        <input type="submit" value="Create Station" />
      </form>
    </Modal>
  );
};

export default CreateStationModal;
