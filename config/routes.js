/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
  * etc. depending on your default view engine) your home page.              *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  /*前台*/
  '/': {
    view: 'frontend/pages/index'
  },
  
  '/aboutNTCA': {
    controller: 'Site',
    action: 'aboutNTCA'
  },

  '/aboutITSeed': {
    controller: 'Site',
    action: 'aboutITSeed'
  }, 

  '/memberList': {
    controller: 'Site',
    action: 'memberList'
  }, 

  '/courseList': {
    controller: 'Site',
    action: 'courseList'
  }, 

  '/video': {
    controller: 'Site',
    action: 'video'
  },

  /*後台-CMS*/
  'get /cms/new/:model': {
    controller: 'Cms',
    action: 'editor'
  },
  
  'get /cms/edit/:model': {
    controller: 'Cms',
    action: 'editor'
  },

  'get /cms/preview/:model': {
    controller: 'Cms',
    action: 'preview'
  },

  'post /cms/preview/:model': {
    controller: 'Cms',
    action: 'preview'
  },

  'get /cms/load/:model': {
    controller: 'Cms',
    action: 'load'
  },

  'post /cms/load/:model': {
    controller: 'Cms',
    action: 'load'
  },

  'get /cms/list/:model/:status': {
    controller: 'Cms',
    action: 'list'
  },

  'post /cms/create/:model': {
    controller: 'Cms',
    action: 'create'
  },

  'post /cms/update/:model': {
    controller: 'Cms',
    action: 'update'
  },

  'get /cms/publish/:model': {
    controller: 'Cms',
    action: 'publish'
  },

  'get /cms/toDraft/:model': {
    controller: 'Cms',
    action: 'toDraft'
  },

  'get /cms/delete/:model': {
    controller: 'Cms',
    action: 'delete'
  },

  'get /cms/sort/:model': {
    controller: 'Cms',
    action: 'sort'
  },




  /***************************************************************************
  *                                                                          *
  * Custom routes here...                                                    *
  *                                                                          *
  *  If a request to a URL doesn't match any of the custom routes above, it  *
  * is matched against Sails route blueprints. See `config/blueprints.js`    *
  * for configuration options and examples.                                  *
  *                                                                          *
  ***************************************************************************/

};
