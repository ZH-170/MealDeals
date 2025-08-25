// import { useNavigate } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import Header from "@/components/Header";

// const Landing = () => {
//     const navigate = useNavigate();

//     return (
//         <div className="min-h-screen bg-background">
//             <div className="">
//                 <h1 className="text-3xl font-bold text-primary flex items-center gap-2">
//                     Meal Deals
//                 </h1>
//             </div>
//             <div className="">
//                 <Button
//                     size="lg"
//                     variant="outline"
//                     onClick={() => navigate("/main")}
//                     className="flex-1"
//                 >
//                     Browse deals now
//                 </Button>
//             </div>
//         </div>
//     );
// };

// export default Landing;

import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Landing = () => {
    const navigate = useNavigate();

    return (
        <div className="flex bg-background flex flex-col items-center justify-center text-center px-6">
            <div className="mt-[180px]">

            
            {/* Website Name */}
            <h1 className="text-6xl md:text-8xl font-extrabold text-primary mb-6">
                Meal Deals
            </h1>

            {/* Tagline */}
            <p className="text-lg text-muted-foreground mb-11">
                <b>Shop smarter, cook cheaper:</b> your ultimate grocery shopping app for finding the best deals
            </p>


            {/* Call to Action Button */}
            <Button
                size="lg"
                variant="outline"
                onClick={() => navigate("/main")}
                className="px-8 py-4 text-lg bg-card hover:bg-primary hover:text-background transition-all duration-300"
            >
                Browse deals now
            </Button>
        </div>
        </div>
    );
};

export default Landing;
