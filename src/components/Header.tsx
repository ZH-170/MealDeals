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
                        <h1 className="text-3xl font-bold text-primary flex items-center gap-2 hover:underline hover:cursor-pointer" onClick={() => navigate("/landing")}>
                            <ShoppingCart className="h-8 w-8" />
                            Meal Deals
                        </h1>
                        <p className="text-muted-foreground mt-1">
                            Find discounted groceries and create delicious recipes
                        </p>
                    </div>
                    <div className="flex flex-row justify-end gap-6"> 
                        <div className="mt-2">
                                <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => navigate("/subscription")}
                                    className="flex-1"
                                >
                                    Subscribe
                                </Button>
                            
                        </div>
                        <div className="flex items-center justify-center h-12 w-12 rounded-full border border-gray-300 cursor-pointer hover:shadow-lg" onClick={() => navigate("/profile")}>
                            <div><img src="wolf.jpg" alt="Avatar" className="h-10 w-10 rounded-full"/></div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;