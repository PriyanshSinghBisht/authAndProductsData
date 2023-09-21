import Link from 'next/link'

export default function Home(){
  return(
    <div>
      <h1 className='sm:ml-5 ml-3 sm:text-[40px] text-[30px] text-center'>Home</h1>
     <div className="flex sm:flex-row flex-col ">
         {
          links.map(link=>{
            return(
                  <Link key={link.name} href={link.href}
                  className="flex justify-center items-center
                  w-full mx-3 mt-5 dark:bg-slate-950 dark:hover:bg-slate-900 
                  bg-slate-300 hover:bg-slate-200
                  p-5 hover:underline"
                  >{link.name}</Link>
            )
          })
         }
     </div>
     </div>
  )
}

const links = [
   {
    name: 'Products',
    href: '/products',
   },{
      name: 'Profile',
      href: '/profile',
     }  
];