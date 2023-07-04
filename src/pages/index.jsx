import {Seo} from 'src/components/seo';
import {usePageView} from 'src/hooks/use-page-view';
import {HomeCta} from 'src/sections/home/home-cta';
import {HomeFaqs} from 'src/sections/home/home-faqs';
import {HomeFeatures} from 'src/sections/home/home-features';
import {HomeHero} from 'src/sections/home/home-hero';
import {HomeReviews} from 'src/sections/home/home-reviews';
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

const Page = () => {
    usePageView();

    const navigate = useNavigate();
    useEffect(() => {
        navigate("/dashboard", {replace: true});
    }, []);


    return (
        <>
            <Seo/>
            <main>
                <HomeHero/>
                <HomeFeatures/>
                <HomeReviews/>
                <HomeCta/>
                <HomeFaqs/>
            </main>
        </>
    );
};

export default Page;
