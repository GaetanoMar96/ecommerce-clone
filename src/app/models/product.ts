export interface Product { 
    name?: string;
    brand?: string;
    description?: string;
    price?: number;
    gender?: number;
    images: Array<Image>;
}

export interface Image {
    imageBin?: string;
    color?: string;
}

export interface SelectedProduct { 
    name: string;
    brand: string;
    description: string;
    price: number;
    image: string;
    color: string;
    size: number;
}
