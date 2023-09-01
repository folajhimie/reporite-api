
export class ApiFeatures {
    public queryStr: { [key: string]: string }; // Assuming the queryStr object has a 'keyword' property
    public query: any; // Replace 'any' with the actual type of your MongoDB query object

    constructor(queryStr: { keyword?: string }, query: any) {
        this.queryStr = queryStr;
        this.query = query;
    }

    search(): ApiFeatures {
        const keyword = this.queryStr.keyword
            ? {
                name: {
                    $regex: this.queryStr.keyword,
                    $options: "i",
                },
            }
            : {};
        this.query = this.query.find({ ...keyword });
        return this;
    }

    filter(): ApiFeatures {
        const queryCopy = { ...this.queryStr };

        // Removing some fields for filtering
        const removeFields: string[] = ["keyword", "page", "limit"];

        removeFields.forEach((key) => delete queryCopy[key]);

        this.query = this.query.find(queryCopy);
        return this;
    }

    pagination(resultPerPage: number): ApiFeatures {
        const currentPage = Number(this.queryStr.page) || 1;
        const skip = resultPerPage * (currentPage - 1);

        this.query = this.query.limit(resultPerPage).skip(skip);

        return this;
    }

}



// class YourMongoDBQueryClass {
//     private queryStr: { page?: string }; // Adjust the type as needed
//     private query: any; // Replace 'any' with the actual type of your MongoDB query object

//     constructor(queryStr: { page?: string }, query: any) {
//       this.queryStr = queryStr;
//       this.query = query;
//     }

//     pagination(resultPerPage: number): YourMongoDBQueryClass {
//       const currentPage = Number(this.queryStr.page) || 1;
//       const skip = resultPerPage * (currentPage - 1);

//       this.query = this.query.limit(resultPerPage).skip(skip);

//       return this;
//     }
//   }





// class YourMongoDBQueryClass {
//     private queryStr: { [key: string]: any }; // Adjust the type as needed
//     private query: any; // Replace 'any' with the actual type of your MongoDB query object

//     constructor(queryStr: { [key: string]: any }, query: any) {
//       this.queryStr = queryStr;
//       this.query = query;
//     }

//     filter(): YourMongoDBQueryClass {
//       const queryCopy = { ...this.queryStr };

//       // Removing some fields for filtering
//       const removeFields: string[] = ["keyword", "page", "limit"];

//       removeFields.forEach((key) => delete queryCopy[key]);

//       this.query = this.query.find(queryCopy);
//       return this;
//     }
//   }


// class YourMongoDBQueryClass {
//     private queryStr: { keyword?: string }; // Assuming the queryStr object has a 'keyword' property
//     private query: any; // Replace 'any' with the actual type of your MongoDB query object

//     constructor(queryStr: { keyword?: string }, query: any) {
//       this.queryStr = queryStr;
//       this.query = query;
//     }

//     buildQuery(): YourMongoDBQueryClass {
//       const keyword = this.queryStr.keyword
//         ? {
//             name: {
//               $regex: this.queryStr.keyword,
//               $options: "i",
//             },
//           }
//         : {};
//       this.query = this.query.find({ ...keyword });
//       return this;
//     }
// }

// type ObjectWithOnlyStringKeys<T> = {
//     [K in keyof T as string]: T[K];
//   };

//   const exampleObject = {
//     key1: "value1",
//     key2: "value2",
//   };

//   const stringWithOnlyStringKeys: ObjectWithOnlyStringKeys<typeof exampleObject> = {
//     key1: "new value1",
//     key2: "new value2",
//   };

//   // Error: Property 'key3' does not exist on type 'ObjectWithOnlyStringKeys<{ key1: string; key2: string; }>'
//   stringWithOnlyStringKeys.key3 = "value3"; // This line will cause a compilation error


// interface PaginationOptions {
//     page: number;
//     pageSize: number;
// }

// interface SearchOptions {
//     query: string;
// }

// interface FilterOptions {
//     category?: string;
//     priceRange?: [number, number];
// }

// interface Product {
//     id: string;
//     name: string;
//     category: string;
//     price: number;
// }

// class ProductList {
//     private products: Product[];

//     constructor(products: Product[]) {
//         this.products = products;
//     }

//     getProducts(
//         paginationOptions: PaginationOptions,
//         searchOptions: SearchOptions,
//         filterOptions: FilterOptions
//     ): Product[] {
//         // Apply pagination
//         const startIndex = (paginationOptions.page - 1) * paginationOptions.pageSize;
//         const endIndex = startIndex + paginationOptions.pageSize;
//         let filteredProducts = this.products.slice(startIndex, endIndex);

//         // Apply search
//         if (searchOptions.query) {
//             filteredProducts = filteredProducts.filter((product) =>
//                 product.name.toLowerCase().includes(searchOptions.query.toLowerCase())
//             );
//         }

//         // Apply filters
//         if (filterOptions.category) {
//             filteredProducts = filteredProducts.filter(
//                 (product) => product.category === filterOptions.category
//             );
//         }
//         if (filterOptions.priceRange) {
//             filteredProducts = filteredProducts.filter(
//                 (product) =>
//                     product.price >= filterOptions.priceRange[0] &&
//                     product.price <= filterOptions.priceRange[1]
//             );
//         }

//         return filteredProducts;
//     }
// }