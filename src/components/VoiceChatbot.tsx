
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mic, MicOff, MessageSquare, Volume2, VolumeX } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { AudioRecorder, encodeAudioForAPI, playAudioData } from '@/utils/RealtimeAudio';
import { supabase } from '@/integrations/supabase/client';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface VoiceChatbotProps {
  isOpen: boolean;
  onClose: () => void;
}

const VoiceChatbot: React.FC<VoiceChatbotProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentTranscript, setCurrentTranscript] = useState('');
  
  const wsRef = useRef<WebSocket | null>(null);
  const audioRecorderRef = useRef<AudioRecorder | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    if (isOpen && !audioContextRef.current) {
      audioContextRef.current = new AudioContext({ sampleRate: 24000 });
    }
    
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
        audioContextRef.current = null;
      }
    };
  }, [isOpen]);

  const connectToChat = async () => {
    try {
      console.log('Connecting to voice chat...');
      
      // Create WebSocket connection to our edge function
      const projectRef = window.location.hostname.includes('lovable.app') 
        ? window.location.hostname.split('.')[0] 
        : 'your-project-ref';
      
      const wsUrl = `wss://${projectRef}.functions.supabase.co/realtime-chat`;
      console.log('Connecting to:', wsUrl);
      
      wsRef.current = new WebSocket(wsUrl);
      
      wsRef.current.onopen = () => {
        console.log('WebSocket connected');
        setIsConnected(true);
        toast({
          title: "Connected",
          description: "Voice chatbot is ready to talk!"
        });
      };

      wsRef.current.onmessage = async (event) => {
        try {
          const data = JSON.parse(event.data);
          console.log('Received message:', data.type);
          
          if (data.type === 'session.created') {
            console.log('Session created, sending configuration...');
            // Send session configuration
            wsRef.current?.send(JSON.stringify({
              type: 'session.update',
              session: {
                modalities: ['text', 'audio'],
                instructions: 'You are a helpful financial assistant. Help users with their personal finance questions, budgeting advice, and expense tracking. Keep responses concise and conversational.',
                voice: 'alloy',
                input_audio_format: 'pcm16',
                output_audio_format: 'pcm16',
                input_audio_transcription: {
                  model: 'whisper-1'
                },
                turn_detection: {
                  type: 'server_vad',
                  threshold: 0.5,
                  prefix_padding_ms: 300,
                  silence_duration_ms: 1000
                },
                temperature: 0.8,
                max_response_output_tokens: 150
              }
            }));
          } else if (data.type === 'response.audio.delta') {
            // Play audio response
            const binaryString = atob(data.delta);
            const bytes = new Uint8Array(binaryString.length);
            for (let i = 0; i < binaryString.length; i++) {
              bytes[i] = binaryString.charCodeAt(i);
            }
            if (audioContextRef.current) {
              await playAudioData(audioContextRef.current, bytes);
            }
            setIsSpeaking(true);
          } else if (data.type === 'response.audio_transcript.delta') {
            // Handle assistant transcript
            setCurrentTranscript(prev => prev + data.delta);
          } else if (data.type === 'response.audio_transcript.done') {
            // Add complete assistant message
            if (currentTranscript.trim()) {
              setMessages(prev => [...prev, {
                id: Date.now().toString(),
                type: 'assistant',
                content: currentTranscript.trim(),
                timestamp: new Date()
              }]);
              setCurrentTranscript('');
            }
          } else if (data.type === 'response.audio.done') {
            setIsSpeaking(false);
          } else if (data.type === 'conversation.item.input_audio_transcription.completed') {
            // Add user message
            setMessages(prev => [...prev, {
              id: Date.now().toString(),
              type: 'user',
              content: data.transcript,
              timestamp: new Date()
            }]);
          }
        } catch (error) {
          console.error('Error processing message:', error);
        }
      };

      wsRef.current.onerror = (error) => {
        console.error('WebSocket error:', error);
        toast({
          title: "Connection Error",
          description: "Failed to connect to voice chat",
          variant: "destructive"
        });
      };

      wsRef.current.onclose = () => {
        console.log('WebSocket disconnected');
        setIsConnected(false);
        setIsListening(false);
        setIsSpeaking(false);
      };

    } catch (error) {
      console.error('Error connecting to chat:', error);
      toast({
        title: "Error",
        description: "Failed to start voice chat",
        variant: "destructive"
      });
    }
  };

  const startListening = async () => {
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new AudioContext({ sampleRate: 24000 });
      }

      audioRecorderRef.current = new AudioRecorder((audioData) => {
        if (wsRef.current?.readyState === WebSocket.OPEN) {
          const encodedAudio = encodeAudioForAPI(audioData);
          wsRef.current.send(JSON.stringify({
            type: 'input_audio_buffer.append',
            audio: encodedAudio
          }));
        }
      });

      await audioRecorderRef.current.start();
      setIsListening(true);
      
      toast({
        title: "Listening",
        description: "Speak now, I'm listening!"
      });
    } catch (error) {
      console.error('Error starting recording:', error);
      toast({
        title: "Microphone Error",
        description: "Unable to access microphone",
        variant: "destructive"
      });
    }
  };

  const stopListening = () => {
    if (audioRecorderRef.current) {
      audioRecorderRef.current.stop();
      audioRecorderRef.current = null;
    }
    setIsListening(false);
  };

  const disconnectChat = () => {
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }
    stopListening();
    setIsConnected(false);
    setMessages([]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="glass-card border-white/20 w-full max-w-md h-[500px] flex flex-col">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-bold text-white flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              Voice Assistant
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-gray-400 hover:text-white"
            >
              ✕
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="flex-1 flex flex-col space-y-4">
          {/* Connection Status */}
          <div className="flex justify-center">
            {!isConnected ? (
              <Button 
                onClick={connectToChat}
                className="bg-emerald-500 hover:bg-emerald-600 text-white"
              >
                Start Voice Chat
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button
                  onClick={isListening ? stopListening : startListening}
                  variant={isListening ? "destructive" : "default"}
                  className={isListening ? "bg-red-500 hover:bg-red-600" : "bg-blue-500 hover:bg-blue-600"}
                >
                  {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                  {isListening ? "Stop" : "Talk"}
                </Button>
                <Button
                  onClick={disconnectChat}
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10"
                >
                  End Chat
                </Button>
              </div>
            )}
          </div>

          {/* Status Indicators */}
          {isConnected && (
            <div className="flex justify-center gap-4 text-sm">
              <div className={`flex items-center gap-2 ${isListening ? 'text-green-400' : 'text-gray-400'}`}>
                <Mic className="w-4 h-4" />
                {isListening ? 'Listening...' : 'Not listening'}
              </div>
              <div className={`flex items-center gap-2 ${isSpeaking ? 'text-blue-400' : 'text-gray-400'}`}>
                {isSpeaking ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                {isSpeaking ? 'Speaking...' : 'Silent'}
              </div>
            </div>
          )}

          {/* Messages */}
          <div className="flex-1 overflow-y-auto space-y-3 min-h-0">
            {messages.length === 0 && isConnected ? (
              <div className="text-center text-gray-400 py-8">
                <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Start talking to begin the conversation!</p>
              </div>
            ) : (
              messages.map((message) => (
                <div
                  key={message.id}
                  className={`p-3 rounded-lg ${
                    message.type === 'user'
                      ? 'bg-blue-500/20 ml-8 text-blue-100'
                      : 'bg-emerald-500/20 mr-8 text-emerald-100'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <span className="text-xs opacity-70">
                    {message.timestamp.toLocaleTimeString()}
                  </span>
                </div>
              ))
            )}
            
            {/* Current transcript preview */}
            {currentTranscript && (
              <div className="bg-emerald-500/20 mr-8 text-emerald-100 p-3 rounded-lg">
                <p className="text-sm opacity-75">{currentTranscript}...</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VoiceChatbot;
