export class RecipesAddEdit{
    recipeId: any
    recipeTitle: any
    recipeDescription: any
    recipeDate: any
    preparetime:any
    keyIngredients: any
    topTips: any
    category: any
    serving: any
    cookingTime: any
    calories: any
    recipeNote: any
    tips: any
    videoUrl: any
    otherInformation: any
    authorName: any
    directionPoints: any
    ingredient: ingredient[] = []
    nutrition: nutrition[] = []
    recipeImage: any

}
export class ingredient{
    productId: any;
    ingredientName: any;
    quantity: any;
    unit: any;
}
export class ingredientToSale{
    productId: any;
    ingredientName: any;
    minimumOrder: any;
}
export class nutrition{
    nutritionType: any;
    quantity: any
    unit: any
}
