import { Injectable } from '@angular/core';
import { Product } from './../models/product';

@Injectable({ providedIn: 'root' })
export class UtilsService {

    // Function to split array into chunks (rows of size products)
    chunkArray(arr: Product[], size: number): Product[][] {
        const chunkedArray: Product[][] = [];
        for (let i = 0; i < arr.length; i += size) {
            chunkedArray.push(arr.slice(i, i + size));
        }
        return chunkedArray;
    }

}