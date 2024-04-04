import { useState } from "react";
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from '@chatscope/chat-ui-kit-react';

const ChatBox = () => {
    const [typing, setTyping]  = useState(false);
    const [messages, setMessages] = useState([
        {
            message: "Xin chào, tôi là ChatBox",
            sender: "chatGPT",
            direction: "incoming"
        }
    ])

    const handleSend = async (message) => {
        const newMessage = {
            message: message,
            sender: "user",
            direction: "outgoing"
        }

        const newMessages = [...messages, newMessage];
        setMessages(newMessages);

        setTyping(true);

        await processMessageToChatGPT(newMessages);
    }

    async function processMessageToChatGPT(chatMeassge) {
        let apiMeassages = chatMeassge.map((messageObject) => {
            let role = "";
            if (messageObject.sender === "chatGPT") {
                role = "assistant"
            } else { role = "user"}

            return { role: role, content: messageObject.message }
        });

        const systemMessage = {
            role: "system",
            content: "Vật lý 12"
        }

        const apiRequestBody = {
            "model": "gpt-3.5-turbo",
            "messages": [
                systemMessage,
                ...apiMeassages
            ]
        }

        await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + process.env.REACT_APP_API_KEY,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(apiRequestBody)
        }).then((data) => {
            return data.json();
        }).then((data) => {
            console.log(data);
        });
    }
    return(
        <div className="relative h-[500px]">
            <MainContainer>
                <ChatContainer>
                    <MessageList
                        typingIndicator={typing? <TypingIndicator content="Chatbox đang soạn tin"/> : null}>
                        {messages.map((message, i) => (
                            <Message key={i} model={message} />
                        ))}
                    </MessageList>
                    <MessageInput placeholder="Nhập tại đây..." onSend={handleSend}/>
                </ChatContainer>
            </MainContainer>
        </div>
    )

}

export default ChatBox;