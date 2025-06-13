
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const { headers } = req;
  const upgradeHeader = headers.get("upgrade") || "";

  if (upgradeHeader.toLowerCase() !== "websocket") {
    return new Response("Expected WebSocket connection", { status: 400 });
  }

  const { socket, response } = Deno.upgradeWebSocket(req);
  
  let openAISocket: WebSocket | null = null;
  
  console.log('WebSocket connection established');

  socket.onopen = () => {
    console.log('Client connected, establishing OpenAI connection...');
    
    // Connect to OpenAI Realtime API
    const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');
    if (!OPENAI_API_KEY) {
      console.error('OPENAI_API_KEY not found');
      socket.close(1011, 'Server configuration error');
      return;
    }

    openAISocket = new WebSocket(
      "wss://api.openai.com/v1/realtime?model=gpt-4o-realtime-preview-2024-10-01",
      {
        headers: {
          "Authorization": `Bearer ${OPENAI_API_KEY}`,
          "OpenAI-Beta": "realtime=v1"
        }
      }
    );

    openAISocket.onopen = () => {
      console.log('Connected to OpenAI Realtime API');
    };

    openAISocket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log('OpenAI message type:', data.type);
        
        // Forward OpenAI messages to client
        if (socket.readyState === WebSocket.OPEN) {
          socket.send(event.data);
        }
      } catch (error) {
        console.error('Error processing OpenAI message:', error);
      }
    };

    openAISocket.onerror = (error) => {
      console.error('OpenAI WebSocket error:', error);
    };

    openAISocket.onclose = (event) => {
      console.log('OpenAI connection closed:', event.code, event.reason);
      if (socket.readyState === WebSocket.OPEN) {
        socket.close(1011, 'OpenAI connection lost');
      }
    };
  };

  socket.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data);
      console.log('Client message type:', data.type);
      
      // Forward client messages to OpenAI
      if (openAISocket?.readyState === WebSocket.OPEN) {
        openAISocket.send(event.data);
      } else {
        console.warn('OpenAI socket not ready, message dropped');
      }
    } catch (error) {
      console.error('Error processing client message:', error);
    }
  };

  socket.onerror = (error) => {
    console.error('Client WebSocket error:', error);
  };

  socket.onclose = () => {
    console.log('Client disconnected');
    if (openAISocket?.readyState === WebSocket.OPEN) {
      openAISocket.close();
    }
  };

  return response;
});
