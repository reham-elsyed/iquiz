import { FacebookIcon, InstagramIcon, TwitterIcon, YoutubeIcon } from 'lucide-react'

import { Separator } from '@/components/ui/separator'

import Logo from '@/components/shadcn-studio/logo'
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa'
import Rocket from '@/components/SVGComponents/Rocket'

const FooterComponent = () => {
  return (
    <footer>
      <div className='mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-4 max-md:flex-col sm:px-6 sm:py-6 md:gap-6 md:py-8'>
        <a href='/home'>
          <div className='flex items-center gap-3'>
            <Rocket size={30} /><span className='text-2xl font-bold'>MENTORA</span>
          </div>
        </a>

        <div className='flex items-center gap-5 whitespace-nowrap'>
          <a href='/about'>About</a>
          <a href='#'>Features</a>
          <a href='#'>Works</a>
          <a href='#'>Career</a>
        </div>

        <div className='flex items-center gap-4'>
          <a href='#'>
            <FaFacebook className='size-5' />
          </a>
          <a href='#'>
            <FaInstagram className='size-5' />
          </a>
          <a href='#'>
            <FaTwitter className='size-5' />
          </a>
          <a href='#'>
            <FaYoutube className='size-5' />
          </a>
        </div>
      </div>

      <Separator />

      <div className='mx-auto flex max-w-7xl justify-center px-4 py-8 sm:px-6'>
        <p className='text-center font-medium text-balance'>
          {`©${new Date().getFullYear()}`} <a href='#'>study tool</a>, Made with ❤️ for better web.
        </p>
      </div>
    </footer>
  )
}

export default FooterComponent
