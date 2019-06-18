
var ObjectID = require('mongodb').ObjectID

module.exports = function(app,client){

    app.get('/notes/:id',(req,res) => {
        const id = req.params.id
        const details = {'_id':new ObjectID(id)}
        const collection = client.db('test').collection('notes')
            .findOne(details,(err,item) => {
                if (err){
                    console.log(err)
                    res.send({'error': 'An error has been raised', 'error_type' : err})
                }
                else{
                    res.send(item)
                }
            })
    })


    app.delete('/notes/:id',(req,res) => {
        const id = req.params.id
        const details = {'_id':new ObjectID(id)}
        const collection = client.db('test').collection('notes')
            .remove (details,(err,item) => {
                if (err){
                    console.log(err)
                    res.send({'error': 'An error has been raised', 'error_type' : err})
                }
                else{
                    res.send('Note' + id + 'is deleted')
                }
            })
    })



    app.post("/notes",(req,res) => {
        const note = { text: req.body.body, title: req.body.title}
        const collection = client.db('test').collection('notes')
            .insertOne(note, (err,result) => {
                if (err) {
                    console.log(err)
                    res.send({'error': 'An error has been raised', 'error_type' : err})
            }
                else{
                    res.send(result.ops[0])
                } 
            })
    })
} 