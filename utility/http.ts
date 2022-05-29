import { NextApiRequest, NextApiResponse } from "next";

export const Unauthenticated = (res: NextApiResponse) => res.status(403).json({ error: { message: "You must be authenticated to use this route!" } });
export const Ok = (res: NextApiResponse, data?: Record<string, any>) => res.status(200).json({ success: true, ...data });
export const NoContent = (res: NextApiResponse) => res.status(204).send(null);
export const BadRequest = (res: NextApiResponse, reason: string) => res.status(400).json({ error: { message: reason } });
export const InternalError = (res: NextApiResponse) => res.status(500).json({ error: { message: "Internal error!" } });
export const Unauthorized = (res: NextApiResponse) => res.status(401).json({ error: { message: "You do not have sufficient permissions to do this action." } });
