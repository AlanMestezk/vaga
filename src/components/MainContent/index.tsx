
import RepositoryForm from '../Form'
import style          from './MainContent.module.css'

export const MainContent = ()=>{

    return(

        <main className={style.container}>

            <section>


                <div className={style.divInput}>
                    
                    <RepositoryForm/>


                </div>
            
            </section>          

        </main>
    )
}