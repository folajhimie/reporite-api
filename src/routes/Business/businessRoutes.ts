import { Router } from 'express';
// import { authMiddleware, isAdmin } from '../../middleware/auth';
import loginLimiter from '../../middleware/loginLimiter';
import { BusinessController } from '../../controllers/Business/businessControllers';


const businessController = new BusinessController() 

export default (router: Router) => {
  // creating Business 
  router.post("/api/v1/business", 
    loginLimiter, 
    businessController.createBusinnessUser
  );

  // get all Business
  router.get("/api/v1/getAllBusiness", 
    loginLimiter, 
    businessController.getAllBusinesses
  );

  // get an individual business
  router.get("/api/v1/getBusiness/:businessId", 
    loginLimiter, 
    businessController.getBusinessUser
  );

  // updating an individual Business
  router.put("/api/v1/updateBusiness/:businessId", 
    loginLimiter, 
    businessController.updateBusiness
  );

  // Deleting an Individual Business
  router.delete("/api/v1/updateBusiness/:businessId", 
    businessController.deleteBusiness
  );

};