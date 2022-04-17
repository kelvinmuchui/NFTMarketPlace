import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import {sanityClient,urlFor} from '../sanity'
import { Collection } from '../typings'

interface Props {
  collections: Collection[]
}
const Home = ({collections}: Props) => {
  return (
    <div className="">
      <Head>
        <title>Nft-Opensea </title>
        <link rel="icon" href="/favicon.ico" />

      </Head>
      <div className ="flex flex-col h-screen justify-center bg-slate-800 items-center" >
      <h1 className ="text-indigo-700 text-4xl font-bold">The <span className ="text-orange-500">greatest</span> NFTs</h1>
      <Link href ="/nft/kelvin">
      <button className =" mt-10  bg-slate-600  text-white
            rounded-sm font-bold p-5 border-indigo-700 border-2">
                Enter Site
            </button>
      </Link>
      
      </div>
     

      
      
    </div>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps  = async () => {
  const query = `*[_type == "collection"]{
    _id,
    title,
    address,
    description,
    nftCollectionName,
    mainImage{
      asset
    },
    slug{
      current
    },
    creator->{
      _id,
      name,
      address,
      slug{
        current
      },
    },
  
  }`
  
  const collections = await sanityClient.fetch(query)
  console.log(collections)

  return {
    props: {
      collections
    }
  }
}
