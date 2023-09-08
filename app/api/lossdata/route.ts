import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function POST(req: Request) {
    const lossData  = await req.json();
    console.log("lossData", lossData);
  
    try {
      if (!lossData) {
        return NextResponse.json({ message: "Please provide a lossData" });
      }
      
      const { loss_criteria, loss_details, start_time, end_time, duration } = lossData[0];
  
      const result = await sql`
        INSERT INTO loss_data (
          loss_criteria,
          loss_details,
          start_time,
          end_time,
          duration
        )
        VALUES (
          ${loss_criteria},
          ${loss_details},
          ${start_time},
          ${end_time},
          ${duration}
        )`;
  
      return NextResponse.json({ message: "Loss data added", result });
    } catch (err) {
      console.log(err);
      return NextResponse.json({ message: err, success: false });
    }
  }
  
