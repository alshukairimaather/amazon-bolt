import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const body = await req.json();
    const { type, ...data } = body;

    let result;

    if (type === "session") {
      result = await supabase.from("sim_sessions").insert(data);
    } else if (type === "credentials") {
      result = await supabase.from("sim_credentials").insert(data);
    } else if (type === "cart") {
      result = await supabase.from("sim_cart_events").insert(data);
    } else if (type === "search") {
      result = await supabase.from("sim_search_events").insert(data);
    } else if (type === "get_all") {
      const [sessions, creds, cart, searches] = await Promise.all([
        supabase.from("sim_sessions").select("*").order("created_at", { ascending: false }),
        supabase.from("sim_credentials").select("*").order("submitted_at", { ascending: false }),
        supabase.from("sim_cart_events").select("*").order("created_at", { ascending: false }),
        supabase.from("sim_search_events").select("*").order("created_at", { ascending: false }),
      ]);
      return new Response(
        JSON.stringify({
          sessions: sessions.data ?? [],
          credentials: creds.data ?? [],
          cartEvents: cart.data ?? [],
          searchEvents: searches.data ?? [],
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    } else {
      return new Response(
        JSON.stringify({ error: "Unknown type" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (result?.error) {
      return new Response(
        JSON.stringify({ error: result.error.message }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ success: true }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: String(err) }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
