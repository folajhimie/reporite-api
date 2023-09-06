import mongoose, { Document, Schema, Model } from "mongoose";
import { IShopInterface } from "../../../interfaces /Production/Shop/shopInterface";
import { RoleType } from "../../../utils/Enums";


interface Shop extends IShopInterface, Document { }


const shopSchema: Schema = new Schema<IShopInterface>(
    {
        name: {
            type: String,
            required: [true, "Please enter your shop name!"],
        },
        email: {
            type: String,
            required: [true, "Please enter your shop email address"],
        },
        description: {
            type: String,
        },
        address: {
            type: String,
            required: true,
        },
        phoneNumber: {
            type: Number,
            required: true,
        },
        role: {
            type: String,
            enum: Object.values(RoleType),
            default: RoleType.VENDOR,
        },
        avatar: {
            type: String,
            required: true,
        },
        active: {
            type: Boolean,
            required: true,
            default: true
        },
        withdrawMethod: {
            id: {
                type: String,
                required: true,
            },
            withdrawType: {
                type: String,
                default: "Transfer",
            },
        },
        availableBalance: {
            type: Number,
            default: 0,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        products: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Product'
        },
        transactions: [
            {
                amount: {
                    type: Number,
                    required: true,
                },
                status: {
                    type: String,
                    default: "Processing",
                },
                createdAt: {
                    type: Date,
                    default: Date.now(),
                },
                updatedAt: {
                    type: Date,
                },
            },
        ],
        createdAt: {
            type: Date,
            default: Date.now(),
        },

    },
    { timestamps: true }
);

const Shop: Model<IShopInterface> = mongoose.model<Shop>("Shop", shopSchema);
export default Shop;


// import { Request, Response } from 'express';
// import Shop, { IShopInterface } from './path-to-your-shop-model'; // Import your Shop model and interface

// export const searchShops = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const { keyword, filters, sort, page, limit } = req.query;

//     // Create a query object to filter shops based on user input
//     const query: any = {};
//     if (keyword) {
//       query.$or = [
//         { name: { $regex: keyword, $options: 'i' } }, // Case-insensitive name search
//         // Add more fields to search here
//       ];
//     }

//     // Apply filters
//     if (filters) {
//       // Parse and apply filters as needed
//     }

//     // Sorting options
//     const sortOptions: any = {};
//     if (sort) {
//       if (sort === 'asc') {
//         sortOptions.name = 1; // Sort shops by name in ascending order
//       } else if (sort === 'desc') {
//         sortOptions.name = -1; // Sort shops by name in descending order
//       }
//     }

//     // Pagination
//     const pageNumber = parseInt(page as string) || 1;
//     const pageSize = parseInt(limit as string) || 10;
//     const skip = (pageNumber - 1) * pageSize;

//     // Fetch shops based on the query
//     const shops: IShopInterface[] = await Shop.find(query)
//       .sort(sortOptions)
//       .skip(skip)
//       .limit(pageSize);

//     const totalShops: number = await Shop.countDocuments(query);

//     res.status(200).json({
//       success: true,
//       shops,
//       totalPages: Math.ceil(totalShops / pageSize),
//       currentPage: pageNumber,
//     });
//   } catch (error) {
//     console.error('Error searching shops:', error);
//     res.status(500).json({ success: false, message: 'Failed to search shops' });
//   }
// };


// import React, { useState, useEffect } from 'react';

// const SearchShops = () => {
//   const [shops, setShops] = useState([]);
//   const [keyword, setKeyword] = useState('');
//   const [sort, setSort] = useState('');
//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);

//   useEffect(() => {
//     const fetchShops = async () => {
//       try {
//         const response = await fetch(`/api/search-shops?keyword=${keyword}&sort=${sort}&page=${page}`);
//         if (!response.ok) {
//           throw new Error('Failed to fetch shops');
//         }
//         const data = await response.json();
//         setShops(data.shops);
//         setTotalPages(data.totalPages);
//       } catch (error) {
//         console.error('Error fetching shops:', error);
//       }
//     };

//     fetchShops();
//   }, [keyword, sort, page]);

//   return (
//     <div>
//       <input
//         type="text"
//         placeholder="Search shops..."
//         value={keyword}
//         onChange={(e) => setKeyword(e.target.value)}
//       />
//       <select value={sort} onChange={(e) => setSort(e.target.value)}>
//         <option value="">Sort by</option>
//         <option value="asc">Alphabetical (A-Z)</option>
//         <option value="desc">Alphabetical (Z-A)</option>
//       </select>
//       <ul>
//         {shops.map((shop) => (
//           <li key={shop._id}>{shop.name}</li>
//         ))}
//       </ul>
//       <div>
//         {page > 1 && <button onClick={() => setPage(page - 1)}>Previous</button>}
//         {page < totalPages && <button onClick={() => setPage(page + 1)}>Next</button>}
//       </div>
//     </div>
//   );
// };

// export default SearchShops;

