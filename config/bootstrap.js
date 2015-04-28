/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#/documentation/reference/sails.config/sails.config.bootstrap.html
 */

module.exports.bootstrap = function(cb) {

  // It's very important to trigger this callback method when you are finished
  // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
  Video.create({
  	title: "草稿已排程",
  	content: "<h1>這是影片</h1><br><br><br><br><br><br><br><br><br><br><br>",
    status: "D",
    createdAt: "2015-05-14T20:06:02.304Z"
  }).exec(function(){

  });

  Video.create({
    title: "已發佈",
    content: "<h1>這是影片</h1><br><br><br><br><br><br><br><br><br><br><br>",
    status: "P"
  }).exec(function(){

  });

  Video.create({
  	title: "草稿",
  	content: "<h1>這是影片</h1><br><br><br><br><br><br><br><br><br><br><br>",
    status: "D"
  }).exec(function(){

  });

  Video.create({
  	title: "已排程發佈",
  	content: "<h1>這是影片</h1><br><br><br><br><br><br><br><br><br><br><br>",
    status: "P",
    createdAt: "2015-05-14T20:06:02.304Z"
  }).exec(function(){

  });

  cb();
};
