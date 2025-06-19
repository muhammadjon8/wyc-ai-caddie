import {
  useVoiceAssistant,
  BarVisualizer,
  VoiceAssistantControlBar,
  useTrackTranscription,
  useLocalParticipant,
} from "@livekit/components-react";
import { Track } from "livekit-client";
import { useEffect, useState } from "react";
import "./SimpleVoiceAssistant.css";

const Message = ({ type, text }) => {
  return (
    <div className="message">
      <strong className={`message-${type}`}>
        {type === "agent" ? "Agent: " : "You: "}
      </strong>
      <span className="message-text">{text}</span>
    </div>
  );
};

const SimpleVoiceAssistant = () => {
  const { state, audioTrack, agentTranscriptions } = useVoiceAssistant();
  const localParticipant = useLocalParticipant();
  const { segments: userTranscriptions } = useTrackTranscription({
    publication: localParticipant.microphoneTrack,
    source: Track.Source.Microphone,
    participant: localParticipant.localParticipant,
  });

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const allMessages = [
      ...(agentTranscriptions?.map((t) => ({ ...t, type: "agent" })) ?? []),
      ...(userTranscriptions?.map((t) => ({ ...t, type: "user" })) ?? []),
    ].sort((a, b) => a.firstReceivedTime - b.firstReceivedTime);
    setMessages(allMessages);
  }, [agentTranscriptions, userTranscriptions]);

  return (
    <div className="assistant-layout">
      <div className="conversation-panel">
        <div className="visualizer-container">
          <BarVisualizer state={state} barCount={7} trackRef={audioTrack} />
        </div>
        <div className="control-section">
          <VoiceAssistantControlBar />
          <div className="conversation">
            {messages.map((msg, index) => (
              <Message key={msg.id || index} type={msg.type} text={msg.text} />
            ))}
          </div>
        </div>
      </div>

      <div className="course-conditions">
        <h3>Course Conditions</h3>
        <ul className="conditions-list">
          <li>🌤️ Weather: Sunny</li>
          <li>📏 Distance to hole: 120 yards</li>
          <li>🏌️‍♂️ Shot type: Approach</li>
          <li>🌱 Lie quality: Fairway</li>
        </ul>
      </div>
    </div>
  );
  
};
export default SimpleVoiceAssistant;
