import { NextResponse } from "next/server";
import { sql } from '@vercel/postgres';

export async function GET() {
    try {
        const result =
          await sql`select * from loss_data;`;
        return NextResponse.json({ message: "Table created", result });
      } catch (error) {
        return NextResponse.json({ message: "Error creating table", error});
      }

}

export async function POST(req: Request){
     // Extract the `messages` from the body of the request
    const { messages } = await req.json()

    const result = await sql`insert into loss_data (loss) values (${messages})`;

    // send hello world as response 
    return NextResponse.json({ message: "Hello Dinakar" });
}

export async function DELETE(req: Request){

    const { messages } = await req.json()

    const result = await sql`delete from loss_data where loss = ${messages};`;

    // send delete response
    return NextResponse.json({ message: "This is a delete request" })
}