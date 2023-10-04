from supabase_py import create_client, Client

# Connect to your Supabase project
url: str = 'https://onmcnotmyeildgqtsbwl.supabase.co'
anon_key: str = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9ubWNub3RteWVpbGRncXRzYndsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTYzNjE0ODEsImV4cCI6MjAxMTkzNzQ4MX0.SN9ZMZxfPFI84rsxCaUVMorkvE51Rv7MSVg7znw5MtA'
supabase: Client = create_client(url, anon_key)

# Fetch all rows from the table
table = supabase.table("dance_tutorial_videos")
response = table.select("id, title").execute()
# print(response)
rows = response['data']
# print(rows)

# Check and update each row
for row in rows:
    # print(row)
    id = row['id']
    # if "TUTORIAL" in row['title']:
        # Update the row to have "tutorial" in the tutorial column
    data, count = supabase.table('other').update({'name': 'Australia'}).eq('id', 1).execute()
        # table.update({"tutorial": "tutorial"}).eq("id", id).execute()
    # else:
        # Update the row to have "cover" in the tutorial column
        # table.update({"tutorial": "cover"}).eq("id", id).execute()
