import React, { useState, useCallback, useEffect } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import './App.css';
import InstrumentDetail from './components/InstrumentDetail'
import MessageCreator from './components/MessageCreator'
import Emmiter from './Emmiter'
import Messages from './components/Messages'


function App() {
  const socketUrl = 'ws://127.0.0.1:4000';
  const [instrument, setInstrument] = useState({});
  const { sendJsonMessage,
    lastJsonMessage,
    readyState,
  } = useWebSocket(socketUrl)



  useEffect(() => {
    if (lastJsonMessage !== null) {
      const packet = lastJsonMessage

      if (instrument && instrument.metadata === packet.metadata) {
        console.log("Incomming update for : " + JSON.stringify(packet));
        Emmiter.publish(packet.metadata, packet)

      } else {
        console.log("Incomming message: " + JSON.stringify(packet));
        setInstrument(packet);
      }

    }
  }, [lastJsonMessage]);


  const onChange = (message) => {
    sendJsonMessage(JSON.parse(message));
  }

  return (
    <div className="App">
      {console.log("App rendring")}
      <MessageCreator onChange={onChange} />
      <div className="container-fluid">
        <div className="row">
          <div className="col-5">
            <InstrumentDetail instument={instrument} />
          </div>
          <div className="col-7">
            <Messages initial={instrument} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
