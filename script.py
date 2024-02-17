# from bs4 import BeautifulSoup
import requests
from supabase import create_client
# import os
# from postgrest_py import Postgrest

supabase_url = 'https://onmcnotmyeildgqtsbwl.supabase.co'
# supabase_url = os.environ.get("SUPABASE_URL")
# supabase_key = os.environ.get("SUPABASE_KEY")
supabase_key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9ubWNub3RteWVpbGRncXRzYndsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTYzNjE0ODEsImV4cCI6MjAxMTkzNzQ4MX0.SN9ZMZxfPFI84rsxCaUVMorkvE51Rv7MSVg7znw5MtA'
supabase = create_client(supabase_url, supabase_key)
# headers = {
#     "apikey": supabase_key,
#     "Authorization": "Bearer YOUR_SUPABASE_AUTH_TOKEN"
# }
# client = Postgrest(supabase_url, headers=headers, schema="public")

HEADERS = {
    "apikey": supabase_key,
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9ubWNub3RteWVpbGRncXRzYndsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTYzNjE0ODEsImV4cCI6MjAxMTkzNzQ4MX0.SN9ZMZxfPFI84rsxCaUVMorkvE51Rv7MSVg7znw5MtA",
    "Content-Type": "application/json",
    "Prefer": "return=representation"
}

def update_artist():
    res = supabase.table('dances').select("artist").execute()
    rows = res.data
    artist_set = set(row['artist'] for row in rows)

    for artist_name in artist_set: 
        # update_payload = {"Exists": True}
        # response = requests.patch(f"{supabase_url}/artists?Name=eq.{artist_name}", json=update_payload, headers=HEADERS)

        # Iterate over the artist set and update the "famous" column in the "artists" table
        #     for artist_name in artist_set:
        artists_response = supabase.table('artists').select('*').eq('Name', artist_name).execute()
        artists_rows = artists_response.data
        
        if not artists_rows:
            print(f"No artist found with name: {artist_name}")
            continue

        # print(artists_rows)
        artist_row = artists_rows[0]
        
        # Set the "famous" column to true
        data = supabase.table('artists').update({
            'Exists': True
        }).eq('Name', artist_name).execute()
        
        # print(data)
        # if data:
        #     print(f"Failed to update artist {artist_name}: ", data)

# import asyncio
# asyncio.run(update_artist_fame())
update_artist()