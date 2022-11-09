import db from '../../../db';

export default async function (req, res) {
    const id = req.query.id;
    // filter API requests by method
    if (req.method === 'GET') {
        // Allow a blog post to get its number of likes and views
        const params = {
            TableName: 'Users',
            Key: {
                userId: id
            }
        };

        db.get(params, function (err, data) {
            if (err) {
                console.log('Error', err);
            } else {
                // send the json response from the callback
                res.json(data.Item);
            }
        });
    } else if (req.method === 'PUT') {
        // Allow a blog post to update its likes (via a button) or views (on rendering)
    }
}