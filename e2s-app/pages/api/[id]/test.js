import db from '../../../db';

export default async function test_test(req, res) {
    const id = req.query.id;
    // filter API requests by method
    if (req.method === 'GET') {
        // Allow a blog post to get its number of likes and views
        const params = {
            TableName: 'Test',
            Key: {
                name: id
            }
        };

        await db.get(params, function (err, data) {
            if (err) {
                console.log('Error', err);
                res.status(500).end()
            } else {
                // send the json response from the callback
                res.status(200).json(data.Item);
            }
        });
    } else if (req.method === 'PUT') {
        // Allow a blog post to update its likes (via a button) or views (on rendering)
        res.status(500).end()
    } else {
        res.status(500).end()
    }
}