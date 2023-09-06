import IShopRepository from "../../../repositories/Production/Shop/shopRepositories";
import Shop from "../../../models/Production/Shop/shop";
import { HttpCode, AppError } from "../../../exceptions/appError";
import { IShopInterface } from "../../../interfaces /Production/Shop/shopInterface";
// import { Request } from "../../../models/Request/request";
import cloudinary from 'cloudinary'
import mongoose, { Document, Schema, Model } from "mongoose";
import Product from "../../../models/Production/Product/product";
import { Cart } from "../../../models/Production/Cart/cart";
export class ShopRepository implements IShopRepository {

    // Create a new shop
    async createShop(req: any): Promise<any> {
        try {
            const {
                name,
                email,
                description,
                address,
                phoneNumber,
                avatar,
            } = req.body;

            if (!req.file) {
                throw new AppError({
                    httpCode: HttpCode.NOT_FOUND,
                    description: 'No File Uploaded!'
                });
            }

            const result = await cloudinary.v2.uploader.upload(req.file.buffer.toString('base64'));

            // Create a new shop with the image URL
            const newShop = new Shop({
                name,
                email,
                description,
                address,
                phoneNumber,
                avatar: result.secure_url,
            });

            return newShop;

        } catch (error) {
            console.error("Error creating a new Shop:", error);
        }
    }

    // Update an existing shop
    async updateShop(req: any, shopData: Partial<IShopInterface>): Promise<any> {
        try {


            const { shopId } = req.params;
            const {
                name,
                email,
                description,
                address,
                phoneNumber,
                avatar,
            } = req.body;

            // Find the shop by ID
            const shop = await Shop.findById(shopId);

            if (!shop) {
                throw new AppError({
                    httpCode: HttpCode.NOT_FOUND,
                    description: 'Shop Not Found!'
                });
            }

            // destroy existing image in the database
            await cloudinary.v2.uploader.destroy(avatar.secure_url)

            // Upload a new picture to Cloudinary to the existing database
            const result = await cloudinary.v2.uploader.upload(req.file.buffer.toString('base64'));

            //assign new image to the avatar column
            shop.avatar = result.secure_url;

            // Update the shop properties
            const shopUpadtedData = await Shop.findByIdAndUpdate(shopId, shopData, {
                new: true,
                runValidators: true,
                useUnified: false,
            })
            // shop.name = name;
            // shop.description = description;
            // shop.email = email;
            // shop.address = address;
            // shop.phoneNumber = phoneNumber;

            // ... update other shop properties

            // Save the updated shop
            await shop.save();

            return shop;
        } catch (error) {
            console.error('Error updating shop:', error);
        }
    }

    // Get a single shop 
    async getSingleShop(reqParamsId: any): Promise<any> {
        try {

            const shop: IShopInterface | null = await Shop.findById(reqParamsId);

            if (!shop) {
                throw new AppError({
                    httpCode: HttpCode.NOT_FOUND,
                    description: 'Shop Not Found!'
                });
            }

            return shop;

        } catch (error) {
            console.error('Error getting a single shop:', error);
        }

    }

    // Delete a shop
    async deleteShop(reqParams: any): Promise<any> {
        // In your controller, you'll need to perform the following steps:

        // Find the store by ID.
        // Retrieve all products associated with the store.
        // Remove references to these products from any carts.
        // Delete the products.
        // Delete the store.

        try {
            // const shop: IShopInterface | null = await Shop.findByIdAndDelete(reqParamsId);

            

            // return shop;

            const { shopId } = reqParams;

            // Find the store by ID
            const shop: IShopInterface | null = await Shop.findById(shopId);

            if (!shop) {
                throw new AppError({
                    httpCode: HttpCode.NOT_FOUND,
                    description: 'Shop Not Found!'
                });
            }

            // Retrieve all products associated with the store
            const products = await Product.find({ shopId: shopId });

            // Remove references to these products from any carts
            await Cart.updateMany(
                { 'items': { $in: products.map((product) => product._id) } },
                { $pull: { 'items': { $in: products.map((product) => product._id) } } }
            );

            // Delete the products
            await Product.deleteMany({ shopId: shopId });

            // Delete the store
            await shop.remove();
            
        } catch (error) {
            console.error('Error deleting a single shop:', error);
        }
    }

    // De-activated shop 
    async deactivateShop(reqParamsId: any): Promise<any> {
        try {

            const shop: IShopInterface | null = await Shop.findById(reqParamsId);

            if (!shop) {
                throw new AppError({
                    httpCode: HttpCode.NOT_FOUND,
                    description: 'Shop Not Found!'
                });
            }

            shop.active = false;

            await shop.save();
            return shop;

        } catch (error) {
            console.error('Error deleting a single shop:', error);
        }
    }

    // Get a list of shop
    async getAllShop(reqQuery: any): Promise<any> {
        try {
            // Define query parameters for sorting, pagination, and filtering
            const { sort, page, limit, query } = reqQuery;

            // Build the query based on filters
            const filter: Record<string, any> = {};

            // Filtering Options
            if (query) {
                filter.name = { $regex: new RegExp(query, 'i') }; // Case-insensitive name search
            }

            // Build the sort options
            const sortOptions: Record<string, any> = {};

            // Sorting Options
            if (sort === "asc") {
                sortOptions.name = 1; // Ascending order by name
            } else if (sort === "desc") {
                sortOptions.name = -1; // Descending order by name
            } // Add more sorting options as needed

            // Pagination
            const currentPage = parseInt(page as string) || 1;
            const perPage = parseInt(limit as string) || 10;
            const skip = (currentPage - 1) * perPage;

            // Execute the query and paginate the results
            const totalShops = await Shop.countDocuments(filter);

            const shops = await Shop.find(filter)
                .sort(sortOptions)
                .skip(skip)
                .limit(perPage);


            const shopObject = {
                shops,
                totalShops,
                currentPage: currentPage,
                totalPages: Math.ceil(totalShops / perPage),
            }

            return shopObject;


        } catch (error) {
            console.error('Error getting shops:', error);
        }
    };

    // Search for shops with filtering and sorting
    async searchShop(req: any): Promise<any> {

        try {
            // Parse query parameters from the request
            const { name, role, query, minAvailableBalance, sortBy, limit, page } = req.query;

            // STEP ONE 
            // Pagination options
            const pageQuery = parseInt(page as string, 10) || 1; // Current page
            const limitQuery = parseInt(limit as string, 10) || 10; // Items per page

            // STEP TWO
            // Create a filter object based on query parameters.. 
            // Filtering options (customize as needed)
            const filter: Record<string, any> = {};

            if (query) {
                // Apply a text search to the 'name' or 'description' fields
                filter.$or = [
                    { name: { $regex: query as string, $options: 'i' } },
                    { description: { $regex: query as string, $options: 'i' } },
                ];
            }

            if (minAvailableBalance) {
                // Filter by shops with available balance greater than or equal to the specified value
                filter.availableBalance = { $gte: parseInt(minAvailableBalance as string, 10) };
            }

            if (name) {
                filter.name = new RegExp(req.query.name as string, 'i'); // Case-insensitive name search
            }

            if (role) {
                filter.role = role as string;
            }

            // STEP THREE
            // Sorting options
            // Create a sort object based on sortBy parameter
            let sort: Record<string, any> = { createdAt: -1 }; // Default sorting by creation date (descending)

            if (sortBy === 'name') {
                sort.name = 1; // Sort by name in ascending order
            } else if (sortBy === 'availableBalance') {
                sort.availableBalance = -1; // Sort by availableBalance in descending order
            }

            if (req.query.sort) {
                const sortField = req.query.sort as string;
                const sortOrder = req.query.order === 'asc' ? 1 : -1; // Ascending or descending

                sort = { [sortField]: sortOrder };
            }

            // Find shops based on filters and pagination
            // Find shops matching the filter and apply sorting
            const shops: IShopInterface[] = await Shop.find(filter)
                .sort(sort)
                .skip((pageQuery - 1) * limitQuery)
                .limit(limitQuery);

            // Count the total number of shops based on filters (for pagination)
            const totalShops: number = await Shop.countDocuments(filter);

            const shopObject = {
                shops,
                pageQuery,
                totalPages: Math.ceil(totalShops / limitQuery),
                totalShops
            }

            return shopObject;

        } catch (error) {
            console.error('Error searching shops:', error);
        }
    }
}

// // Multer setup for file uploads

// const storage = multer.memoryStorage();
// const upload = multer({ storage });

// // Create a new shop with picture upload
// app.post('/create-shop', upload.single('image'), async (req: Request, res: Response) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ message: 'No file uploaded' });
//     }

//     // Upload the image to Cloudinary
//     const result = await cloudinary.uploader.upload(req.file.buffer.toString('base64'));

//     // Create a new shop with the image URL
//     const newShop = new Shop({
//       name: req.body.name,
//       description: req.body.description,
//       imageUrl: result.secure_url,
//     });

//     // Save the shop to the database
//     await newShop.save();

//     res.status(201).json({ message: 'Shop created successfully', shop: newShop });
//   } catch (error) {
//     console.error('Error creating shop:', error);
//     res.status(500).json({ message: 'Failed to create shop' });
//   }
// });



// router.get('/units', async (req: Request, res: Response) => {
//     try {
//         const {
//             associations = [],
//             byUnitHierarchyIds = null,
//             byOrganizationId = null,
//             page = 1,
//             perPage = 10000,
//             search = null,
//             sortBy = 'name',
//             sortOrder = 'asc',
//             byUnitParent = null,
//         } = req.query;

//         let query = Unit.find().sort({ [sortBy]: sortOrder });

//         if (byOrganizationId) query = query.where('organization_id', byOrganizationId);

//         if (byUnitHierarchyIds) query = query.where('unit_hierarchy_id').in(byUnitHierarchyIds);

//         if (byUnitParent) query = query.where('parent_unit_id', byUnitParent);

//         if (search) {
//             // Customize this to match your search logic
//             query = query.where('name', { $regex: new RegExp(search, 'i') });
//         }

//         for (const association of associations) query = query.populate(association);

//         // const results = await query
//         //   .paginate(page, perPage);

//         // Execute the query and paginate the results
//         const results = await query.skip((page - 1) * perPage).limit(perPage);

//         res.json(results);
//     } catch (error) {
//         console.error('Error fetching units:', error);
//         res.status(500).json({ error: 'Failed to fetch units' });
//     }
// });

// export default router;


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










