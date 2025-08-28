import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Landing = () => {
    const navigate = useNavigate();

    return (
        <div className="flex bg-background flex-col items-center justify-center text-center px-6">
            <div className="mt-[180px]">
                
            {/* Website Name */}
            <h1 className="text-6xl merriweather-custom md:text-8xl font-extrabold text-primary mb-6">
                Meal Deals
            </h1>

            {/* Tagline */}
            <p className="text-lg text-muted-foreground mb-11 font-mono">
                <b>Shop smarter, cook cheaper:</b> your ultimate grocery shopping app for finding the best deals
            </p>


            {/* Call to Action Button */}
            <Button
                size="lg"
                variant="outline"
                onClick={() => navigate("/main")}
                className="text-primary px-8 py-4 text-lg border-2 border-primary bg-card hover:bg-primary hover:text-background transition-all duration-300"
            >
                Browse deals now
            </Button>
        </div>
        </div>
    );
};

export default Landing;
