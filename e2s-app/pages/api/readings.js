import db from '../../db';

// -readingId
// -type
// -reading
// *-date
// *-companyId

export default async function (req, res) {
//     const id = req.query.id;
//     // filter API requests by method
//     if (req.method === 'GET') {
//         // Allow a blog post to get its number of likes and views
//         const params = {
//             TableName: '**Test**',
//             Key: {
//                 **name**: id
//     }
//     };
//
//         db.get(params, function (err, data) {
//             if (err) {
//                 console.log('Error', err);
//             } else {
//                 // send the json response from the callback
//                 res.json(data.Item);
//             }
//         });
//     } else if (req.method === 'PUT') {
//         // Allow a blog post to update its likes (via a button) or views (on rendering)
//     }
// }

const body = req.body


console.log('body: ', body)


if (!body.type || !body.fig) {
    return res.status(400).json({ data: 'Reading data not found' })
}

res.status(200).json({ data: `${body.type} ${body.fig}` })
}
