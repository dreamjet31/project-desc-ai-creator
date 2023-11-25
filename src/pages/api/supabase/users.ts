import supabase from '@/utils/supabaseClient';
import { NextApiRequest, NextApiResponse } from 'next';
/**
 * This is a TypeScript function that handles GET, POST, and DELETE requests for a Supabase database
 * table called 'test_projects'.
 * @param {NextApiRequest} req - The `req` parameter is an object that represents the incoming HTTP
 * request. It contains information such as the request method, headers, query parameters, and body.
 * @param {NextApiResponse} res - The `res` parameter is an instance of the `NextApiResponse` class,
 * which represents the HTTP response that will be sent back to the client. It is used to set the
 * status code and send the response data.
 * @returns The code is exporting an async function named "handler" that takes in two parameters: req
 * (NextApiRequest) and res (NextApiResponse).
 */

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method === 'GET') {
        if (supabase === null) return;
        try {
            const { data, error } = await supabase.from('test_projects').select('*');
            if (error) {
                throw error;
            }
            if (data) {
                res.status(200).json({ data });
            }
        } catch (error) {
            console.error('Error reading data:', error);
            res.status(500).json({ error: 'Error reading data' });
        }
    }

    if (req.method === 'POST') {
        try {
            if (supabase === null) return;
            const { data, error } = await supabase.from('test_projects').insert(req.body).select('*');
            if (error) {
                throw error;
            }
            if (data) {
                res.status(200).json({ data });
            }
        } catch (error) {
            console.error('Error inserting data:', error);
            res.status(500).json({ error: 'Error inserting data' });
        }
    }

    if (req.method === 'DELETE') {
        try {
            if (supabase === null) return;
            const { data, error } = await supabase.from('test_projects').delete().match({ id: req.body.id }).select('*');
            if (error) {
                throw error;
            }
            if (data) {
                res.status(200).json({ data });
            }
        } catch (error) {
            console.error('Error deleting data:', error);
            res.status(500).json({ error: 'Error deleting data' });
        }
    }
}
