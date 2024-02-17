from bs4 import BeautifulSoup
import requests
from supabase_py import create_client
import os

url = 'https://dbkpop.com/db/k-pop-dance-practice-videos-list/'
response = requests.get(url)
soup = BeautifulSoup(response.content, 'html.parser')

# Assume the data is in a table
table = soup.find('table')

supabase_url = 'https://onmcnotmyeildgqtsbwl.supabase.co'
# supabase_url = os.environ.get("SUPABASE_URL")
# supabase_key = os.environ.get("SUPABASE_KEY")
supabase_key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9ubWNub3RteWVpbGRncXRzYndsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTYzNjE0ODEsImV4cCI6MjAxMTkzNzQ4MX0.SN9ZMZxfPFI84rsxCaUVMorkvE51Rv7MSVg7znw5MtA'
supabase = create_client(supabase_url, supabase_key)

# Assume each row in the table contains the data
for row in table.find_all('tr')[1:]:  # skip header row
    columns = row.find_all('td')
    date = columns[0].text
    group = columns[1].text
    song = columns[2].text
    camera_angle = columns[3].text
    video_url = columns[5].find('a')['href']
    group_type = columns[6].text
    video_data = {
        'date': date,
        'song': song,
        'artist': group,
        'url': video_url,
        'group_type':group_type,
        'camera':camera_angle,
    }
    response = supabase.table('dance_videos').insert(video_data).execute()
    print(response)
    # if response.error:
    #     print(f'Error: {response.error}')

