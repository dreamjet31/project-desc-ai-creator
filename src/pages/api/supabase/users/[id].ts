import { NextApiRequest, NextApiResponse } from 'next';
import supabase from '@/utils/supabaseClient';
/**
 * This is a TypeScript function that handles GET and DELETE requests for a specific resource in a
 * Supabase database.
 * @param {NextApiRequest} req - The `req` parameter is an object that represents the incoming HTTP
 * request. It contains information such as the request method, headers, query parameters, and body.
 * @param {NextApiResponse} res - The `res` parameter is an instance of the `NextApiResponse` class,
 * which represents the HTTP response that will be sent back to the client. It is used to set the
 * status code and send the response data.
 * @returns The code is returning a Next.js API route handler function.
 */

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (supabase === null) return;
    try {
        if (req.method === 'GET') {
            const id = Number(req.query.id);

            if (isNaN(id) || typeof id !== 'number') {
                return res.status(400).send('Invalid request!!');
            }

            const { data, error } = await supabase.from('test_projects').select('*').eq('id', id);

            if (error) {
                throw error;
            }

            if (data) {
                res.status(200).json({ data });
            }
        }

        if (req.method === 'DELETE') {
            const id = Number(req.query.id);

            const { data, error } = await supabase.from('test_projects').delete().eq('id', id).select('*');

            if (error) {
                throw error;
            }

            if (data) {
                res.status(200).json({ data });
            }
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Error occurred' });
    }
}
