const { default: mongoose } = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  authorImage:{type:String,default:""},
  image: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, default: Date.now() },
},{timestamps:true});

const BlogModel=mongoose.models.Blog||mongoose.model('Blog',blogSchema)
export default BlogModel
