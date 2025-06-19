import {
  LiveKitRoom,
  RoomAudioRenderer,
  GearIcon,
} from "@livekit/components-react";
import "@livekit/components-styles";
import SimpleVoiceAssistant from "../components/SimpleVoiceAssistant";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

export const LiveKitModal = ({ setShowSupport }) => {
  const navigate = useNavigate();
  const { userToken, livekitUrl } = useUser();
  if (!userToken || !livekitUrl) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <GearIcon className="h-8 w-8 animate-spin text-green-600" />
          <p className="mt-4 text-lg text-gray-700">
            Loading your session, please wait...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="assistant-layout">
      <LiveKitRoom
        serverUrl={livekitUrl}
        token={userToken}
        connect={true}
        video={false}
        audio={true}
        onDisconnected={() => {
          setShowSupport(false);
          setTimeout(() => navigate("/"), 100);
        }}
      >
        <RoomAudioRenderer />
        <SimpleVoiceAssistant />
      </LiveKitRoom>
    </div>
  );
};

export default LiveKitModal;
