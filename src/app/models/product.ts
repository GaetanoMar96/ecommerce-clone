export interface Product { 
    name?: string;
    brand?: string;
    description?: string;
    price?: number;
    gender?: string;
    images: Array<Image>;
}


export interface Image {
    color: string;
    image: string
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
