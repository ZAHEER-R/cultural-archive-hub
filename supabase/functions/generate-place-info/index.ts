import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { query } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          {
            role: "system",
            content: `You are a cultural knowledge database. When given a place name (city/town/village), return a JSON object with this exact structure. Return ONLY valid JSON, no markdown.
{
  "id": "lowercase-hyphenated-name",
  "name": "Place Name",
  "country": "Country",
  "region": "Region (South Asia/East Asia/Europe/Africa/Middle East/North America/South America/Southeast Asia/Oceania/Central Asia/Caribbean/Central America)",
  "continent": "Continent",
  "lat": 0.0,
  "lng": 0.0,
  "population": "estimate",
  "languages": ["lang1"],
  "cultures": [
    {"title": "Culture Title", "category": "Festivals", "description": "2-3 sentence description", "religion": "optional", "celebrationDate": "optional"}
  ],
  "touristPlaces": ["place1", "place2"],
  "famousFood": ["food1", "food2"],
  "famousRestaurants": ["restaurant1"],
  "beaches": [],
  "rivers": [],
  "parks": ["park1"],
  "malls": [],
  "history": "2-3 paragraph history of the place",
  "dressingStyle": "Traditional clothing description",
  "traditions": "Key traditions description",
  "festivals": [{"name": "Festival Name", "date": "When", "description": "Brief description"}],
  "practices": "Cultural practices description"
}
Include at minimum 3 cultures covering different categories like Festivals, Cuisine, Architecture, Dance Forms, Craft Techniques, etc.
Always include real, accurate data. If the place is very small, include whatever is known.`
          },
          { role: "user", content: `Provide complete cultural information for: ${query}` },
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "return_place_info",
              description: "Return structured place information",
              parameters: {
                type: "object",
                properties: {
                  id: { type: "string" },
                  name: { type: "string" },
                  country: { type: "string" },
                  region: { type: "string" },
                  continent: { type: "string" },
                  lat: { type: "number" },
                  lng: { type: "number" },
                  population: { type: "string" },
                  languages: { type: "array", items: { type: "string" } },
                  cultures: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        title: { type: "string" },
                        category: { type: "string" },
                        description: { type: "string" },
                        religion: { type: "string" },
                        celebrationDate: { type: "string" },
                      },
                      required: ["title", "category", "description"],
                    },
                  },
                  touristPlaces: { type: "array", items: { type: "string" } },
                  famousFood: { type: "array", items: { type: "string" } },
                  famousRestaurants: { type: "array", items: { type: "string" } },
                  beaches: { type: "array", items: { type: "string" } },
                  rivers: { type: "array", items: { type: "string" } },
                  parks: { type: "array", items: { type: "string" } },
                  malls: { type: "array", items: { type: "string" } },
                  history: { type: "string" },
                  dressingStyle: { type: "string" },
                  traditions: { type: "string" },
                  festivals: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        name: { type: "string" },
                        date: { type: "string" },
                        description: { type: "string" },
                      },
                    },
                  },
                  practices: { type: "string" },
                },
                required: ["id", "name", "country", "region", "continent", "lat", "lng", "population", "languages", "cultures"],
              },
            },
          },
        ],
        tool_choice: { type: "function", function: { name: "return_place_info" } },
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded, please try again." }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Usage limit reached." }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI error:", response.status, t);
      throw new Error("AI gateway error");
    }

    const data = await response.json();
    const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];
    if (toolCall?.function?.arguments) {
      const placeInfo = JSON.parse(toolCall.function.arguments);
      return new Response(JSON.stringify({ success: true, data: placeInfo }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Fallback: try to parse content as JSON
    const content = data.choices?.[0]?.message?.content || "";
    try {
      const parsed = JSON.parse(content);
      return new Response(JSON.stringify({ success: true, data: parsed }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    } catch {
      return new Response(JSON.stringify({ success: false, error: "Could not parse response" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
  } catch (e) {
    console.error("Error:", e);
    return new Response(JSON.stringify({ success: false, error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
