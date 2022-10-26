import mongoose from "mongoose";
import type { NextApiRequest, NextApiResponse } from "next";
const MongoClient = require("mongodb").MongoClient;

const auditHandler = async (req: NextApiRequest, res: NextApiResponse) => {

  //Create MongoDB Connection
  const client = await MongoClient.connect(`mongodb://127.0.0.1:27017`);
  const db = client.db("safepress_db");
  const collection = db.collection("Audit");
  const ObjectId = require("mongodb").ObjectId;

  const request = {
    id: req.query.auditId as string,
    data: req.body as object,
    method: req.method,
  };

  const id: string = request.id;
  const data: object = request.data;

  // Audit Controller

  // 1:
  // Method = GET
  // Params = (id : string)
  // Functionality = Get One By Id
  if (request.method == "GET" && id && !data) {
    try {
      const findById = await collection.findOne({ _id: ObjectId(id) });
      if (findById) res.status(200).json(findById);
    } catch (e) {
      res.status(404).send("Not Found!");
    }
  }

  // 2:
  // Method = PATCH
  // Params = (id : string)
  // Functionality = Patch One By Id
  if (request.method == "PATCH" && id && data) {
    try {
      const updateById = await collection.updateOne(
        { _id: ObjectId(id) },
        { $set: { ...data } }
      );
      if (updateById) res.status(200).send("Updated Successfully!");
    } catch (e) {
      res.status(404).send("Not Found!");
    }
  }

  // 3:
  // Method = DELETE
  // Params = (id : string)
  // Functionality = Delete One By Id
  if (request.method == "DELETE" && id ) {
    try {
      const deleteById = await collection.deletetOne({ _id: ObjectId(id) });
      if (deleteById) res.status(200).send("Deleted Successfully!");
    } catch (e: any) {
      res.status(400).send("Not Found!");
    }
  }
};

export default auditHandler;
