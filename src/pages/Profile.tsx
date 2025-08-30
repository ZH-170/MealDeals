import { Influencers, Recipe } from "@/types/types";
import { RecipeCard, RecipeCard_sm } from "@/components/RecipeCard";
import recipeData from "../favourite_recipes.json"
import influencerData from "../followed_influencers.json"

const favouriteRecipes: Recipe[] = recipeData;
const followedInfluencers: Influencers[] = influencerData;

const Profile = () => {
    return(
        <div className="pr-[200px] pl-[200px] py-6 flex flex-row gap-8 justify-between">
            <div className="flex flex-col w-[800px]">
                <div className="mt-6 md:text-4xl font-extrabold text-primary merriweather-custom">What are you craving, wolffyflowww ?</div>
                <div>
                    <div className="m-[60px]">
                        <h1 className="m-5 text-2xl font-extrabold merriweather-custom ">Favourite Recipes</h1>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {favouriteRecipes.map((recipe) => (
                                <RecipeCard_sm
                                    key={recipe.id}
                                    recipe={recipe}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="m-[60px]">
                        <h1 className="m-5 text-2xl font-extrabold merriweather-custom">Followed Influencers</h1>
                        <div className="flex flex-row gap-8">
                            {followedInfluencers.map((influencer) => (
                                <div className="w-[80px]">
                                    <img src={influencer.imageurl} alt={influencer.full_name} className="h-[80px] w-[80px] object-cover rounded-full hover:shadow-xl transition-shadow duration-200" />
                                    <h1 className="text-sm">{influencer.full_name}</h1>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-white mt-[100px] h-[450px] text-center flex flex-col items-top justify-center rounded-xl px-8 shadow-[0_4px_8px_rgba(0,0,0,0.1)]">
                <div className="w-[320px] h-[320px] flex items-center justify-center rounded-full border-2 border-primary">
                    <img 
                        src="/wolf.jpg"
                        className="w-[200px]"
                    />
                    
                </div>
                <h1 className="mt-6 text-md font-extrabold text-primary merriweather-custom">You've saved <span className="text-3xl">$20.11</span> with MealDeals!</h1>
            </div>
        </div>
    );
}

export default Profile;