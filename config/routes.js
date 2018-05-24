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


  // email

  // '/re': {
  //   view: 'frontend/pages/re'
  // },
  // 'post /rem': {
  //   controller: 'User',
  //   action: 'rem'
  // },
  // 'post /register': {
  //   controller: 'User',
  //   action: 'register'    
  // },
  // '/register/:email': {
  //   controller: 'User',
  //   action: 'reg'    
  // },
  // '/register': {
  //    controller: 'User',
  //    action: 'reg' 
  // },
  
  /*前台-一般頁面*/
  '/': {
    controller: 'Site',
    action: 'index'
  },
  
  '/news': {
    controller: 'Site',
    action: 'newsList'
  },

  '/news/:id': {
    controller: 'Site',
    action: 'news'
  },

  '/aboutNTCA': {
    controller: 'Site',
    action: 'aboutNTCA'
  },

  '/aboutITSeed': {
    controller: 'Site',
    action: 'aboutITSeed'
  }, 
  '/studentIntro': {
    controller: 'Site',
    action: 'studentIntro'
  }, 
  '/projectIntro': {
    controller: 'Site',
    action: 'projectIntro'
  },
  '/memberList': {
    controller: 'Site',
    action: 'memberList'
  }, 

  '/courseList': {
    controller: 'Site',
    action: 'courseList'
  }, 

  '/courseInfo': {
    controller: 'Site',
    action: 'courseInfoList'
  }, 

  '/courseInfo/:id': {
    controller: 'Site',
    action: 'courseInfo'
  }, 

  '/career': {
    controller: 'Site',
    action: 'careerList'
  }, 

  '/career/:id': {
    controller: 'Site',
    action: 'career'
  }, 

  '/businessVisit': {
    controller: 'Site',
    action: 'businessVisitList'
  }, 

  '/businessVisit/:id': {
    controller: 'Site',
    action: 'businessVisit'
  }, 

  '/project': {
    controller: 'Site',
    action: 'project'
  }, 

  '/overseaVisit': {
    controller: 'Site',
    action: 'overseaVisit'
  }, 

  '/instructor': {
    controller: 'Site',
    action: 'instructor'
  }, 

  '/sharing': {
    controller: 'Site',
    action: 'sharingList'
  }, 

  '/sharing/:id': {
    controller: 'Site',
    action: 'sharing'
  }, 

  '/regInfo': {
    controller: 'Site',
    action: 'regInfo'
  }, 

  '/regFile': {
    controller: 'Site',
    action: 'regFile'
  }, 

  '/timeline': {
    controller: 'Site',
    action: 'timeline'
  }, 

  '/faq': {
    controller: 'Site',
    action: 'faq'
  },
  '/careersharing': {
    controller: 'Site',
    action: 'careersharing'
  },
  '/careerSharingContent': {
    controller: 'Site',
    action: 'careerSharingContent'
  },
  '/seminar': {
    controller: 'Site',
    action: 'seminar'
  },
  '/workshop': {
    controller: 'Site',
    action: 'workshop'
  },
  '/apply': {
    controller: 'Site',
    action: 'apply'
  },

  '/video': {
    controller: 'Site',
    action: 'video'
  },

  'get /hey': {
    // view: 'frontend/pages/hey'
    controller: 'Site',
    action: 'hey'
  },
  'get /tuv': {
    view: 'frontend/pages/tuv'
  },
  'get /spring': {
    view: 'frontend/pages/spring'
  },
  'get /new': {
    view: 'frontend/pages/new'
  },
  'get /end': {
    view: 'frontend/pages/end'
  },
  'get /careers': {
    view: 'frontend/pages/careers'
  },

  /*前台-使用者相關*/

  'post /check-email': {
    controller: 'User',
    action: 'checkEmail'    
  },

  'post /check-pwd': {
    controller: 'User',
    action: 'checkPwd'    
  },

  'get /register': {
    view: 'frontend/pages/register'    
  },

  'post /register': {
    controller: 'User',
    action: 'register'    
  },


  'get /login': {
    controller: 'User',
    action: 'loginPage' 
  },

  'post /login': {
    controller: 'User',
    action: 'login'    
  },
  'post /google_login': {
    controller: 'User',
    action: 'google_login'
  },

  'get /logout': {
    controller: 'User',
    action: 'logout'   
  }, 

  '/profile': {
    controller: 'User',
    action: 'profile'   
  },

  '/editProfile': {
    controller: 'User',
    action: 'editProfile'   
  },

  '/disc': {
    controller: 'User',
    action: 'disc'    
  },

  '/editDisc': {
    controller: 'User',
    action: 'editDisc'   
  },

  '/files': {
    controller: 'User',
    action: 'files'    
  },
  '/confirm': {
    controller: 'User',
    action: 'confirm'    
  },
  '/uploadReg': {
    controller: 'User',
    action: 'uploadReg'
  },

  '/uploadAut': {
    controller: 'User',
    action: 'uploadAut'
  },

  '/uploadRec': {
    controller: 'User',
    action: 'uploadRec'
  },

  /*後台*/
  'get /backend/login': {
    view:'backend/pages/login'
  },
  'get /backend/profile': {
    controller: 'cms',
    action: 'profile'
  },
  'post /backend/profile': {
    controller: 'cms',
    action: 'editProfile'
  },
  'post /backend/login': {
    controller: 'cms',
    action: 'login'
  },


  '/backend': '/cms',

  '/backend': '/cms',

  /*後台-CMS*/
  '/cms': '/cms/list/news/all',

  'get /cms/new/:model': {
    controller: 'Cms',
    action: 'editor'
  },
  /*報名者資料*/
  'get /applicants': {
    controller: 'Cms',
    action: 'applicants'
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

  /*系統設定*/
  '/systemSetting': {
    controller: 'System',
    action: 'systemSetting'
  },

  'post /updateTh': {
    controller: 'System',
    action: 'updateTh'
  },

  'post /updateStartDate': {
    controller: 'System',
    action: 'updateStartDate'
  },

  'post /updateEndDate': {
    controller: 'System',
    action: 'updateEndDate'
  },

  // 'get /'

  'get /.well-known/acme-challenge/BNRPlqdr0QzFXDsg6dAgO2Gjv3L9Woc5JOLieDlz2Rk':{
    view: 'frontend/pages/.well-known/acme-challenge/BNRPlqdr0QzFXDsg6dAgO2Gjv3L9Woc5JOLieDlz2Rk',
  },

  'get /.well-known/acme-challenge/O2GOvBV-ZXbsKl7xTSx6AdYWboZfYVZqGc7_nnpAk_k':{
    view: 'frontend/pages/.well-known/acme-challenge/O2GOvBV-ZXbsKl7xTSx6AdYWboZfYVZqGc7_nnpAk_k',
  }

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
