import { IShopInterface } from "../../../interfaces /Production/Shop/shopInterface";

import { Request } from "../../../models/Request/request";

export default interface IShopRepository {
    createShop(req: any): Promise<any>;
    updateShop(req: any, shopData: Partial<IShopInterface>): Promise<any>;
    getAllShop(reqQuery: any): Promise <any>;
    getSingleShop(reqParamsId: any): Promise<any>;
    deleteShop(reqParams: any): Promise<any>;
    deactivateShop(reqParamsId: any): Promise<any>;
    searchShop(req: any): Promise<any>;
}

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const SearchShop = () => {
//   const [query, setQuery] = useState('');
//   const [sort, setSort] = useState(''); // Store sorting option here
//   const [page, setPage] = useState(1); // Current page number
//   const [limit, setLimit] = useState(10); // Items per page
//   const [shops, setShops] = useState([]);
//   const [totalPages, setTotalPages] = useState(0);

//   useEffect(() => {
//     // Define an Axios GET request to fetch shops based on query, sort, page, and limit
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(`/api/search-shops?query=${query}&sort=${sort}&page=${page}&limit=${limit}`);
//         setShops(response.data.shops);
//         setTotalPages(response.data.totalPages);
//       } catch (error) {
//         console.error('Error fetching shops:', error);
//       }
//     };

//     // Call fetchData when any of the query parameters change
//     fetchData();
//   }, [query, sort, page, limit]);

//   // Handle input changes and pagination clicks

//   return (
//     <div>
//       <h1>Search Shops</h1>
//       <form>
//         <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by name" />
//         <select value={sort} onChange={(e) => setSort(e.target.value)}>
//           <option value="">Sort by</option>
//           <option value="name-asc">Name (A-Z)</option>
//           <option value="name-desc">Name (Z-A)</option>
//         </select>
//         <button type="submit">Search</button>
//       </form>
//       <ul>
//         {shops.map((shop) => (
//           <li key={shop._id}>{shop.name}</li>
//         ))}
//       </ul>
//       <div>
//         <button onClick={() => setPage(page - 1)} disabled={page === 1}>
//           Previous Page
//         </button>
//         <span>Page {page} of {totalPages}</span>
//         <button onClick={() => setPage(page + 1)} disabled={page === totalPages}>
//           Next Page
//         </button>
//       </div>
//     </div>
//   );
// };

// export default SearchShop;
