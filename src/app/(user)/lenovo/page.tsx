import Banner from "@/components/Banner";
import NewArrival from "@/components/NewArrival";
import AllProduct from "@/components/AllProduct";
import { client } from "@/lib/sanityClient";
import { groq } from "next-sanity";

export const revalidate = 10;
const bannerQuery = groq`*[_type == 'lenovobanner']{
  image,
  _id
} | order(_createdAt asc)`;

const lenovoQuery = groq`*[_type == 'product' && brand->title =='lenovo']{
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
  const lenovoProducts = await client.fetch(lenovoQuery);
  return (
    <main className="text-sm min-h-screen overflow-hidden">
      <Banner banners={banners} />
      <AllProduct products={lenovoProducts} title="Lenovo" />
    </main>
  );
};

export default HpPage;
