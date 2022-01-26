const mongoose = require('mongoose')

module.exports = async () => {
  await mongoose.connect(process.env['srv1'], {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(()=>{
    console.log('connected to mongo')
  }).catch((err) => console.log(err))
  return mongoose
}