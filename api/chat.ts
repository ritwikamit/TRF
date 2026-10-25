export const config = {
  runtime: 'edge', // Fast edge function on Vercel
};

const TRF_SYSTEM_PROMPT = `
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
1. Candid Wedding Photography: Emotional micro-moments, unposed captures, documentary style (~₹50,000/day).
2. 4K Cinematic Wedding Films: Directed with high-fidelity audio, narrative arc, master teasers (3-5 min) and full documentary films (35-45 min) (~₹70,000 - ₹85,000/day with 4K drone).
3. Pre-Wedding Concept Films: Riverfront sunset boat journeys (Ganges/Varanasi), heritage steppes, and destination concept shoots.
4. Licensed 4K Drone Cinematography: Aerial perspectives of grand baraat entries, palace venues, and outdoor rituals.
5. Luxury Albums: Handcrafted Italian leather and velvet flush-mount 12x18 albums with archival anti-fade printing.
6. Multi-day coverage: Haldi, Mehendi, Sangeet, Tilak, Varmala, Pheras, Bidaai, and Reception.

Standard turnaround: 4K Teaser in 2-3 weeks, complete photos & film within 4-5 weeks.
Regions: Gaya, Bodh Gaya, Patna, Rajgir, Nalanda, Muzaffarpur, Ranchi, Jamshedpur, Varanasi, Kolkata, and destination weddings nationwide.

Tone & Instructions:
- Be warm, refined, polite, and professional (address guests respectfully).
- Answer questions accurately using the studio facts above.
- Offer to connect the client directly with Niraj Singh on WhatsApp (+91 70043 75740) for date availability and personalized quotes.
- Keep responses concise, organized, and helpful.
`;

export default async function handler(req: Request) {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 455,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const { userText, history } = await req.json();

    // Check OpenRouter environment keys (handling case variations)
    const apiKey =
      process.env.Openrouter_API ||
      process.env.OPENROUTER_API ||
      process.env.OPENROUTER_API_KEY ||
      process.env.VITE_OPENROUTER_API_KEY ||
      process.env.OPEN_ROUTER_API ||
      '';

    if (!apiKey) {
      return new Response(
        JSON.stringify({
          error: 'Missing Openrouter_API key',
          fallback: true
        }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const messages = [
      { role: 'system', content: TRF_SYSTEM_PROMPT },
      ...(Array.isArray(history)
        ? history.slice(-6).map((m: any) => ({
            role: m.sender === 'user' ? 'user' : 'assistant',
            content: m.text,
          }))
        : []),
      { role: 'user', content: userText },
    ];

    const openRouterRes = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://theroyalfilms.in',
        'X-Title': 'The Royal Films Concierge',
      },
      body: JSON.stringify({
        model: 'deepseek/deepseek-chat',
        messages,
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    if (!openRouterRes.ok) {
      // Try fallback model if deepseek model busy
      const fallbackRes = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'https://theroyalfilms.in',
          'X-Title': 'The Royal Films Concierge',
        },
        body: JSON.stringify({
          model: 'meta-llama/llama-3.3-70b-instruct',
          messages,
          temperature: 0.7,
          max_tokens: 500,
        }),
      });

      if (!fallbackRes.ok) {
        const errorData = await openRouterRes.text();
        return new Response(JSON.stringify({ error: errorData, fallback: true }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      const data = await fallbackRes.json();
      const botText = data.choices?.[0]?.message?.content || '';
      return new Response(JSON.stringify({ text: botText }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const data = await openRouterRes.json();
    const botText = data.choices?.[0]?.message?.content || '';

    return new Response(JSON.stringify({ text: botText }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    return new Response(
      JSON.stringify({ error: error.message || 'Server error', fallback: true }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
