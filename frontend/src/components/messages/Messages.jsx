// STARTER CODE SNIPPET
import useGetMessages from "../../hooks/useGetMessages";
import Message from "./Message";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import { useEffect, useRef } from "react";

const Messages = () => {
  const { messages, loading } = useGetMessages();
  const lastMessageRef = useRef();

  // scroll to the end chat
  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages]);

  return (
    <div className="px-4 flex-1 overflow-auto">
      {!loading &&
        messages.length > 0 &&
        messages.map((message) => {
          return (
            <div key={message._id} ref={lastMessageRef}>
              <Message message={message} />
            </div>
          );
        })}

      {/* OR */}

      {/* {!loading &&
        (messages.length > 0) &&
        messages.map((message) => (
          <Message key={message._id} message={message} />
        ))} */}

      {loading &&
        [...Array(3)].map((_, idx) => {
          return <MessageSkeleton key={idx} />;
        })}
      {!loading && messages.length === 0 && (
        <p className="text-center">Send a message to start the conversation</p>
      )}
    </div>
  );
};
export default Messages;
