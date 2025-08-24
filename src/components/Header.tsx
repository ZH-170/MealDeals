import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useNavigate } from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();

    return(
        <header className="border-b bg-card">
            <div className="container mx-auto px-4 py-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-primary flex items-center gap-2">
                            <ShoppingCart className="h-8 w-8" />
                            Meal Deals
                        </h1>
                        <p className="text-muted-foreground mt-1">
                            Find discounted groceries and create delicious
                            recipes
                        </p>
                    </div>
                    <div className="flex items-center justify-center h-12 w-12 rounded-full border border-black cursor-pointer" onClick={() => navigate("/profile")}>
                        <div><img src="wolf.jpg" alt="Avatar" className="h-10 w-10 rounded-full"/></div>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;