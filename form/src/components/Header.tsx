import react, { type PropsWithChildren, type ReactNode } from 'react';

type HeaderProps = PropsWithChildren<{ image: { alt: string, src: string } }>

const Header = ({ image, children }: HeaderProps) => {
    return (
        <header>
            {/* {...image} is a react shortcut to spread all the props the info instead of doing src={src} alt={alt} */}
            <img className='img' {...image} />
            {children}
        </header>
    )
}

export default Header;