import requests

url = "https://con-bcrcx-caio.zendesk.com/api/v2/macros"

headers = {
    "Content-Type": "application/json"
}

# Substitua '<username>' e '<password>' com seu nome de usuário e senha reais
response = requests.get(url, headers=headers, auth=('<username>', '<password>'))

print(response.text)