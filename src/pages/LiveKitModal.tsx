import {
  LiveKitRoom,
  RoomAudioRenderer,
  GearIcon,
} from "@livekit/components-react";
import "@livekit/components-styles";
import SimpleVoiceAssistant from "../components/SimpleVoiceAssistant";
import { useNavigate } from "react-router-dom";

export const LiveKitModal = ({ setShowSupport }) => {
  const navigate = useNavigate();

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="support-room">
          <LiveKitRoom
            serverUrl={import.meta.env.VITE_LIVEKIT_URL}
            token={import.meta.env.VITE_LIVEKIT_TOKEN}
            connect={true}
            video={false}
            audio={true}
            onDisconnected={() => {
              setShowSupport(false);
              setTimeout(() => navigate(-1), 100);
            }}
          >
            <RoomAudioRenderer />
            <SimpleVoiceAssistant />
          </LiveKitRoom>
        </div>
      </div>
    </div>
  );
};

export default LiveKitModal;
