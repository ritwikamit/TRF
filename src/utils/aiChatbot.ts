import { STUDIO_INFO, PROJECTS } from '../data/projects';
import { GoogleGenAI } from '@google/genai';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: Date;
  action?: {
    type: 'whatsapp' | 'inquiry' | 'call';
    label: string;
    url?: string;
  };
}

// Comprehensive Studio Knowledge Base for training
const TRF_KNOWLEDGE_PROMPT = `
You are the wedding coordinator and cinema production lead at "The Royal Films" (TRF) in Gaya, Bihar, working directly with director Niraj Singh.

STRICT CONVERSATION RULES:
- CRITICAL: NEVER INTRODUCE YOURSELF. Do NOT say "I am...", "My name is...", "Welcome to The Royal Films", or "Here at The Royal Films I am...". The user already knows who you are from the chat header.
- DO NOT start messages with repetitive greetings ("Namaste!", "Hello there!"). You are already in the middle of a continuous conversation. Jump straight into the direct answer or advice.
- Speak naturally and warmly like a real human filmmaker/coordinator — NEVER sound like an AI.
- Keep answers concise, accurate, and direct (1 to 3 short sentences or clean bullet points).
- NEVER give generic robotic disclaimers or repetitive introductions.

STUDIO FACTS:
- Studio: The Royal Films (TRF), established 2018 in Gaya, Bihar.
- Founder & Director: Niraj Singh (AAFT Alumnus, trained cinema director). 4.6★ rating across 100+ verified Google reviews.
- Location: Chhotki Nawada, Near Gandhi More, Korma Road, Gaya, Bihar 823002.
- Travel: Regularly shoots weddings in Patna, Bodh Gaya, Rajgir, Muzaffarpur, Ranchi, Jamshedpur, Varanasi, Kolkata, and destination weddings across India.
- Indicative Pricing:
  • Candid Photography: ~₹50,000/day
  • Photo + 4K Cinema + Drone: ~₹70,000 – ₹85,000/day
  • Multi-day royal weddings: Custom bespoke package with complimentary pre-wedding teaser.
- Cinema Gear: Dual Sony FX6 cinema cameras, Sony A7S III (10-bit 4:2:2 S-Log3), Sony G-Master 24-70mm f/2.8, 50mm f/1.2, 85mm f/1.4, licensed DJI Mavic 3 Cine drone, wireless lavaliers for crisp vows.
- Deliverables & Timeline:
  • 4K Cinematic Teaser (3-5 min): 2 to 3 weeks.
  • Full documentary film (35-45 min) + 600-900+ edited stills: 4 to 5 weeks.
  • Albums: Handcrafted Italian leather or velvet flush-mount 12x18 albums.
- Contact: Phone/WhatsApp +91 70043 75740 | Secondary +91 95045 87351.
- Offer to connect on WhatsApp (+91 70043 75740) for date availability.
`;

// Local intelligent response engine for 100% reliable instant answers (offline/fallback)
export function getLocalResponse(query: string): { text: string; action?: ChatMessage['action'] } {
  const q = query.toLowerCase().trim();

  // 1. Pricing & Packages
  if (q.includes('price') || q.includes('cost') || q.includes('package') || q.includes('rate') || q.includes('fee') || q.includes('budget') || q.includes('quote')) {
    return {
      text: `Here is an overview of our typical wedding packages:\n\n• **Photography Only**: ~₹50,000/day (candid stills + traditional coverage)\n• **Photo + 4K Cinema + Drone**: ~₹70,000 – ₹85,000/day (dual Sony FX6 cinema cameras, licensed drone, 24-bit audio)\n• **Multi-Day Weddings (2–4 days)**: Custom packages with a complimentary pre-wedding teaser.\n\nAll packages include color-graded high-resolution photos and master 4K films. When is your wedding? Drop your dates to check availability.`,
      action: {
        type: 'whatsapp',
        label: 'Check Dates on WhatsApp',
        url: STUDIO_INFO.whatsappUrl
      }
    };
  }

  // 2. Niraj Singh / Founder / AAFT
  if (q.includes('niraj') || q.includes('founder') || q.includes('who are you') || q.includes('about') || q.includes('team') || q.includes('experience') || q.includes('background')) {
    return {
      text: `The Royal Films is led by **Niraj Singh**, an alumnus of the Asian Academy of Film and Television (AAFT).\n\nHe has been directing and documenting royal weddings since 2018 with a focus on unfiltered, candid emotions and cinema-grade color science. TRF has documented 100+ weddings across Bihar and India with a 4.6★ rating.`,
      action: {
        type: 'whatsapp',
        label: 'Message Niraj Directly',
        url: STUDIO_INFO.whatsappUrl
      }
    };
  }

  // 3. Drone & Camera Gear
  if (q.includes('gear') || q.includes('camera') || q.includes('drone') || q.includes('equipment') || q.includes('lens') || q.includes('sony') || q.includes('4k')) {
    return {
      text: `We shoot with cinema production gear:\n\n• **Cameras**: Dual Sony FX6 cinema cameras & Sony A7S III (10-bit 4:2:2 S-Log3)\n• **Lenses**: Sony G-Master 24-70mm f/2.8 GM II, 50mm f/1.2 GM, 85mm f/1.4 GM\n• **Drone**: Licensed DJI Mavic 3 Cine & DJI Air 3 4K HDR\n• **Audio**: Directional 24-bit wireless lavaliers on the couple for crisp vows\n• **Lighting**: Profoto off-camera TTL wireless lighting.`,
      action: {
        type: 'inquiry',
        label: 'View Portfolio Works'
      }
    };
  }

  // 4. Pre-wedding / Concept Shoots
  if (q.includes('pre-wedding') || q.includes('pre wedding') || q.includes('concept') || q.includes('engagement') || q.includes('couple shoot')) {
    return {
      text: `Pre-wedding films are one of our core specialties. We shoot narrative concept films at destinations like:\n\n• **Riverfront Twilight**: Ganges wooden boat journeys in Varanasi & Gaya\n• **Heritage Sites**: Bodh Gaya, Rajgir, and historic forts\n• **Modern Editorial**: Minimalist indoor sets & luxury resorts\n\nDeliverables include a 90-second 4K Save-the-Date teaser, 50+ editorial stills, and music reels for your wedding entrance.`,
      action: {
        type: 'whatsapp',
        label: 'Plan Pre-Wedding Shoot',
        url: STUDIO_INFO.whatsappUrl
      }
    };
  }

  // 5. Delivery timeline / Album
  if (q.includes('delivery') || q.includes('timeline') || q.includes('how long') || q.includes('when') || q.includes('album') || q.includes('photos')) {
    return {
      text: `Our typical delivery timeline:\n\n• **4K Teaser**: 2 to 3 weeks\n• **Full Stills Collection (600–900+ photos)**: 3 to 4 weeks\n• **Full Documentary Film (35–45 mins)**: 4 to 5 weeks\n• **Albums**: Handcrafted Italian leather or velvet flush-mount 12x18 albums printed on archival paper.`,
      action: {
        type: 'whatsapp',
        label: 'Ask on WhatsApp',
        url: STUDIO_INFO.whatsappUrl
      }
    };
  }

  // 6. Location / Address / Travel
  if (q.includes('location') || q.includes('address') || q.includes('where') || q.includes('gaya') || q.includes('patna') || q.includes('travel') || q.includes('destination')) {
    return {
      text: `Our main studio is located at **Chhotki Nawada, Near Gandhi More, Korma Road, Gaya, Bihar 823002**.\n\nWe regularly travel for weddings across **Patna, Bodh Gaya, Rajgir, Muzaffarpur, Ranchi, Jamshedpur, Varanasi, Kolkata**, and destination weddings throughout India. All crew travel logistics are handled seamlessly.`,
      action: {
        type: 'whatsapp',
        label: 'Check Travel to Your City',
        url: STUDIO_INFO.whatsappUrl
      }
    };
  }

  // 7. Booking / Date Availability / Contact
  if (q.includes('book') || q.includes('reserve') || q.includes('date') || q.includes('available') || q.includes('contact') || q.includes('call') || q.includes('number') || q.includes('phone') || q.includes('whatsapp')) {
    return {
      text: `We take a limited number of weddings per season to ensure Niraj Singh and our core senior team direct every shoot.\n\nTo check availability for your wedding dates:\n• **Direct Phone/WhatsApp**: +91 70043 75740\n• **Secondary Contact**: +91 95045 87351\n• **Email**: info@theroyalfilms.in`,
      action: {
        type: 'whatsapp',
        label: 'WhatsApp Niraj Singh',
        url: STUDIO_INFO.whatsappUrl
      }
    };
  }

  // 8. Default intelligent studio answer
  return {
    text: `Namaste! Welcome to **The Royal Films**. We are a luxury wedding cinema & photography team led by AAFT filmmaker Niraj Singh in Gaya, Bihar.\n\nWould you like to know about our **packages & pricing**, **4K drone & cinema gear**, or **check availability for your wedding dates**?`,
    action: {
      type: 'whatsapp',
      label: 'Chat on WhatsApp',
      url: STUDIO_INFO.whatsappUrl
    }
  };
}


// Hybrid AI Caller: Calls Vercel Serverless /api/chat with Openrouter_API, or direct OpenRouter/Gemini API, with fallback to local trained expert
export async function sendChatMessage(userText: string, chatHistory: ChatMessage[]): Promise<{ text: string; action?: ChatMessage['action'] }> {
  // 1. Try Vercel Serverless Edge API (/api/chat) which has process.env.Openrouter_API
  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userText,
        history: chatHistory.slice(-6).map((m) => ({ sender: m.sender, text: m.text }))
      })
    });

    if (res.ok) {
      const data = await res.json();
      if (data.text && !data.fallback) {
        return {
          text: data.text,
          action: {
            type: 'whatsapp',
            label: 'Connect with Niraj on WhatsApp',
            url: STUDIO_INFO.whatsappUrl
          }
        };
      }
    }
  } catch (err) {
    // Non-fatal, proceed to client fallback
  }

  // 2. Try Direct OpenRouter API call from client if Openrouter_API was defined in Vite
  const openrouterKey =
    (typeof process !== 'undefined' && (process.env?.Openrouter_API || process.env?.OPENROUTER_API || process.env?.OPENROUTER_API_KEY)) ||
    (import.meta as any).env?.VITE_OPENROUTER_API_KEY ||
    '';

  if (openrouterKey && openrouterKey !== 'MY_OPENROUTER_API_KEY') {
    try {
      const messages = [
        { role: 'system', content: TRF_KNOWLEDGE_PROMPT },
        ...chatHistory.slice(-6).map((m) => ({
          role: m.sender === 'user' ? 'user' : 'assistant',
          content: m.text
        })),
        { role: 'user', content: userText }
      ];

      const orResponse = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${openrouterKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'https://theroyalfilms.in',
          'X-Title': 'The Royal Films Concierge'
        },
        body: JSON.stringify({
          model: 'deepseek/deepseek-chat',
          messages,
          temperature: 0.7,
          max_tokens: 500
        })
      });

      if (orResponse.ok) {
        const data = await orResponse.json();
        const content = data.choices?.[0]?.message?.content;
        if (content) {
          return {
            text: content,
            action: {
              type: 'whatsapp',
              label: 'Connect with Niraj on WhatsApp',
              url: STUDIO_INFO.whatsappUrl
            }
          };
        }
      }
    } catch (e) {
      console.warn('Direct OpenRouter fetch failed, checking Gemini / local fallback', e);
    }
  }

  // 3. Try Gemini API if key is available
  const geminiKey = (import.meta as any).env?.VITE_GEMINI_API_KEY || (import.meta as any).env?.GEMINI_API_KEY || '';
  if (geminiKey && geminiKey !== 'MY_GEMINI_API_KEY') {
    try {
      const ai = new GoogleGenAI({ apiKey: geminiKey });
      const conversation = chatHistory
        .slice(-6)
        .map((m) => `${m.sender === 'user' ? 'Guest' : 'TRF Concierge'}: ${m.text}`)
        .join('\n');

      const prompt = `${TRF_KNOWLEDGE_PROMPT}\n\nRecent Conversation:\n${conversation}\n\nGuest: ${userText}\n\nTRF Concierge (polite, direct, luxury tone):`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt
      });

      const outputText = response.text || '';
      if (outputText) {
        return {
          text: outputText,
          action: {
            type: 'whatsapp',
            label: 'Connect with Niraj on WhatsApp',
            url: STUDIO_INFO.whatsappUrl
          }
        };
      }
    } catch (error) {
      console.warn('Gemini API call failed, using studio knowledge base:', error);
    }
  }

  // 4. Instant high-fidelity trained studio response fallback
  await new Promise((resolve) => setTimeout(resolve, 350));
  return getLocalResponse(userText);
}

