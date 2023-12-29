import firebase_admin
from firebase_admin import credentials, firestore
import json

def initialize_firebase():
    cred = credentials.Certificate('firebase-adminsdk.json')
    firebase_admin.initialize_app(cred)
    return firestore.client()

def main():
    db = initialize_firebase()
    with open('functions\\ecommerce_products.json', 'r') as file:
        data = json.load(file)
        for product_data in data:
            db.collection('products').add(product_data)

if __name__ == "__main__":
    main()