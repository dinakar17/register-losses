import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function GET() {
  try {
    const result = await sql`select * from loss_details;`;
    return NextResponse.json({ result });
  } catch (error) {
    return NextResponse.json({ message: "Error fetching data", error });
  }
}

export async function POST(req: Request) {
  const { loss_detail } = await req.json();
  try {
    if (!loss_detail) {
      return NextResponse.json({ message: "Please provide a loss_detail" });
    }
    const result =
      await sql`insert into loss_details (loss_detail) values (${loss_detail})`;

    return NextResponse.json({ message: "Loss detail added", result });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: err, success: false });
  }
}

export async function DELETE(req: Request) {
  const { loss_detail } = await req.json();

  try {
    if (!loss_detail) {
      return NextResponse.json({ message: "Please provide a loss_detail" });
    }

    // the sql query to delete the loss_detail from the table
    const result = await sql`delete from loss_details where loss_detail = ${
      loss_detail as string
    };`;

    // send delete response
    return NextResponse.json({ message: "Loss detail deleted", result });
  } catch (err) {
    return NextResponse.json({ message: err, success: false });
  }
}

// Example for using DELETE method in frontend
// const handleDelete = async (loss_detail: string) => {
//     const res = await fetch("/api/lossdetails", {
//         method: "DELETE",
//         body: JSON.stringify({ loss_detail }),
//     });

// if you use axios, you can use the following code:
// const res = await axios.delete("/api/lossdetails", { data: { loss_detail } });

// if you want to use the above code in the frontend of the app, you can use the following code:
// import { useState, useEffect } from 'react';
//
// export default function Home() {
//   const [data, setData] = useState(null);
//
//   useEffect(() => {
//     (async () => {
//       const response = await fetch('/api/lossdetails');
//       const data = await response.json();
//       setData(data);
//     })();
//   }, []);
//
//   return (
//     <div>
//       <h1>My data</h1>
//       {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : null}
//     </div>
//   );
// }
//
