# Register_Login_ProductList_Api
# made in node express mongo
# Routes to hit For Users-->
router.post('/register', controllers.register);
router.post('/user/login', controllers.login);
# Routes to hit For Shopkeepers-->
. router.post('/vendors/register', controllers.Shopkeeper_register);
. router.post('/vendor/login', controllers.Shopkeeper_login);
# Routes to hit For getting product list
  router.get('/vendor/list', controllers.get_Product_List)
# jwt token is used for login verification as middleware
# clone or download zip file
# run npm install and npm run start 
