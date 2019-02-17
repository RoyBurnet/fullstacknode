if(process.env.NODE_ENV === 'productions'){
  module.exports = {mongoURI: 'mongodb://admin:admin@cluster0-shard-00-00-m1f9n.mongodb.net:27017,cluster0-shard-00-01-m1f9n.mongodb.net:27017,cluster0-shard-00-02-m1f9n.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true' }
} else {
  module.exports = {mongoURI: 'mongodb://localhost/vidjot-dev'}
}