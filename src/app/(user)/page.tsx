import Banner from "@/components/Banner";
import BestSeller from "@/components/BestSeller";
import Bottombanner from "@/components/Bottombanner";
import Category from "@/components/Category";
import HomeBanner from "@/components/Homebanner";
import Logos from "@/components/Logos";
import NewArrival from "@/components/NewArrival";
import Services from "@/components/Services";
import TopDeal from "@/components/TopDeal";
import { client } from "@/lib/sanityClient";
import { groq } from "next-sanity";

export const revalidate = 10;
const bannerQuery = groq`*[_type == 'banner']{
  image,
  _id
} | order(_createdAt asc)`;

const newArrivalQuery = groq`*[_type == 'product' && position =='new-arrival']{
_id,
  _type,
  _rev,
  _createdAt,
  price,
  rowprice,
  title,
  position,
  ratings,
  description,
  'brand': brand->title,
  slug,
  image,
  "category":category[0]->title,
  isnew,
  body,
  quantity,
 
} | order(_createdAt asc)`;
const topDealQuery = groq`*[_type == 'product' && position =='top-deal']{
_id,
  _type,
  _rev,
  _createdAt,
  price,
  rowprice,
  title,
  position,
  ratings,
  description,
  'brand': brand->title,
  slug,
  image,
  "category":category[0]->title,
  isnew,
  body,
  quantity,

} | order(discount asc)`;
const bestSellerQuery = groq`*[_type == 'product' && position =='bestseller']{
_id,
  _type,
  _rev,
  _createdAt,
  price,
  rowprice,
  title,
  position,
  ratings,
  description,
  'brand': brand->title,
  slug,
  image,
  "category":category[0]->title,
  isnew,
  body,
  quantity,

} | order(discount asc)`;
const categoryQuery = `*[_type == 'category']{
...
} | order(_createdAt asc)`;
const HomePage = async () => {
  const banners = await client.fetch(bannerQuery);
  const newArrivalProducts = await client.fetch(newArrivalQuery);
  const topDealProducts = await client.fetch(topDealQuery);
  const bestSellerProducts = await client.fetch(bestSellerQuery);
  const categories = await client.fetch(categoryQuery);

  return (
    <main className="text-sm min-h-screen overflow-hidden">
      <Banner banners={banners} />
      <NewArrival products={newArrivalProducts} />
      <HomeBanner />
      <Services />
      <Category categories={categories} />
      <TopDeal products={topDealProducts} />
      <BestSeller products={bestSellerProducts} />
      <Bottombanner />
      <Logos />
    </main>
  );
};

export default HomePage;
