import Banner from "@/components/Banner";
import NewArrival from "@/components/NewArrival";
import AllProduct from "@/components/AllProduct";
import { client } from "@/lib/sanityClient";
import { groq } from "next-sanity";

export const revalidate = 10;
const bannerQuery = groq`*[_type == 'dellbanner']{
  image,
  _id
} | order(_createdAt asc)`;

const dellQuery = groq`*[_type == 'product' && brand->title =='dell']{
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

const HpPage = async () => {
  const banners = await client.fetch(bannerQuery);
  const dellProducts = await client.fetch(dellQuery);
  return (
    <main className="text-sm min-h-screen overflow-hidden">
      <Banner banners={banners} />
      <AllProduct products={dellProducts} title="Dell" />
    </main>
  );
};

export default HpPage;
