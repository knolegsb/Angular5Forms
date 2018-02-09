import { InMemoryDbService, InMemoryBackendConfig } from 'angular-in-memory-web-api';
import { IProduct } from '../_interfaces/IProduct';

export class ProductData implements InMemoryDbService, InMemoryBackendConfig {
    createDb() {
        let products: IProduct[] = [
            {
                'id': 1,
                'productName': 'Samsung Hero',
                'productCode': 'GDN-0011',
                'releaseDate': 'March 19, 2016',
                'description': 'Awesome smart phone',
                'price': 219.95,
                'starRating': 3.2,
                'imageUrl': 'assets/images/product/hero.png',
                'category': 'Samsung',
                'tags': ['Samsung', 'smart phone', 'fancy design', 'long battery lif']
            },
            {
                'id': 2,
                'productName': 'IPhone 5S',
                'productCode': 'GDN-0023',
                'releaseDate': 'March 18, 2016',
                'description': 'Great smart phone',
                'price': 132.99,
                'starRating': 4.2,
                'imageUrl': 'assets/images/product/iphone-5s.jpg',
                'category': 'Apple',
            },
            {
                'id': 5,
                'productName': 'IPhone X',
                'productCode': 'TBX-0048',
                'releaseDate': 'May 21, 2016',
                'description': 'Wonderful smart phone',
                'price': 98.9,
                'starRating': 4.8,
                'imageUrl': 'assets/images/product/iphonex.jpg',
                'category': 'Apple',
                'tags': ['good reception', 'confortable grip', 'high definition camera']
            },
            {
                'id': 8,
                'productName': 'LG V30',
                'productCode': 'TBX-0022',
                'releaseDate': 'May 15, 2016',
                'description': 'It is a gorgeous smart phone',
                'price': 811.55,
                'starRating': 3.7,
                'imageUrl': 'assets/images/product/lg-v30.jpg',
                'category': 'LG',
            },
            {
                'id': 10,
                'productName': 'Samsung Galaxy S8',
                'productCode': 'GMG-0042',
                'releaseDate': 'October 15, 2015',
                'description': 'Amazing smart phone',
                'price': 935.95,
                'starRating': 4.6,
                'imageUrl': 'assets/images/product/samsung-galaxy-s8.png',
                'category': 'Samsung',
            }
        ]
        return { products };
    }
}