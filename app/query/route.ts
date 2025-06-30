import postgres from 'postgres';
import {cookies} from 'next/headers';
import { NextRequest } from 'next/server';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

async function listInvoices() {
	const data = await sql`
    SELECT invoices.amount, customers.name
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    WHERE invoices.amount = 666;
  `;

	return data;
}

export async function GET(rewquest: NextRequest) {

  const cookieStore = await cookies();

  const a = cookieStore.get('a');
  const b = cookieStore.set('b', '123');
  console.log('Cookie b:', b);

  try {
  	return Response.json(await listInvoices());
  } catch (error) {
  	return Response.json({ error }, { status: 500 });
  }
}
