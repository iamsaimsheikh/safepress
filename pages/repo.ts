const MongoClient = require("mongodb").MongoClient;
import { CreateAuditDto } from "../interfaces/createAudit";
const AuditSchema = require("../schema/schema");

// 1:
// Method = POST
// Params = ()
// Functionality = Create Audit
export const addAudit = async (Audit: CreateAuditDto) => {
  const client = await MongoClient.connect(`mongodb://127.0.0.1:27017/`);
  const db = client.db("safepress_db");
  const collection = db.collection("safepress");
  const createAudit = new AuditSchema(Audit);
  await createAudit.save();

  try {
    const newAudit = await collection.insertOne(Audit);
  } catch (e: any) {
    console.log(e);
  }
};
