
import mongoose, { Document, Schema, Model, Types } from 'mongoose';

/**
 * Interface to model the JobStatuses Schema for TypeScript.
 * @param cost: string;
 * @param quantity: number;
 * @param description: string;
 * @param created_by: Types.ObjectId;
 * @param float_request_id: Types.ObjectId;
 * @param float_request_statuses_id: Types.ObjectId;
 */

// Define the JobStatuses Schema
export interface JobStatusesInterface {
  name: string;
  code: string;
}

// '1','Work Request Created','01'
// '2','Incorrect Work Order Type','02'
// '3','Ready For Approval','05'
// '4','Job Planning','10'
// '5','Held For External Resources','20'
// '6','Held in Engineering','30'
// '7','Held for Operations','35'
// '8','Held for Materials','40'
// '9','Partial Materials Recieved','41'
// '10','Materials at Warehouse','42'
// '11','Materials Staged','43'
// '12','Materials at Job Site','45'
// '13','Ready to Schedule','50'
// '14','Scheduled','55'
// '15','Work in Progress','60'
// '16','Complete Awaiting Data Entry','61'
// '17','Complete Ready for Review','65'
// '18','More Information Needed','75'
// '19','Reviewed Complete','80'
// '20','Data Reviewed and Accurate','81'
// '21','Closed History','85'
// '22','Confirm Rejection','90'
// '23','Rejected','95'
// '24','Awaiting Purge','99'
// '25','Invoice Generated','100'
// '26','Job Approved','105'


