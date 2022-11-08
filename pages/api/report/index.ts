import type { NextApiRequest, NextApiResponse } from "next";
const puppeteer = require("puppeteer");
const PDFMerger = require("pdf-merger-js");
import fs from "fs";
import path from "path";
import cover from "./cover";
import CRSR from "./code_review_security_report";
import vulnerabilityClassification from "./vulnerability_classification";
import finding from "./finding";

var fileArray = [cover, CRSR, vulnerabilityClassification, finding];
var merger = new PDFMerger();

const generatePDF = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // Create a browser instance
    const browser = await puppeteer.launch({
      args: ["--allow-file-access-from-files", "--enable-local-file-accesses"],
    });

    // Create a new page
    const page = await browser.newPage();
    // Read HTML Template

    let index = 0;

    for (let x of fileArray) {
      await page.setContent(x, { waitUntil: "domcontentloaded" });

      await page.emulateMediaType("screen");

      let pdf = await page.pdf({
        path: `${index}.pdf`,
        margin: { top: "0px", right: "0px", bottom: "0px", left: "0px" },
        printBackground: true,
        padding: 0,
        format: "A4",
      });

      await merger.add(path.resolve(__dirname, `../../../../${index}.pdf`));
      index++;
    }

    await merger.save("merged.pdf");

    await browser.close();

    res.status(200).send("Generated Successfully!");
  } catch (e: any) {
    console.log(e);
    res.status(404).send("Could not generate report!");
  }
};

export default generatePDF;
