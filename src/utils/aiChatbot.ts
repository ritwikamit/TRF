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
You are the AI Concierge for "The Royal Films" (TRF) — a premier luxury wedding photography and cinematic film studio based in Gaya, Bihar, India.

Studio Details:
- Name: The Royal Films (TRF)
- Founder & Creative Director: Niraj Singh (AAFT Alumnus, trained filmmaker)
- Established: 2018
- Address: Chhotki Nawada, Near Gandhi More, Korma Road, Gaya, Bihar 823002
- Contact: Phone/WhatsApp +91 70043 75740 | Secondary +91 95045 87351
- Email: info@theroyalfilms.in
- Google Reviews: 4.6 ★ (Over 100+ verified 5-star reviews)
- Core Ethos: Tech-enabled, authentic visual storytelling, non-intrusive candid photography, color science calibrated for Indian weddings and dusk reflections.

Services & Packages:
1. Candid Wedding Photography: Emotional micro-moments, unposed captures, documentary style.
2. 4K Cinematic Wedding Films: Directed with high-fidelity audio, narrative arc, master teasers (3-5 min) and full documentary films (35-45 min).
3. Pre-Wedding Concept Films: Riverfront sunset boat journeys (Ganges/Varanasi), heritage steppes, and destination concept shoots.
4. Licensed 4K Drone Cinematography: Aerial perspectives of grand baraat entries, palace venues, and outdoor rituals.
5. Luxury Albums: Handcrafted Italian leather and velvet flush-mount 12x18 albums with archival anti-fade printing.
6. Multi-day coverage: Haldi, Mehendi, Sangeet, Tilak, Varmala, Pheras, Bidaai, and Reception.

Pricing & Booking Policy:
- Indicative single-day photo coverage starts around ₹50,000.
- Combined photo + 4K cinema + drone starts around ₹70,000 - ₹85,000/day.
- Multi-day bespoke packages available upon date availability inquiry.
- Standard turnaround: 4K Teaser in 2-3 weeks, complete photos & film within 4-5 weeks.
- Service regions: Gaya, Bodh Gaya, Patna, Rajgir, Nalanda, Muzaffarpur, Ranchi, Jamshedpur, Varanasi, Kolkata, and destination weddings nationwide.

Tone & Instructions:
- Be warm, refined, polite, and professional (address guests respectfully).
- Answer questions accurately using the studio facts above.
- Always offer to connect the client directly with Niraj Singh on WhatsApp (+91 70043 75740) for checking date availability and customized quotes.
- Keep responses concise, organized, and helpful.
`;

// Local intelligent response engine for 100% reliable instant answers (offline/fallback)
export function getLocalResponse(query: string): { text: string; action?: ChatMessage['action'] } {
  const q = query.toLowerCase().trim();

  // 1. Pricing & Packages
  if (q.includes('price') || q.includes('cost') || q.includes('package') || q.includes('rate') || q.includes('fee') || q.includes('budget') || q.includes('quote')) {
    return {
      text: `Our bespoke wedding collections are tailored to your celebration scale:\n\n• **Standard Photography**: From ~₹50,000/day (candid stills + traditional coverage)\n• **Cinematic Film + Drone**: From ~₹70,000 – ₹85,000/day (Dual Sony FX6 4K cinema + licensed drone + audio mastering)\n• **Multi-Day Royal Collections**: Custom packages for 2 to 4-day weddings with complimentary pre-wedding teaser.\n\nEvery package includes timely delivery of color-graded high-resolution photos and master 4K films.`,
      action: {
        type: 'whatsapp',
        label: 'Get Custom Quote on WhatsApp',
        url: STUDIO_INFO.whatsappUrl
      }
    };
  }

  // 2. Niraj Singh / Founder / AAFT
  if (q.includes('niraj') || q.includes('founder') || q.includes('who are you') || q.includes('about') || q.includes('team') || q.includes('experience') || q.includes('background')) {
    return {
      text: `**The Royal Films** was founded in 2018 by **Niraj Singh**, an alumnus of the prestigious **Asian Academy of Film and Television (AAFT)**.\n\nNiraj blends classical cinematic directing techniques with modern high-speed primes and silent electronic shutters. Under his creative direction, TRF has documented over 100+ royal and heritage weddings across Bihar, Jharkhand, and India with a 4.6★ rating.`,
      action: {
        type: 'whatsapp',
        label: 'Chat with Niraj Singh',
        url: STUDIO_INFO.whatsappUrl
      }
    };
  }

  // 3. Drone & Camera Gear
  if (q.includes('gear') || q.includes('camera') || q.includes('drone') || q.includes('equipment') || q.includes('lens') || q.includes('sony') || q.includes('4k')) {
    return {
      text: `We use cinema-grade production gear to ensure royal visual fidelity:\n\n• **Cinema Bodies**: Sony FX6 & Sony A7S III (10-bit 4:2:2 S-Log3)\n• **Lenses**: Sony G-Master 24-70mm f/2.8 GM II, 50mm f/1.2 GM, 85mm f/1.4 GM\n• **Aerial Drone**: Licensed DJI Mavic 3 Cine & DJI Air 3 4K HDR\n• **Audio**: Directional 24-bit wireless lavaliers for crisp vows and speeches\n• **Lighting**: Profoto off-camera TTL wireless speedlights with soft diffusers.`,
      action: {
        type: 'inquiry',
        label: 'View Wedding Works'
      }
    };
  }

  // 4. Pre-wedding / Concept Shoots
  if (q.includes('pre-wedding') || q.includes('pre wedding') || q.includes('concept') || q.includes('engagement') || q.includes('couple shoot')) {
    return {
      text: `Yes! Pre-wedding films are one of our core specialties. We shoot romantic, story-driven concept films at iconic locations:\n\n• **Riverfront Twilight**: Ganges wooden boat journeys in Varanasi & Gaya\n• **Heritage Steppes & Hills**: Bodh Gaya, Rajgir, and historic forts\n• **Modern Editorial**: Minimalist studios and bespoke luxury resorts\n\nDeliverables include a 90-second 4K Save-the-Date teaser, 50+ editorial stills, and music-synchronized reels for your wedding entrance.`,
      action: {
        type: 'whatsapp',
        label: 'Plan Pre-Wedding Concept',
        url: STUDIO_INFO.whatsappUrl
      }
    };
  }

  // 5. Delivery timeline / Album
  if (q.includes('delivery') || q.includes('timeline') || q.includes('how long') || q.includes('when') || q.includes('album') || q.includes('photos')) {
    return {
      text: `We respect your anticipation and guarantee prompt delivery:\n\n• **Cinematic 4K Teaser**: 2 – 3 weeks post-wedding\n• **Full Stills Collection (600–900+ photos)**: 3 – 4 weeks\n• **Full Documentary Film (35–45 mins)**: 4 – 5 weeks\n• **Albums**: Handcrafted Italian leather or silk-embossed 12x18 flush-mount albums printed on anti-fade archival paper.`,
      action: {
        type: 'whatsapp',
        label: 'Inquire on WhatsApp',
        url: STUDIO_INFO.whatsappUrl
      }
    };
  }

  // 6. Location / Address / Travel
  if (q.includes('location') || q.includes('address') || q.includes('where') || q.includes('gaya') || q.includes('patna') || q.includes('travel') || q.includes('destination')) {
    return {
      text: `Our main studio is located at **Chhotki Nawada, Near Gandhi More, Korma Road, Gaya, Bihar 823002**.\n\nWe regularly travel for weddings across **Patna, Bodh Gaya, Rajgir, Muzaffarpur, Ranchi, Jamshedpur, Varanasi, Kolkata**, and destination weddings throughout India. All travel and crew logistics are handled seamlessly.`,
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
      text: `Dates are reserved on a first-confirmed basis to ensure our core team directs your wedding.\n\nTo check availability for your dates:\n• **Direct Phone/WhatsApp**: +91 70043 75740\n• **Secondary Contact**: +91 95045 87351\n• **Email**: info@theroyalfilms.in\n\nClick below to connect with Niraj Singh directly on WhatsApp.`,
      action: {
        type: 'whatsapp',
        label: 'WhatsApp +91 70043 75740',
        url: STUDIO_INFO.whatsappUrl
      }
    };
  }

  // 8. Default intelligent studio answer
  return {
    text: `Thank you for reaching out to **The Royal Films**! We are a luxury wedding cinema and photography studio directed by AAFT alumnus Niraj Singh.\n\nWe provide:\n• Candid Photography & Cinematic 4K Films\n• 4K Drone Aerial Coverage\n• Pre-Wedding Concept Shoots\n• Handcrafted Italian Flush-Mount Albums\n\nWould you like to know about our **packages & pricing**, **drone & camera equipment**, or **check date availability**?`,
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

