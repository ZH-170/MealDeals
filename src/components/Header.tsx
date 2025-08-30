import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";


const Header = () => {
    const navigate = useNavigate();

    return(
        <header className="sticky top-0 z-40 border-b bg-card">
            <div className="container mx-auto px-4 py-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl merriweather-custom font-bold text-primary flex items-center gap-2 hover:cursor-pointer" onClick={() => navigate("/")}>
                            {/* <ShoppingCart className="h-8 w-8" /> */}
                            <img src="/logo.png" className="w-[38px] mr-1.5"/>
                            MealDeals
                        </h1>
                        <p className="text-muted-foreground mt-1 font-mono">
                            Find discounted groceries and create delicious recipes
                        </p>
                    </div>
                    <div className="flex flex-row justify-end gap-6"> 
                        <div className="mt-2">
                                <Button
                                    size="lg"
                                    variant="outline"
                                    onClick={() => navigate("/subscription")}
                                    className="text-primary text-md border-2 border-primary bg-card hover:bg-primary hover:text-background transition-all duration-300"
                                >
                                    Subscribe
                                </Button>
                            
                        </div>
                        <div className="flex items-center justify-center h-14 w-14 rounded-full border-2 border-primary cursor-pointer hover:shadow-lg" onClick={() => navigate("/profile")}>
                            <div><img src="wolf.jpg" alt="Avatar" className="h-10 w-10 rounded-full"/></div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;