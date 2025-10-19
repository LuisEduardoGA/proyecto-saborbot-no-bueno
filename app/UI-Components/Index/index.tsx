import Banner from "./Banner/Banner";
import Benefits from "./Benefits/Benefits";
import BestSales from "./BestSales/BestSales";
import Brands from "./Brands/Brands";
import Category from "./Categories/Category";
import Deals from "./Deals/Deals";
import Hero from "./Header/Hero";
import HotDeals from "./Hot-Deals/HotDeals";
import Newsletter from "./Newsletter/Newsletter";
import Offers from "./Offers-Banner/Offers";
import OrganicFood from "./Organic-Food/Organic-Food";
import Banners from "./Promotion-Banner/Banners";
import Recommend from "./Recommend/Recommend";
import ShortProducts from "./Short-Products/Products";
import Vendors from "./Vendors/Vendors";


export default function Index(){
    return(
        <>
            <Hero />
            <Category />
            <Banners />
            <Deals />
            <Offers />
            <Recommend />
            <HotDeals />
            <Vendors />
            <BestSales />
            <Banner />
            <OrganicFood />
            <ShortProducts />
            <Brands />
            <Benefits/>
            <Newsletter/>
        </>
    )
}