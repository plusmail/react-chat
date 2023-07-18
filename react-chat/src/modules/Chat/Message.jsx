import React from 'react'
import {JID} from 'stanza'
import {useState} from 'react';

const ImageDisplay = ({base64ImageData}) => {
    return <img src={base64ImageData} width={300} alt="미리보기"/>;
};

const ImageHttpDisplay = ({image}) => {
    return <img src={image} width={300} alt="미리보기"/>;
};

const Message = ({message, jid}) => {
    const isJPEGImage = message.body.startsWith("data:image/jpeg;base64");
    const ishttpImage = message.body.startsWith("http://");
    const [imageData, setImageData] = useState(null);
    const handleImageReceived = (receivedImageData) => {
        setImageData(receivedImageData);
    };


    let nick
    if (message.type === 'groupchat' && message.from) {
        nick = JID.getResource(message.from)
    }
    const from = JID.toBare(message.from)
    const me = JID.toBare(jid)
    const myNick = JID.getLocal(jid)

    return (
        <div
            className={`p-2 my-1 rounded-xl max-w-11/12 flex flex-col
        ${
                from === me || myNick === nick
                    ? 'bg-gray-700 self-end'
                    : 'bg-chat-700 self-start'
            }
      `}
        >
            {imageData && <ImageDisplay base64ImageData={imageData}/>}
            {ishttpImage && <ImageHttpDisplay image={message.body}/>}
            <div className={`${nick && nick !== myNick ? '' : 'hidden'}`}>
                <span className='text-sm font-bold text-white'>{nick}</span>
            </div>
            <div className='flex'>

                <span className='text-lg self-start -mt-1'>{message.body}</span>
                <span className='text-xxs pl-4 self-end -mb-1'>
          {message.date && message.date.toLocaleString('ko-KR')}
        </span>
            </div>
            {isJPEGImage &&
                <button onClick={() => handleImageReceived(message.body)}>
                    Receive Image
                </button>
            }
            {ishttpImage &&
                <button onClick={() => handleImageReceived(message.body)}>
                    Receive Image
                </button>
            }
        </div>
    )
}

export default Message
