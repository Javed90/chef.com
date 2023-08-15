export enum Apis {
    /** DashBoard Api */
    salesOverTime = 'AdminDashboard/salesOverTime',
    salesProducts = 'AdminDashboard/salesByProduct',
    salesDiscount = 'AdminDashboard/salesByDiscount',
    customOverTime = 'AdminDashboard/customerOverTime',
    ordersOverTime ='AdminDashboard/ordersOverTime',
    averageOrderValue ='AdminDashboard/averageOrderValue',
    customerByRevenue = 'AdminDashboard/CustomerByRevenue',
    brandsByRevenue = 'AdminDashboard/BrandsByRevenue',
    categoryByRevenue = 'AdminDashboard/CategoryByRevenue',
    usersCount = 'AdminDashboard/GetUsersCount',
    customerDetails= 'AdminDashboard/GetCustomersDetail',

    /** Products Api */
    getAllProducts = 'Product/GetProductsList',
    getProductDetail = 'Product/GetProductDetail',
    productStatus = 'Product/SetProductStatus',
    productSingleStatus = 'Product/SetSingleProductStatus',
    /** Recipes Api */
    getRecipes = 'Recipe/AdminRecipesList',
    getRecipesDetails = 'Recipe/GetRecipeDetail',
    createRecipe = 'Recipe/Addrecipe',
    deleteRecipe = 'Recipe/deleteRecipe?recipeId=',
    uploadRecipeImages = 'Recipe/uploadRecipeImage',
    updateRecipe = 'Recipe/updateRecipe',
    updateRecipeImages = 'Recipe/updateNewRecipeImage',
    updateRecipeSingleImage = 'Recipe/updateRecipeImage',
    deleteRecipeImage = 'Recipe/deleteRecipeImage',

    /** Users Api */
    adminLogin = 'Admin/adminLogin',
    adminSignUp = 'Admin/adminSignup',

    /** Categories Api */
    categoriesList = 'Category/categoryList',
    editCategory = 'Category/addCategory',
    updateCategory = 'Category/updateCategoryDescription',

    /** Sub categories */
    subCategoriesList = 'SubCategory/subCategoryList',
    editSubCategory = 'SubCategory/addSubCategory',

    /** Sub Sub Categories */
    subSubCategoriesList = 'SubSubCategory/subSubCategoryList',
    editSubSubCategory = 'SubSubCategory/addSubSubCategory',
    /** Get Product with categories ID */
    getCategoriesProducts = 'AdminProduct/getProduct',

    /** Order List */
    orderList = 'Order/getOrderList',
    createCsvFile = 'Order/createCSVfile',
    createSingleCsvFile = 'Order/createSingleCSVfile',
    emailOrderInvoice = 'Order/emailOrderInvoice',

    /** Collections */

    collectionList = 'Collection/AdminCollectionList',
    addCollection = 'Collection/addCollection',
    addCollectionImage = 'Collection/uploadCollectionImage',
    editCollection = 'Collection/updateCollection',
    collectionDetail = 'Collection/CollectionDetail?collectionId=',
    deleteCollection = 'Collection/deleteCollection',
    updateCollectionNewImages = 'Collection/updateCollectionNewImage',
    updateCollectionSingleImage = 'Collection/updateImage',
    deleteCollectionSingleImage = 'Collection/deleteCollectionImage',

    /** Banner */

    bannerList = 'AdminFeatureBanner/featureBannerList',
    addBanner = 'AdminFeatureBanner/addFeatureBanner',
    deleteBanner = 'AdminFeatureBanner/deleteFeatureBanner',
    deleteBannerImage= 'AdminFeatureBanner/deleteFeatureBannerImage',
    updateBanner = 'AdminFeatureBanner/updateFeatureBanner',
    updateBannerImage = 'AdminFeatureBanner/updateImage',
    updateSingleBannerImage= 'AdminFeatureBanner/updateImage',
    uploadBannerImages = 'AdminFeatureBanner/uploadFeatureBannerImage',
    getBannerDetail = 'AdminFeatureBanner/featureBannerDetail',

    /** Terms And Conditions  */

    getTermsAndConditions = 'TermsAndConditions/getAdminTermsAndConditions',
    addTermsAndConditions = 'TermsAndConditions/adminAddTermsAndConditions',
    updateTermsAndConditions = 'TermsAndConditions/adminUpdateTermsAndConditions',

    /** Privacy Policy */
    getPrivacyPolicy = 'PrivacyPolicy/getAdminPrivacyPolicy',
    addPrivacyPolicy = 'PrivacyPolicy/adminAddPrivacyPolicy',
    updatePrivacyPolicy = 'PrivacyPolicy/adminUpdatePrivacyPolicy',

    /** Contact Info */
    getContactInfo = 'AppInfo/getAppInfo',
    addContactInfo = 'AppInfo/adminAddAppInfo',
    updateContactInfo = 'AppInfo/adminUpdateAppInfo',

    /** Coupon */
    GetCoupons = 'Coupon/adminGetCouponList',
    couponDiscount = 'Coupon/couponDiscount',
    addCoupon = 'Coupon/addCoupon',
    updateCoupon = 'Coupon/updateCoupon',
    deleteCoupon ='Coupon/deleteCoupon?couponId=',
    getCountriesList = 'Country/adminGetCountryList',
    getCitiesList = 'Auth/getCitiesList?countryId=',

    /** Notification  */

    notificationList = "Notification/adminGetNotificationList",
    addNotification = "Notification/adminAddNotification",
    deleteNotification = "Notification/deleteNotification",

    /** Countries */
    countryAdd = "Country/adminAddCountry",
    deleteCountry = "Country/deleteCountry",

    /*** City */
    citiesList  = 'Cities/adminCitiesList',
    addCity = "Cities/adminAddCity",
    deleteCity = "Cities/deleteCity",
    updateCity = "Cities/updateCity",

    /*** Customer List */
    customerList = 'Admin/getCustomerList',

    /**NewsLetter  */

    newsLetterList = 'Newsletter/adminGetNotificationList',
    addNewsLetter = 'Newsletter/adminAddNewsletter',
    deleteNewsLetter = 'Newsletter/deleteNewsletter?newsletterId='

}
