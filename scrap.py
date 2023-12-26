
import requests
from bs4 import BeautifulSoup
import json
# Specify the URL of the website you want to scrape
url = "https://www.architonic.com/en/products/furniture/0/3210002/1"

# Send an HTTP request to the URL
response = requests.get(url)

# Check if the request was successful (status code 200)
if response.status_code == 200:
    # Parse the HTML content of the page
    soup = BeautifulSoup(response.text, 'html.parser')

    # Extract all items with the class "product-overview"
    product_overviews = soup.find_all('li', class_='product-overview')

    # Process and store the data
    products = []
    for product_elem in product_overviews:
        product = {}

                # Extract information for each product
        # Extract information for each product
        anchor_elem = product_elem.find('a', class_='hidden-title-link')
        if anchor_elem:
            product['href'] = anchor_elem.get('href', '')
            product['title'] = anchor_elem.get('title', '')
        else:
            product['href'] = ''
            product['title'] = ''

        # Check if the 'div' element with class 'product-visual-search-btn' exists
        visual_search_btn = product_elem.find('div', class_='product-visual-search-btn')
        if visual_search_btn:
            # Check if the 'data-img-url' attribute exists in the 'div' element
            product['data-img-url'] = visual_search_btn.get('data-img-url', '')
        else:
            product['data-img-url'] = ''

        # Check if the 'img' element exists
        img_elem = product_elem.find('img', class_='lazyload as-list-image')
        if img_elem:
            # Check if the 'data-src' and 'src' attributes exist in the 'img' element
            product['img_data-src'] = img_elem.get('data-src', '')
            product['img_src'] = img_elem.get('src', '')
        else:
            product['img_data-src'] = ''
            product['img_src'] = ''

        products.append(product)



    # Save the data in a JSON file
    output_file = 'products.json'
    with open(output_file, 'w') as json_file:
        json.dump(products, json_file, indent=2)

    print(f"Product data has been saved to {output_file}")
else:
    print(f"Failed to retrieve the page. Status code: {response.status_code}")
