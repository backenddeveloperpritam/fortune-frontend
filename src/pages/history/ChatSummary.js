import React, { useState } from "react";
import { useStyles } from "../../assets/styles";
import Loader from "../../Components/loading/Loader";
import { connect } from "react-redux";
// import { GiftedChat } from "react-web-gifted-chat";

const ChatSummary = ({ dispatch, chatSummaryData }) => {
  const classes = useStyles();
  const [message] = useState([
    {
      id: 1,
      text: "Hello developer",
      createdAt: new Date(),
      user: {
        id: 2,
        name: "React",
        avatar: "https://facebook.github.io/react/img/logo_og.png",
      },
    },
  ]);
  return (
    <div className={classes.container}>
      <Loader />
      <div className={classes.box}>
        <div
          style={{
            display: "flex",
            flex: 3,
            flexDirection: "column",
            borderWidth: "1px",
            borderColor: "#ccc",
            borderRightStyle: "solid",
            borderLeftStyle: "solid",
            height: 400,
          }}
        >
          {/* <GiftedChat
            messages={message}
            placeholder="Enter message"
            onSend={(messages) => {}}
            user={{
              id: 1,
            }}
          /> */}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  chatSummaryData: state.history.chatSummaryData,
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(ChatSummary);
