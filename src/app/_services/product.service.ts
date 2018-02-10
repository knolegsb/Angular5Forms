import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { IProduct } from '../_interfaces/IProduct';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/of';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { PaginatedResult } from '../_interfaces/IPagination';

@Injectable()
export class ProductService {
    private baseUrl = 'api/products';
    private products: IProduct[];

    private selectedProductSource = new BehaviorSubject<IProduct | null>(null);
    selectedProductChanges$ = this.selectedProductSource.asObservable();

    constructor(private http: Http) { }

    changeSelectedProduct(selectedProduct: IProduct | null): void {
        this.selectedProductSource.next(selectedProduct);
    }

    getProducts(): Observable<IProduct[]> {
        return this.http.get(this.baseUrl)
            .map(this.extractData)
            .do(data => console.log('getProducts: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    // getProducts(page?: number, itemsPerPage?: number) {
    //     const paginatedResult: PaginatedResult<IProduct[]> = new PaginatedResult<IProduct[]>();
    //     let queryString = '?';
    //     if (page != null && itemsPerPage != null) {
    //         queryString += 'pageNumber=' + page + '&pageSize=' + itemsPerPage;
    //     }

    //     return this.http.get(this.baseUrl + '/products' + queryString)
    //         .map((response: Response) => {
    //             paginatedResult.result = response.json();

    //             return paginatedResult;
    //         })
    //         .catch(this.handleError);
    // }

    getProduct(id: number): Observable<IProduct> {
        if (id == 0)
            return Observable.of(this.initializeProduct());

        const url = `${this.baseUrl}/${id}`;
        return this.http.get(url)
            .map(this.extractData)
            .do(data => console.log('getProduct: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    saveProduct(product: IProduct): Observable<IProduct> {
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});

        if (product.id == 0) {
            return this.createProduct(product, options);
        }
        return this.updateProduct(product, options);
    }

    private createProduct(product: IProduct, options: RequestOptions): Observable<IProduct> {
        product.id = undefined;
        return this.http.post(this.baseUrl, product, options)
            .map(this.extractData)
            .do(data => console.log('createProduct: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    private updateProduct(product: IProduct, options: RequestOptions): Observable<IProduct> {
        const url = `${this.baseUrl}/${product.id}`;
        return this.http.put(url, product, options)
            .map(() => product)
            .do(data => console.log('updateProduct: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    deleteProduct(id:number) : Observable<IProduct> {
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});

        const url = `${this.baseUrl}/${id}`;
        return this.http.delete(url, options)
            .do(data => console.log('deleteProduct: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    private extractData(response: Response) {
        let body = response.json();
        return body.data || {};
    }

    private handleError(error: Response): Observable<any> {
        console.log(error);
        return Observable.throw(error.json().error || 'Server Error');
    }

    initializeProduct(): IProduct {
        return {
            id: 0,
            productName: null,
            productCode: null,
            tags: [''],
            releaseDate: null,
            price: null,
            description: null,
            starRating: null,
            imageUrl: null,
            category: null
        };
    }
}