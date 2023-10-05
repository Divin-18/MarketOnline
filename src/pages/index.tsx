
import { type NextPage } from "next";
import Link from "next/link";
import { api } from "~/utils/api";

const Home: NextPage = () => {

  const listings = api.listing.list.useQuery();
  return (
    <div>
    <main className="container mx-auto flex min-h-screen flex-col gap-12">
      <h1 className="mt-12 pl-4 text-4xl">Items for Sale</h1>
      <div className="container grid grid-cols-3 items-center justify-center gap-4">
        {listings?.data?.map((listing) => (
          <div
            key={listing.id}
            className="bg-white rounded-lg shadow-md p-4"
          >
            <h2 className="text-xl font-semibold">{listing.name}</h2>
            <p className="text-gray-600">{listing.description}</p>
            <p className="text-blue-500 mt-2">${listing.price}</p>
            <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-full mt-4" >
              <Link href={`/listings/${listing.id}`}>View</Link>
           </button>
          </div>
        ))}
      </div>
    </main>
  </div>
  
  )
}

export default Home;