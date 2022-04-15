import {Component} from 'react'
import Emmiter from './Emmiter'

class WebSocket extends Component {
  const socketUrl = 'ws://127.0.0.1:4000';
  const [instrument, setInstrument] = useState({});
  const { sendJsonMessage, lastJsonMessage, readyState} = useWebSocket(socketUrl)

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
  });

  render() {
    return <span>{console.log("WebSocket rendering...")}</span>;
  }
}