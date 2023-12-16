import style from './Header.module.css'

interface HeaderProps{
    
    title:     string
    logo:      string
    subtitle?: string
}


export const Header = ({title, logo, subtitle}: HeaderProps)=>{

    return(

        <header className={style.container}>

            <div className={style.divTitle}>

                <h1 className={style.title}>{title}</h1>

                <img 
                    src={logo} 
                    alt="logo"
                    className={style.logo}
                />

            </div>

            <div className={style.divSubtitle}>

                <strong className={style.subtitle}>{subtitle}</strong>

            </div>

        </header>
    )
}