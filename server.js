// Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var expressHandlebars = require("express-handlebars");

var Comment = require("./models/Comment.js");
var Article = require("./models/Article.js");

var request = require("request");
var cheerio = require("cheerio");

mongoose.Promise = Promise;

var app = express();

app.engine("handlebars", expressHandlebars({
  defaultLayout: "main"
}));
app.set("view engine", "handlebars");

app.use(logger("dev"));
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(express.static("public"));

mongoose.connect("mongodb://localhost/scraping-mongoose");
var db = mongoose.connection;

db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});

db.once("open", function() {
  console.log("Mongoose connection successful.");
});

app.get("/scrape", function(req, res) {

  request("https://www.vox.com/", function(error, response, html) {
    
    var $ = cheerio.load(html);
    
    $("article h2").each(function(i, element) {

      var result = {};

      result.title = $(this).children("a").text();
      result.link = $(this).children("a").attr("href");

      var entry = new Article(result);
      console.log(entry);

      entry.save(function(err, doc) {

        if (err) {
          console.log(err);
        }
        else {
          console.log(doc);
        }
      });

    });
  });
  res.send("Scrape Complete");
});


app.get("/articles", function(req, res) {

  Article.find({}, function(error, doc) {
    if (error) {
      console.log(error);
    }
    else {
      var results = {
        article: doc
      }
      //render template with data
      res.render("index", results);
    }
  });
});

app.get("/articles/:id", function(req, res) {

  Article.findOne({ "_id": req.params.id })
  .populate("comment")
  .exec(function(error, doc) {
    console.log(doc, "doc")
    if (error) {
      console.log(error);
    }
    else {
      var res = {
        singleArticle: doc
      }
      res.render("index", res);
    }
  });
});


app.post("/comment/:articleid", function(req, res) {
 
  var newComment = new Comment(req.body);
  newComment.save(function(error, doc) {

    if (error) {
      console.log(error);
    }
    else {
      Article.findOneAndUpdate({ "_id": req.params.articleid }, { "comment": doc._id })
      .exec(function(err, doc) {
        if (err) {
          console.log(err);
        }
        else {
          res.send(doc);
        }
      });
    }
  });
});


app.listen(3000, function() {
  console.log("App running on port 3000!");
});
