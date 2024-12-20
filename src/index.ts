import { serve } from "@hono/node-server";
import { readFileSync } from "fs";
import { Hono } from "hono";
import type { MessagesType } from "./type.js";

const app = new Hono();

app.get("/", (c) => {
  const not_parsed = readFileSync("./messages.json", "utf8");
  const message = JSON.parse(not_parsed) as MessagesType;
  const filtered = message.filter((m) => m.address);
 
 
  const CBE_messages = filtered.filter((m) => m.address === "CBE");
  console.log("CBE_messages: ", CBE_messages.length);
  const credited_messages = CBE_messages.filter((m) =>
    m.body?.toLowerCase().includes("credited")
  );






  const debited_messages = CBE_messages.filter((m) =>
    m.body?.toLowerCase().includes("debited")
  );

  const credited_regex = /credited with etb ([\d,]+(?:\.\d{2})?)/i;
  const debited_regex = /debited with etb\s?([\d,]+(?:\.\d{2})?)\s*(?:\.service charge of\s*etb\s?([\d,]+(?:\.\d{2})?)\s*)?(?:and vat\(15%\)\s*of\s*etb\s?([\d,]+(?:\.\d{2})?))?/i;


  const credited_amounts = credited_messages.map((m) => {
    const match = m.body?.toLowerCase().match(credited_regex);
    let amount;
    if (match) {
      amount = parseFloat(match[1].replace(/,/g, "")); // Remove commas and parse as float
    } else {
      amount = 0;
    }
    return amount;
  });



  const debited_details = debited_messages.map((m) => {
    const match = m.body?.toLowerCase().match(debited_regex);
    let result :{
      amount: number;
      service_charge?: number;
      vat?: number;
    } = {
      amount: 0,
      service_charge: undefined,
      vat: undefined,
    };
  
    if (match) {
      // Parse the main amount (debited amount)
      result.amount = parseFloat(match[1].replace(/,/g, ""));
  
      // Parse the service charge (if present)
      if (match[2]) {
        result.service_charge = parseFloat(match[2].replace(/,/g, ""));
      }
  
      // Parse the VAT (if present)
      if (match[3]) {
        result.vat = parseFloat(match[3].replace(/,/g, ""));
      }
    }
  
    return result;
  });
  

   
  const total_credited_amount = credited_amounts.reduce(
    (acc, cur) => acc + cur,
    0
  );

  return c.json({
    CBE: {
      credited: {
        total_credited_amount,
        number_of_transactions: credited_messages.length,
      },
      debited: {
        total_debited_amount: debited_details.reduce(
          (acc, cur) => acc + cur.amount,
          0
        ),
        service_charge: debited_details.reduce(
          (acc, cur) => acc + (cur.service_charge || 0),
          0
        ),
        vat: debited_details.reduce(
          (acc, cur) => acc + (cur.vat || 0),
          0
        ),
        number_of_transactions: debited_messages.length,
      },
    },
  });
});

const port = 3009;
console.log(`Server is running on http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port,
});
