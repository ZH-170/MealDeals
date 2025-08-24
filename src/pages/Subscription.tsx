import Header from "@/components/Header";

const Subscription = () => {
    return (
        <div className="min-h-screen bg-background">
            <div className="grid grid-cols-2 p-12 shadow-sm gap-7 mx-40">
                {/* Free Plan */}
                <div className="hover:shadow-lg rounded-lg border bg-card p-6">
                    <h2 className="text-xl font-bold mb-4">Free Plan</h2>
                    <ul className="list-disc list-inside space-y-2">
                        <li>See live discounted items from Woolworths, Coles, Aldi, and IGA</li>
                        <li>Basic AI recipe generation</li>
                        <li>Limited recipe generations per week</li>
                        <li>No access to influencer verified recipes</li>
                        <li>No profile or personalization features</li>
                    </ul>
                </div>

                {/* Premium Plan */}
                <div className="hover:shadow-lg rounded-lg border bg-card shadow-sm p-6">
                    <h2 className="text-xl font-bold mb-4">Premium Plan</h2>
                    <ul className="list-disc list-inside space-y-2">
                        <li>See live discounted items from Woolworths, Coles, Aldi, and IGA</li>
                        <li>Smart ingredient boosting – highlights the items you’re most likely to want based on your shopping history</li>
                        <li>Unlimited recipe generations</li>
                        <li>Recipes tailored to your needs: gluten-free, allergy-friendly, vegan, pescatarian, paleo and more</li>
                        <li>Access to influencer-verified recipes</li>
                        <li>Browse influencer feeds to see their latest recipes and which ingredients are on special now</li>
                        <li>Save and organize your favorite recipes in your profile for easy access</li>
                        <li>Smarter AI recommendations that improve based on your preferences andpast activity</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Subscription;