import mysql from 'mysql2/promise';

export default async function handler (req, res) {
    const dbconnection = await mysql.createConnection({
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
    });
    try{
        const query = "SELECT challengeSpeedyOpenEdition from table1 where wallet = ?";
        const { walletAddress } = req.body;
        const values = [walletAddress];
        const [data] = await dbconnection.execute(query, values);
        dbconnection.end();
        if (data.length > 0 && data[0].challengeSpeedyOpenEdition === 5) {
            res.status(200).json({ authorized: true });
        } else {
        res.status(200).json({ authorized: false });
        }
    }
    catch (error) {
        res.status (500).json ({ error: error.message });
    }
}